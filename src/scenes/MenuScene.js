class MenuScene extends BaseScene {
  constructor(config) {
    super("MenuScene", config);

    this.menu = [
      { scene: "PlayScene", text: "Play" },
      { scene: "TutorialScene", text: "Tutorial" },
      { scene: "CreditsScene", text: "Credits" },
      { scene: null, text: "Exit" },
    ];
  }

  create() {
    super.create();
    this.createMenu(this.menu, this.setUpMenuEvents.bind(this)); // second argument will bind the correct "this" context
    this.createCharacter();
  }

  setUpMenuEvents(menuItem) {
    const textObj = menuItem.textObj;
    textObj.setInteractive();
    textObj.on("pointerover", () => {
      textObj.setStyle({ fill: "#A020F0" });
    });

    textObj.on("pointerout", () => {
      textObj.setStyle({ fill: "#fff" });
    });

    textObj.on("pointerdown", () => {});

    textObj.on("pointerup", () => {
      //console.log("Clicked");

      menuItem.scene && this.scene.start(menuItem.scene);

      if (menuItem === "Exit") {
        this.game.destroy(true);
      }
    });
  }

  update() {
    this.playerCrying.body.setAccelerationX(this.playerCrying.x < game.config.width/2 ? 50 : -50);
    this.playerCrying.body.setAccelerationY(this.playerCrying.y >= game.config.height/2 ? -50 : 50);

    this.playerScared.body.setAccelerationX(this.playerScared.x < game.config.width/2 ? 50 : -50);
    this.playerScared.body.setAccelerationY(this.playerScared.y >= game.config.height/2 ? -50 : 50);

    this.playerAttack.body.setAccelerationX(this.playerAttack.x < game.config.width/2 ? 50 : -50);
    this.playerAttack.body.setAccelerationY(this.playerAttack.y >= game.config.height/2 ? -50 : 50);
  }

  createCharacter() {
    createAnimations(this.anims);
    
    this.playerCrying = this.physics.add
    .sprite(200, 200, "player")
    .setScale(3)
    .play("crying");

    this.playerScared = this.physics.add
    .sprite(game.config.width - 200, game.config.height - 200, "player")
    .setScale(3)
    .play("scared");

    this.playerAttack = this.physics.add
    .sprite(200, game.config.height/2 + 100, "player")
    .setScale(3)
    .play("sword");
  }
}
