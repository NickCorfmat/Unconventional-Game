class Preload extends Phaser.Scene {
  constructor() {
    super("PreloadScene");
  }

  preload() {
    this.load.tilemapTiledJSON("map", "assets/Split3MapEnv.json");
    this.load.image("tiles-1", "assets/main_lev_build_1.png");
    this.load.image("tiles-2", "assets/main_lev_build_2.png");
    // this.load.image("player", "assets/player/movement/sprite_000.png");

    this.load.spritesheet("player", "assets/player/playerspritesheet.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
  }

  create() {
    this.scene.start("PlayScene");
  }
}
