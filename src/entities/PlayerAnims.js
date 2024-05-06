/*
<< Animation Reference >>

- idle: 0, 12
- walk: 13, 20
- attack1: 21-30
- attack2: 31-40
- attack3: 41-50
- jump: 51-56
- ouch/hit: 57-60
- dead: 61-67
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
};
