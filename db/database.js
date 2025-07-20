import sqlite3 from 'sqlite3';
const db = new sqlite3.Database('./db/game.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS players (
      fid TEXT PRIMARY KEY,
          score INTEGER DEFAULT 0,
              inventory TEXT DEFAULT '[]',
                  hasMinted INTEGER DEFAULT 0
                    )`);
                    });

                    export default db;
                    