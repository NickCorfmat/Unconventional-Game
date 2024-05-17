createEnemyAnimations = (anims) => {
  anims.create({
    key: "static",
    frames: anims.generateFrameNames("enemy", {
      start: 0,
      end: 32,
    }),
    frameRate: 30,
    repeat: -1,
  });
};
