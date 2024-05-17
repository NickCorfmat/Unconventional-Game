class Play extends Phaser.Scene {
  constructor(config) {
    super("PlayScene");
    this.config = config;
    this.enemies = null;
  }

  create({ gameStatus }) {
    this.score = 0;
    this.HUD = new HUD(this, 0, 0);
    const map = this.createMap();
    const layers = this.createLayers(map);
    const playerZones = this.getPlrZones(layers.playerZones);
    const collectables = this.createCollectables(layers.collectables);
    const player = this.createPlayer(playerZones.start);
    this.enemies = this.createEnemies();
    const enemies = this.enemies;

    this.createPlayerColliders(player, {
      colliders: {
        platformColliders: layers.platformColliders,
        traps: layers.traps,
        collectables,
        enemies,
      },
    });

    this.createHUD();
    this.createEndOfStage(playerZones.end, player);
    this.setupFollowUpCameraOn(player);

    if (gameStatus === "GAME_OVER") {
      return;
    }

    this.createGameEvents();

    this.input.keyboard.on("keydown", (input) => {
      if (input.key === "z") {
        this.sound.play("piano_C", { volume: 0.005 });
        this.tintKey("z");
      } else if (input.key === "x") {
        this.sound.play("piano_D", { volume: 0.005 });
        this.tintKey("x");
      } else if (input.key === "c") {
        this.sound.play("piano_E", { volume: 0.005 });
        this.tintKey("c");
      } else if (input.key === "b") {
        this.sound.play("guitar_C", { volume: 0.1 });
        this.tintKey("b");
      } else if (input.key === "n") {
        this.sound.play("guitar_E", { volume: 0.1 });
        this.tintKey("n");
      } else if (input.key === "m") {
        this.sound.play("cymbal", { volume: 0.1 });
        this.tintKey("m");
      } else if (input.key === "g") {
        this.sound.play("stop", { volume: 0.1 });
        this.tintKey("g");
      }
    });
  }

  createEnemies() {
    const enemies = this.physics.add.group();

    // Create and place 10 enemies randomly on the map
    for (let i = 0; i < 10; i++) {
      const x = Phaser.Math.Between(50, 1550); // Assuming a map width of 800
      const y = Phaser.Math.Between(50, 550); // Assuming a map height of 600
      const enemy = new Enemy(this, x, y, "enemy");
      enemies.add(enemy);
    }  

    return enemies;
  }

  createGameEvents() {
    const emitter = EventEmitter.getInstance();
    emitter.on("GAME_OVER", () => {
      console.log("Lost!");
      this.scene.restart({ gameStatus: "GAME_OVER" });
    });
  }
  createMap() {
    const map = this.make.tilemap({ key: `stage_${this.getCurrentStage()}` });

    map.addTilesetImage("main_lev_build_1", "tiles-1");
    return map;
  }

  createLayers(map) {
    const tileset = map.getTileset("main_lev_build_1");
    const platformColliders = map.createLayer("platformer_collider", tileset);
    // dont change the setDepth -> makes the diamonds in front of the bg environment
    const environment = map.createLayer("environment", tileset).setDepth(-2);
    const platforms = map.createLayer("platforms", tileset);
    const playerZones = map.getObjectLayer("player_zones");
    const traps = map.createLayer("traps", tileset);
    const collectables = map.getObjectLayer("collectables");

    // Only tiles with index more than 0 will be collideable
    platformColliders.setCollisionByProperty({ collides: true });
    traps.setCollisionByExclusion(-1);
    return {
      environment,
      platforms,
      platformColliders,
      playerZones,
      traps,
      collectables,
    };
  }

  createPlayer(start) {
    return new Player(this, start.x, start.y).setScale(2);
    // return player;
  }

  onHit(entity, source) {
    entity.takesHit(source);
  }

  onCollect(entity, collectable) {
    //console.log("collecting");
    this.score += collectable.score;
    console.log(this.score);
    // scoring changed here
    this.HUD.updateScore(this.score);
    // 1st arg disables the collectable, 2nd arg hides the collectable
    collectable.disableBody(true, true);
  }

  createPlayerColliders(player, { colliders }) {
    player.addCollider(colliders.platformColliders);
    player.addCollider(colliders.traps, this.onHit);
    player.addCollider(colliders.enemies, this.onHit);
    player.addOverlap(colliders.collectables, this.onCollect, this);
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
    return this.registry.get("stage") || 1;
  }

  createEndOfStage(end, player) {
    const endOfStage = this.physics.add
      .sprite(end.x, end.y, "end")
      .setSize(5, this.config.height)
      .setAlpha(0)
      .setOrigin(0.5, 1);

    const endOfStgOverlap = this.physics.add.overlap(player, endOfStage, () => {
      endOfStgOverlap.active = false;

      if (this.registry.get("stage") === this.config.lastStage) {
        console.log("Finished!");
        this.scene.start("FinishedScene");
        return;
      }
      this.registry.inc("stage", 1);
      this.scene.restart({ gameStatus: "STAGE_COMPLETED" });
      console.log("Victory!");
    });
  }

  createCollectables(collectableLayer) {
    // this is a group to place all of the diamonds (from the tiled map)
    const collectables = new Collectables(this).setDepth(-1);

    collectables.addFromLayer(collectableLayer);
    return collectables;
  }

  createHUD() {
    // top HUD

    // bottom HUD (keys)
    const LEFT_KEY = this.add
      .sprite(200, 730, "cxz")
      .setOrigin(0.5)
      .setScale(3)
      .setScrollFactor(0);

    const RIGHT_KEY = this.add
      .sprite(this.config.width - 200, 730, "zxc")
      .setOrigin(0.5)
      .setScale(3)
      .setScrollFactor(0);

    const JUMP = this.add
      .sprite(this.config.width / 2, 750, "bnm")
      .setOrigin(0.5)
      .setScale(3)
      .setScrollFactor(0);

    this.add
      .bitmapText(200, 810, "pixel-font", "LEFT", 48)
      .setOrigin(0.5)
      .setScrollFactor(0);
    this.add
      .bitmapText(this.config.width / 2, 830, "pixel-font", "JUMP", 48)
      .setOrigin(0.5)
      .setScrollFactor(0);
    this.add
      .bitmapText(this.config.width - 200, 810, "pixel-font", "RIGHT", 48)
      .setOrigin(0.5)
      .setScrollFactor(0);
  }

  tintKey(key) {
    switch (key) {
      case "z":
        const Z_1 = this.add
          .sprite(271, 729, "key-sprites", "Z")
          .setOrigin(0.5)
          .setScale(3)
          .setTint(0xff9e7a)
          .setScrollFactor(0);

        const Z_2 = this.add
          .sprite(this.config.width - 272, 729, "key-sprites", "Z")
          .setOrigin(0.5)
          .setScale(3)
          .setTint(0xff9e7a)
          .setScrollFactor(0);

        this.time.delayedCall(300, () => {
          Z_1.destroy();
          Z_2.destroy();
        });

        break;
      case "x":
        const X_1 = this.add
          .sprite(200, 729, "key-sprites", "X")
          .setOrigin(0.5)
          .setScale(3)
          .setTint(0xff9e7a)
          .setScrollFactor(0);

        const X_2 = this.add
          .sprite(this.config.width - 200, 729, "key-sprites", "X")
          .setOrigin(0.5)
          .setScale(3)
          .setTint(0xff9e7a)
          .setScrollFactor(0);

        this.time.delayedCall(300, () => {
          X_1.destroy();
          X_2.destroy();
        });

        break;
      case "c":
        const C_1 = this.add
          .sprite(127, 729, "key-sprites", "C")
          .setOrigin(0.5)
          .setScale(3)
          .setTint(0xff9e7a)
          .setScrollFactor(0);

        const C_2 = this.add
          .sprite(this.config.width - 127, 729, "key-sprites", "C")
          .setOrigin(0.5)
          .setScale(3)
          .setTint(0xff9e7a)
          .setScrollFactor(0);

        this.time.delayedCall(300, () => {
          C_1.destroy();
          C_2.destroy();
        });

        break;
      case "b":
        const B = this.add
          .sprite(this.config.width / 2 - 74, 750, "key-sprites", "B")
          .setOrigin(0.5)
          .setScale(3)
          .setTint(0xff9e7a)
          .setScrollFactor(0);

        this.time.delayedCall(300, () => {
          B.destroy();
        });

        break;
      case "n":
        const N = this.add
          .sprite(this.config.width / 2, 750, "key-sprites", "N")
          .setOrigin(0.5)
          .setScale(3)
          .setTint(0xff9e7a)
          .setScrollFactor(0);

        this.time.delayedCall(300, () => {
          N.destroy();
        });

        break;
      case "m":
        const M = this.add
          .sprite(this.config.width / 2 + 73, 750, "key-sprites", "M")
          .setOrigin(0.5)
          .setScale(3)
          .setTint(0xff9e7a)
          .setScrollFactor(0);

        this.time.delayedCall(300, () => {
          M.destroy();
        });

        break;
      default:
        break;
    }
  }

  update(time, delta){
    this.enemies.children.iterate((enemy) => {
      enemy.update();
    });
    }
  }

