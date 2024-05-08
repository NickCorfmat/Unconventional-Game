class Play extends Phaser.Scene {
  constructor(config) {
    super("PlayScene");
    this.config = config;
  }

  create() {
    const map = this.createMap();
    const layers = this.createLayers(map);

    const player = this.createPlayer();

    this.createPlayerColliders(player, {
      colliders: {
        platformColliders: layers.platformColliders,
      },
    });

    this.setupFollowUpCameraOn(player);
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
    return new Player(this, 100, 250).setScale(2);
    // return player;
  }

  createPlayerColliders(player, { colliders }) {
    player.addCollider(colliders.platformColliders);
  }

  setupFollowUpCameraOn(player) {
    const { height, width, mapOffset, zoomF } = this.config;
    this.physics.world.setBounds(0, 0, width + mapOffset, height + 150);
    this.cameras.main.setBounds(0, 0, width + mapOffset, height).setZoom(zoomF);
    this.cameras.main.startFollow(player);
  }
}
