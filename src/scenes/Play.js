class Play extends Phaser.Scene {
  constructor(config) {
    super("PlayScene");
    this.config = config;
  }

  create({ gameStatus }) {
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

    this.createHUD()
    this.createEndOfStage(playerZones.end, player);
    this.setupFollowUpCameraOn(player);

    if (gameStatus === "GAME_OVER") {
      return;
    }

    this.createGameEvents();

    this.input.keyboard.on("keydown", (input) => {
      if (input.key === "z") {
        this.sound.play("piano_C", {volume: 0.5});
      } else if (input.key === "x") {
        this.sound.play("piano_D", {volume: 0.5});
      } else {
        this.sound.play("piano_E", {volume: 0.5});
      }
    });
  }

  createGameEvents() {
    /*
    const emitter = new EventEmitter();
    EventEmitter.on("GAME_OVER", () => {
      alert("Player has lost the game.");
    });
    */
  }
  createMap() {
    const map = this.make.tilemap({ key: `stage_${this.getCurrentStage()}` });

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

  getCurrentStage() {
    return this.registry.get("Stage") || 1;
  }

  createEndOfStage(end, player) {
    const endOfStage = this.physics.add
      .sprite(end.x, end.y, "end")
      .setSize(5, this.config.height)
      .setAlpha(0)
      .setOrigin(0.5, 1);

    const endOfStgOverlap = this.physics.add.overlap(player, endOfStage, () => {
      endOfStgOverlap.active = false;
      this.registry.inc("level", 1);
      this.scene.restart({ gameStatus: "STAGE_COMPLETED" });
      console.log("Victory!");
    });
  }

  createHUD() {
    const LEFT_KEY = this.add
    .sprite(200, 730, "cxz")
    .setOrigin(0.5)
    .setScale(3)

    const RIGHT_KEY = this.add
    .sprite(this.config.width - 200, 730, "zxc")
    .setOrigin(0.5)
    .setScale(3)

    const JUMP = this.add
    .sprite(this.config.width/2, 750, "bnm")
    .setOrigin(0.5)
    .setScale(3)

    this.add.bitmapText(200, 810, "pixel-font", "LEFT", 48).setOrigin(0.5)
    this.add.bitmapText(this.config.width/2, 830, "pixel-font", "JUMP", 48).setOrigin(0.5)
    this.add.bitmapText(this.config.width - 200, 810, "pixel-font", "RIGHT", 48).setOrigin(0.5)
  }

  update() {}
}
