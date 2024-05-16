class Collectables extends Phaser.Physics.Arcade.StaticGroup {
  constructor(scene) {
    super(scene.physics.world, scene);

    // should create the instance of Collectable.js into the group
    this.createFromConfig({
      classType: Collectable,
    });
  }

  mapProperties(propertiesList) {
    if (!propertiesList || propertiesList.length === 0) {
      return {};
    }

    return propertiesList.reduce((map, obj) => {
      map[obj.name] = obj.value;
      return map;
    }, {});
  }
  addFromLayer(layer) {
    const { score: defaultScore, type } = this.mapProperties(layer.properties);

    layer.objects.forEach((collectableObj) => {
      //collectables.add(new Collectable(this, collectableObj.x, collectableObj.y, "diamond")).setDepth(-1);

      // create a new diamond collectable
      const collectable = this.get(collectableObj.x, collectableObj.y, type);

      // extract properties and map over them
      const props = this.mapProperties(collectableObj.properties);

      // set the score
      collectable.score = props.score || defaultScore;
    });
  }
}
