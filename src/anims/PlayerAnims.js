/*
<< Animation Reference >>

- idle: 0, 12
- jump: 13, 20
- attack1: 26
- attack2: 39
- attack3: 43
- ouch/hit: 56
- dead: 63
*/

createAnimations = (anims) => {
  anims.create({
    key: "idle",
    frames: anims.generateFrameNames("player", {
      start: 0,
      end: 12,
    }),
    frameRate: 10,
    repeat: -1,
  });

  anims.create({
    key: "run",
    frames: anims.generateFrameNames("player", {
      start: 13,
      end: 20,
    }),
    frameRate: 10,
    repeat: -1,
  });

  anims.create({
    key: "jump",
    frames: anims.generateFrameNames("player", {
      start: 67,
      end: 70,
    }),
    frameRate: 2,
    repeat: 1,
  });

  anims.create({
    key: "crying",
    frames: anims.generateFrameNames("player", {
      start: 79,
      end: 81,
    }),
    frameRate: 10,
    repeat: -1,
  });

  anims.create({
    key: "scared",
    frames: anims.generateFrameNames("player", {
      start: 183,
      end: 188,
    }),
    frameRate: 5,
    repeat: -1,
    yoyo: true,
  });

  anims.create({
    key: "sword",
    frames: anims.generateFrameNames("player", {
      start: 26,
      end: 32,
    }),
    frameRate: 10,
    repeat: -1,
  });
};
