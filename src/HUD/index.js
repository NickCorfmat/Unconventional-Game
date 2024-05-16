class HUD extends Phaser.GameObjects.Container {
  constructor(scene, x, y) {
    super(scene, x, y);
    scene.add.existing(this);

    const { rightTopCorner } = scene.config;
    this.setPosition(rightTopCorner.x + 100, rightTopCorner.y + 5);
    // scrollfactor here
    this.setScrollFactor(0);

    this.fontSize = 20;

    // make sure it doesnt appear below the map lol
    this.setDepth(5);
    this.setupUI();
  }

  // set up initial elements
  setupUI() {
    const scoreboard = this.createScoreboard();
    const label = this.createLabel("Diamonds");

    this.add([label, scoreboard]);
    this.alignElements();
  }

  // text label
  createLabel(text) {
    return this.scene.add.text(0, 0, text, {
      fontSize: `${this.fontSize}px`,
      fill: "#fff",
    });
  }

  // scoreboard for text & img
  createScoreboard() {
    const scoreText = this.createText("0");
    const scoreImage = this.createImage("diamond", scoreText.width + 5, 0, 1.5);

    const scoreContainer = this.scene.add.container(0, 0, [
      scoreText,
      scoreImage,
    ]);

    // this is to set up the name for the container so it can be retrieved
    scoreContainer.setName("scoreboard");
    return scoreContainer;
  }

  createText(text) {
    return this.scene.add.text(0, 0, text, {
      fontSize: `${this.fontSize}px`,
      fill: "#fff",
    });
  }

  createImage(key, x, y, scale = 1) {
    return this.scene.add.image(x, y, key).setOrigin(0).setScale(scale);
  }

  // align elements vertically
  alignElements() {
    let lineHeight = 0;
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
