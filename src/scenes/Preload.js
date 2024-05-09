class Preload extends Phaser.Scene {
  constructor() {
    super("PreloadScene");
  }

  preload() {
    this.load.tilemapTiledJSON("stage_1", "assets/Split3Map_Stage_1.json");
    this.load.tilemapTiledJSON("stage_2", "assets/Split3Map_Stage_2.json");
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
