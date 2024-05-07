const collidable = {
  addCollider(otherGameObj, callback) {
    this.scene.physics.add.collider(this, otherGameObj, callback, null, this);
  },
};
