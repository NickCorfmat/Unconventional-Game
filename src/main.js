"use strict";

const MAP_WIDTH = 1600;

const WIDTH = document.body.offsetWidth;
const HEIGHT = 900;
const ZOOM_FACTOR = 1.25;

const SHARED_CONFIG = {
  mapOffset: MAP_WIDTH > WIDTH ? MAP_WIDTH - WIDTH : 0,
  width: WIDTH,
  height: HEIGHT,
  zoomFactor: ZOOM_FACTOR,
  leftTopCorner: {
    x: WIDTH / (WIDTH - ZOOM_FACTOR) / 2,
    y: HEIGHT / (HEIGHT - ZOOM_FACTOR) / 2,
  },
  rightTopCorner: {
    x: WIDTH / ZOOM_FACTOR + (WIDTH - (WIDTH - ZOOM_FACTOR)) / 2,
    y: HEIGHT / (HEIGHT - ZOOM_FACTOR) / 2,
  },
  lastStage: 2,
};

const Scenes = [
  Preload,
  MenuScene,
  TutorialScene,
  CreditsScene,
  Play,
  FinishedScene,
];
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
