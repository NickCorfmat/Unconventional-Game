class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        createEnemyAnimations(scene.anims);
        this.play('floating');

        // Movement attributes
        this.moveSpeed = 100; // Speed of the enemy movement
        this.movementDirection = 1; // 1 for down, -1 for up
    }

    update() {
        // Correctly handle movement and frame time
        this.y += this.movementDirection * this.moveSpeed * this.scene.game.loop.delta / 1000;

        // Boundary checks
        if (this.y >= this.scene.sys.game.config.height - this.height / 2) {
            this.movementDirection = -1;
        } else if (this.y <= this.height / 2) {
            this.movementDirection = 1;
        }
    }
}
