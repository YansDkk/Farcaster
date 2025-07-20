export function playTurn(action) {
      const events = ["monster", "treasure", "nothing"];
        const items = ["Potion", "Sword", "Shield", "Ring"];
          const event = events[Math.floor(Math.random() * events.length)];
            const item = items[Math.floor(Math.random() * items.length)];

              let score = 0;
                let outcome = `You chose to ${action}. `;

                  if (action === "explore") {
                      if (event === "monster") {
                            score = 5;
                                  outcome += "You encountered a monster and won!";
                                      } else if (event === "treasure") {
                                            score = 10;
                                                  outcome += `You found a treasure and a ${item}!`;
                                                      } else {
                                                            outcome += "Nothing happened.";
                                                                }
                                                                  } else if (action === "fight") {
                                                                      score = Math.floor(Math.random() * 10) + 1;
                                                                          outcome += "You fought bravely and earned points!";
                                                                            } else if (action === "rest") {
                                                                                score = 1;
                                                                                    outcome += "You took a rest and recovered energy.";
                                                                                      }

                                                                                        return { score, item: event === "treasure" ? item : null, event, outcome };
                                                                                        }

