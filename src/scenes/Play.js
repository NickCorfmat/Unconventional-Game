class Play extends Phaser.Scene {
  constructor() {
    super("PlayScene");
  }

  create() {
    const map = this.createMap();
    const layers = this.createLayers(map);

    this.player = this.createPlayer();
    this.playerSpeed = 225;
    this.physics.add.collider(this.player, layers.platformColliders);

    // should get the cursors (left, right keys, so on so forth)
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  createMap() {
    const map = this.make.tilemap({ key: "map" });

    map.addTilesetImage("main_lev_build_1", "tiles-1");
    return map;
  }

  createLayers(map) {
    const tileset = map.getTileset("main_lev_build_1");
    const platformColliders = map.createLayer("platformer_collider", tileset);
    const environment = map.createLayer("environment", tileset);
    const platforms = map.createLayer("platforms", tileset);

    // Only tiles with index more than 0 will be collideable
    platformColliders.setCollisionByProperty({ collides: true });

    return { environment, platformColliders };
  }

  createPlayer() {
    const player = this.physics.add.sprite(100, 250, "player");
    player.body.setGravityY(500);
    player.setCollideWorldBounds(true);

    return player;
  }

  update() {
    // destructuring
    const { left, right } = this.cursors;

    if (left.isDown) {
      this.player.setVelocityX(-this.playerSpeed);
    } else if (right.isDown) {
      this.player.setVelocityX(this.playerSpeed);
    } else {
      // no speed since player is idle
      this.player.setVelocityX(0);
    }
  }
}
