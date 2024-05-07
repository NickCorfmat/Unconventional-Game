/*
Player Class

*/
class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "player");

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.init();
    this.initEvents();
  }

  init() {
    this.currentCombo = "";
    this.scene.input.keyboard.on("keydown", this.handleKeyInput, this);
    // todo: reminder to change these combos later

    this.gravity = 500;
    this.playerSpeed = 225;
    this.jumpCount = 0;
    this.consecJumps = 1;
    this.body.setGravityY(this.gravity);
    this.setCollideWorldBounds(true);

    // should get the cursors (left, right keys, so on so forth)
    this.cursors = this.scene.input.keyboard.createCursorKeys();

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
    console.log(this.currentCombo);

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
}
