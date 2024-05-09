class Play extends Phaser.Scene {
  constructor(config) {
    super("PlayScene");
    this.config = config;
  }

  create() {
    const map = this.createMap();
    const layers = this.createLayers(map);
    const playerZones = this.getPlrZones(layers.playerZones);

    const player = this.createPlayer(playerZones.start);

    this.createPlayerColliders(player, {
      colliders: {
        platformColliders: layers.platformColliders,
        traps: layers.traps,
      },
    });

    this.createEndOfLevel(playerZones.end, player);
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
    const playerZones = map.getObjectLayer("player_zones");
    const traps = map.createLayer("traps", tileset);

    // Only tiles with index more than 0 will be collideable
    platformColliders.setCollisionByProperty({ collides: true });
    traps.setCollisionByExclusion(-1);
    return { environment, platforms, platformColliders, playerZones, traps };
  }

  createPlayer(start) {
    return new Player(this, start.x, start.y).setScale(2);
    // return player;
  }

  onHit(entity, source) {
    entity.takesHit(source);
  }

  createPlayerColliders(player, { colliders }) {
    player.addCollider(colliders.platformColliders);
    player.addCollider(colliders.traps, this.onHit);
  }

  setupFollowUpCameraOn(player) {
    const { height, width, mapOffset, zoomF } = this.config;
    this.physics.world.setBounds(0, 0, width + mapOffset, height + 150);
    this.cameras.main.setBounds(0, 0, width + mapOffset, height).setZoom(zoomF);
    this.cameras.main.startFollow(player);
  }

  getPlrZones(playerZonesLayer) {
    const playerZones = playerZonesLayer.objects;
    return {
      start: playerZones.find((zones) => zones.name === "startZone"),
      end: playerZones.find((zones) => zones.name === "endZone"),
    };
  }

  createEndOfLevel(end, player) {
    const endOfLevel = this.physics.add
      .sprite(end.x, end.y, "end")
      .setSize(5, this.config.height)
      .setAlpha(0)
      .setOrigin(0.5, 1);

    const endOfLvlOverlap = this.physics.add.overlap(player, endOfLevel, () => {
      endOfLvlOverlap.active = false;
      console.log("Victory!");
    });
  }
}
