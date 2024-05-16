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
      //textObj.setStyle({ fill: "#A020F0" });
      textObj.setTint(0xa020f0);
    });

    textObj.on("pointerout", () => {
      //textObj.setStyle({ fill: "#fff" });
      textObj.setTint(0xffffff);
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
    this.setPlayerAcceleration(this.playerCrying);
    this.setPlayerAcceleration(this.playerScared);
    this.setPlayerAcceleration(this.playerAttack);
  }

  setPlayerAcceleration(player) {
    player.body.setAccelerationX(player.x < game.config.width / 2 ? 50 : -50);
    player.body.setAccelerationY(player.y >= game.config.height / 2 ? -50 : 50);
  }

  createCharacter() {
    createAnimations(this.anims);
    this.player = this.add.sprite(-50, game.config.height / 2 + 200, "player"); //.setScale(2)
    this.player.play("crying");

    let tweenChain = this.tweens.chain({
      targets: this.player,
      loop: -1,
      tweens: [
        {
          x: 150,
          y: game.config.height / 2,
          duration: 1500,
          scale: { from: 2, to: 4 },
          angle: { from: 0, to: 90 },
          ease: "Quadratic.easeInOut",
        },
        {
          x: game.config.width / 2,
          y: 150,
          duration: 1500,
          scale: { from: 4, to: 2 },
          angle: { from: 90, to: 180 },
          ease: "Quadratic.easeInOut",
        },
        {
          x: game.config.width - 150,
          y: game.config.height / 2,
          duration: 1500,
          scale: { from: 2, to: 4 },
          angle: { from: 180, to: 270 },
          ease: "Quadratic.easeInOut",
        },
        {
          x: game.config.width / 2,
          y: game.config.height - 150,
          duration: 1500,
          scale: { from: 4, to: 2 },
          angle: { from: 270, to: 360 },
          ease: "Quadratic.easeInOut",
        },
      ],
    });

    this.playerCrying = this.physics.add
      .sprite(200, 200, "player")
      .setScale(3)
      .play("crying");

    this.playerScared = this.physics.add
      .sprite(game.config.width - 200, game.config.height - 200, "player")
      .setScale(3)
      .play("scared");

    this.playerAttack = this.physics.add
      .sprite(200, game.config.height / 2 + 100, "player")
      .setScale(3)
      .play("sword");
  }
}
