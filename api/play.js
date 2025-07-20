import express from 'express';
import bodyParser from 'body-parser';
import db from '../db/database.js';
import { playTurn } from '../utils/gameLogic.js';

const app = express();
app.use(bodyParser.json());

app.post('/api/play', (req, res) => {
  const { fid, action } = req.body;
    const { score, item, event, outcome } = playTurn(action);

      db.get(`SELECT * FROM players WHERE fid = ?`, [fid], (err, row) => {
          if (err) return res.status(500).send("DB error");

              const newScore = (row?.score || 0) + score;
                  const inventory = row ? JSON.parse(row.inventory) : [];
                      if (item) inventory.push(item);

                          const hasMinted = row?.hasMinted || 0;
                              let mintMsg = "";

                                  if (newScore >= 50 && !hasMinted) {
                                        mintMsg = "🎉 You unlocked NFT!";
                                            }

                                                db.run(`
                                                      INSERT INTO players (fid, score, inventory, hasMinted)
                                                            VALUES (?, ?, ?, ?)
                                                                  ON CONFLICT(fid) DO UPDATE SET
                                                                          score = excluded.score,
                                                                                  inventory = excluded.inventory,
                                                                                          hasMinted = CASE
                                                                                                    WHEN excluded.score >= 50 THEN 1 ELSE hasMinted END
                                                                                                        `, [fid, newScore, JSON.stringify(inventory), hasMinted]);

                                                                                                            res.json({
                                                                                                                  event,
                                                                                                                        item,
                                                                                                                              scoreDelta: score,
                                                                                                                                    totalScore: newScore,
                                                                                                                                          inventory,
                                                                                                                                                mint: newScore >= 50 && !hasMinted,
                                                                                                                                                      image: `/images/${event}.png`,
                                                                                                                                                            message: outcome + " " + mintMsg
                                                                                                                                                                });
                                                                                                                                                                  });
                                                                                                                                                                  });

                                                                                                                                                                  app.listen(3000, () => console.log("🎮 Game running on port 3000"));
                                                                                                                                                                  