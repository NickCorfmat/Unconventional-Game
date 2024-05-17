
class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, "enemy");
        this.enemy = scene.physics.add.sprite(x, y, 'enemy');

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.play('static');  // Ensure 'static' animation exists
    }

    update() {
        if (this.y >= this.maxY && this.body.velocity.y > 0) {
            this.setVelocityY(-this.moveSpeed);
        } else if (this.y <= this.minY && this.body.velocity.y < 0) {
            this.setVelocityY(this.moveSpeed);
        }
    }
}
