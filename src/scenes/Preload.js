class Preload extends Phaser.Scene {
  constructor() {
    super("PreloadScene");
  }

  preload() {
    this.load.tilemapTiledJSON("stage_1", "assets/Split3Map_Stage_1.json");
    this.load.tilemapTiledJSON("stage_2", "assets/Split3Map_Stage_2.json");
    this.load.image("tiles-1", "assets/main_lev_build_1.png");
    this.load.image("tiles-2", "assets/main_lev_build_2.png");

    this.load.image("cxz", "assets/cxz.png");
    this.load.image("zxc", "assets/zxc.png");
    this.load.image("bnm", "assets/bnm.png");

    this.load.image("menu-bg", "assets/background_0.png");
    this.load.image("backbutton", "assets/backbutton.png");
    this.load.bitmapFont(
      "pixel-font",
      "assets/font/pixel_font.png",
      "assets/font/pixel_font.xml"
    );

    this.load.audio("piano_C", "assets/piano_C.wav");
    this.load.audio("piano_D", "assets/piano_D.wav");
    this.load.audio("piano_E", "assets/piano_E.wav");
    this.load.audio("guitar_C", "assets/guitar_C.wav");
    this.load.audio("guitar_E", "assets/guitar_E.wav");
    this.load.audio("stop", "/assets/stop.wav");
    this.load.audio("stop", "/assets/stop.wav");
    // this.load.image("player", "assets/player/movement/sprite_000.png");

    this.load.atlas("key-sprites", "./assets/keys.png", "./assets/keys.json");

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
    this.scene.start("MenuScene");
  }
  /*
  create() {
    this.scene.start("PlayScene");
  }
  */
}
