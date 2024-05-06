class Play extends Phaser.Scene {
  constructor() {
    super("PlayScene");
  }

  create() {
    const map = this.createMap();
    const layers = this.createLayers(map);

    const player = this.createPlayer();

    this.physics.add.collider(player, layers.platformColliders);
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
    return new Player(this, 100, 250);
    // return player;
  }
}
