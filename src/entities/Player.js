/*
Player Class

*/
class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "player");

    scene.add.existing(this);
    scene.physics.add.existing(this);

    // Mixins
    Object.assign(this, collidable);

    this.init();
    this.initEvents();
  }

  init() {
    this.currentCombo = "";
    this.scene.input.keyboard.on("keydown", this.handleKeyInput, this);

    this.health = 100;
    this.gravity = 500;
    this.playerSpeed = 225;
    this.jumpCount = 0;
    this.consecJumps = 1;
    this.hasBeenHit = false;

    this.body.setGravityY(this.gravity);
    this.setCollideWorldBounds(true);
    this.setOrigin(0.5, 1);
    // should get the cursors (left, right keys, so on so forth)
    this.cursors = this.scene.input.keyboard.createCursorKeys();
    this.hp = new Healthbar(
      this.scene,
      this.scene.config.leftTopCorner.x + 5,
      this.scene.config.leftTopCorner.y + 5,
      4,
      this.health
    );

    // animations
    createAnimations(this.scene.anims);

    this.isMovingLeft = false;
    this.isMovingRight = false;
  }

  initEvents() {
    // listens to the update event in PLayScene
    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
  }

  update() {
    if (this.hasBeenHit || !this.body) {
      return;
    }

    // .top should be more accurate (vs y) because it gets top part of the player sprite
    if (this.getBounds().top > this.scene.config.height) {
      const emitter = EventEmitter.getInstance();
      emitter.emit("GAME_OVER");
    }
    // destructuring
    // todo: remove space later (space is just for testing purposes since jumping is tied to the musical notes)
    const { left, right, space } = this.cursors;

    const onFloor = this.body.onFloor();
    const isSpaceJustDown = Phaser.Input.Keyboard.JustDown(space);

    Phaser.Input.Keyboard.create;
    if (this.isMovingLeft) {
      this.setVelocityX(-this.playerSpeed);
      this.setFlipX(true);
    } else if (this.isMovingRight) {
      this.setVelocityX(this.playerSpeed);
      this.setFlipX(false);
    } else {
      // no speed since player is idle
      this.setVelocityX(0);
    }

    if (onFloor) {
      //console.log("on floor");
      this.jumpCount = 0;
    }

    onFloor
      ? this.body.velocity.x !== 0
        ? this.play("run", true)
        : this.play("idle", true)
      : this.play("jump", true);
  }

  handleKeyInput(event) {
    let keyCombosList = [
      {
        name: "Jump",
        keyCombo: ["bnm"],
      },

      {
        name: "Left",
        keyCombo: ["cxz"],
      },

      {
        name: "Right",
        keyCombo: ["zxc"],
      },

      {
        name: "Stop",
        keyCombo: ["g"],
      },
    ];

    this.currentCombo += event.key;
    //console.log(this.currentCombo);

    for (const combo of keyCombosList) {
      if (this.currentCombo.endsWith(combo.keyCombo)) {
        switch (combo.name) {
          default:
            break;
          case "Jump":
            this.setVelocityY(-this.playerSpeed * 1.65);

            break;
          case "Left":
            this.isMovingLeft = true;
            this.isMovingRight = false;
            break;
          case "Right":
            this.isMovingRight = true;
            this.isMovingLeft = false;
            break;
          case "Stop":
            this.isMovingRight = false;
            this.isMovingLeft = false;
            break;
        }

        this.currentCombo = "";
      }
    }
  }

  takesHit(source) {
    if (this.hasBeenHit) {
      return;
    }

    // source.damage will be for enemy NPCs, source.properties.damage is for the tile (since this is done via the Tiled)
    this.health -= source.damage || source.properties.damage || 0;

    if (this.health <= 0) {
      const emitter = EventEmitter.getInstance();
      emitter.emit("GAME_OVER");
      return;
    }

    this.hasBeenHit = true;
    this.hp.decrease(this.health);

    this.scene.time.delayedCall(1000, () => {
      this.hasBeenHit = false;
    });
  }
}
