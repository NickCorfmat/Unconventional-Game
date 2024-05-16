class HUD extends Phaser.GameObjects.Container {
  constructor(scene, x, y) {
    super(scene, x, y);
    scene.add.existing(this);

    const { rightTopCorner } = scene.config;
    this.setPosition(rightTopCorner.x + 100, rightTopCorner.y + 5);
    // scroll factor here
    this.setScrollFactor(0);

    this.fontSize = 20;

    // make sure it doesnt appear below the map
    this.setDepth(5);
    this.setupUI();
  }

  // set up initial elements
  setupUI() {
    const label = this.createLabel("Diamonds");
    const scoreboard = this.createScoreboard();

    this.add([label, scoreboard]);
    this.alignElements();
  }

  // text label
  createLabel(text) {
    return this.scene.add
      .bitmapText(0, 0, "pixel-font", text, this.fontSize)
      .setOrigin(0, 0.5);
  }

  // scoreboard for text & img
  createScoreboard() {
    const scoreText = this.createText("0");
    const scoreImage = this.createImage(
      "diamond",
      scoreText.width + 5,
      0,
      1.25
    );

    scoreText.setOrigin(0, 0.5);
    scoreImage.setOrigin(0, 0.5);

    const scoreContainer = this.scene.add.container(0, 0, [
      scoreText,
      scoreImage,
    ]);

    // this is to set up the name for the container so it can be retrieved
    scoreContainer.setName("scoreboard");
    return scoreContainer;
  }

  createText(text) {
    return this.scene.add
      .bitmapText(0, 0, "pixel-font", text, this.fontSize)
      .setOrigin(0, 0.5);
  }

  createImage(key, x, y, scale = 1) {
    return this.scene.add.image(x, y, key).setOrigin(0, 0.5).setScale(scale);
  }

  // align elements vertically
  alignElements() {
    let lineHeight = 20;
    this.list.forEach((item) => {
      item.setPosition(item.x, item.y + lineHeight);
      lineHeight += this.fontSize;
    });
  }

  updateScore(score) {
    const [scoreText, scoreImage] = this.getByName("scoreboard").list;
    scoreText.setText(score);

    scoreImage.setX(scoreText.width + 5);
  }
}
