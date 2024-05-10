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
};
