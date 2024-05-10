class Preload extends Phaser.Scene {
  constructor() {
    super("PreloadScene");
  }

  preload() {
    this.load.tilemapTiledJSON("stage_1", "assets/Split3Map_Stage_1.json");
    this.load.tilemapTiledJSON("stage_2", "assets/Split3Map_Stage_2.json");
    this.load.image("tiles-1", "assets/main_lev_build_1.png");
    this.load.image("tiles-2", "assets/main_lev_build_2.png");

    this.load.audio("piano_C", "assets/piano_C.wav");
    this.load.audio("piano_D", "assets/piano_D.wav");
    this.load.audio("piano_E", "assets/piano_E.wav");
    // this.load.image("player", "assets/player/movement/sprite_000.png");

    this.load.spritesheet("player", "assets/player/playerspritesheet.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.once("complete", () => {
      this.startGame();
    });
  }

  startGame() {
    this.registry.set("stage", 1);
    this.scene.start("PlayScene");
  }
  /*
  create() {
    this.scene.start("PlayScene");
  }
  */
}
