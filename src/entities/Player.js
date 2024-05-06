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
    this.gravity = 500;
    this.playerSpeed = 225;
    this.body.setGravityY(this.gravity);
    this.setCollideWorldBounds(true);

    // should get the cursors (left, right keys, so on so forth)
    this.cursors = this.scene.input.keyboard.createCursorKeys();

    // animations
    createAnimations(this.scene.anims);
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

    if (left.isDown) {
      this.setVelocityX(-this.playerSpeed);
      this.setFlipX(true);
    } else if (right.isDown) {
      this.setVelocityX(this.playerSpeed);
      this.setFlipX(false);
    } else {
      // no speed since player is idle
      this.setVelocityX(0);
    }

    if (space.isDown && onFloor) {
      this.setVelocityY(-this.playerSpeed * 1.65);
    }

    this.body.velocity.x !== 0
      ? this.play("run", true)
      : this.play("idle", true);
  }
}
