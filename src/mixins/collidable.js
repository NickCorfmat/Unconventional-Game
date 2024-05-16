const collidable = {
  addCollider(otherGameObj, callback, context) {
    this.scene.physics.add.collider(
      this,
      otherGameObj,
      callback,
      null,
      context || this
    );
  },
  // adding in this context should get the current scene's collectable's score property
  addOverlap(otherGameObj, callback, context) {
    this.scene.physics.add.overlap(
      this,
      otherGameObj,
      callback,
      null,
      context || this
    );
    return this;
  },
};
