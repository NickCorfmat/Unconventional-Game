// Code Practice: Surfy Game
// Name: Alexander Halim
// Date: 3/6/2024

/*
- Question Mechanic
- Answering Mechanic (Clickable, Multi-choice Text)
- Recommendation Mechanic (Given Result) 
*/
"use strict";

let config = {
  type: Phaser.AUTO,
  width: 800,
  height: 500,
  render: {
    pixelArt: true,
  },
  physics: {
    default: "arcade",
    arcade: {
      debug: true,
    },
  },
  scene: [Play],
};

let game = new Phaser.Game(config);

let cursors;
let { height, width } = game.config;
