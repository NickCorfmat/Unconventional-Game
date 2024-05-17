createEnemyAnimations = (anims) => {
  anims.create({
    key: "floating",
    frames: anims.generateFrameNames("enemy", {
      start: 10,
      end: 15,
    }),
    frameRate: 10,
    repeat: -1,
  });
};
