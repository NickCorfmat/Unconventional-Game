"use strict";

const WIDTH = 1280;
const HEIGHT = 600;
const PLAYER_POSITION = { x: WIDTH * 0.1, y: HEIGHT / 2 }; // change later

const SHARED_CONFIG = {
  width: WIDTH,
  height: HEIGHT,
  startPosition: PLAYER_POSITION,
};

const Scenes = [Preload, Play];
const createScene = (Scene) => new Scene(SHARED_CONFIG);
const initScenes = () => Scenes.map(createScene);

const config = {
  type: Phaser.AUTO,
  ...SHARED_CONFIG,
  pixelArt: true,
  physics: {
    default: "arcade",
    arcade: {
      debug: true,
    },
  },

  scene: initScenes(),
};

let game = new Phaser.Game(config);
