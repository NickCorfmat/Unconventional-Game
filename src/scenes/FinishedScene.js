class FinishedScene extends BaseScene {
  constructor(config) {
    super("FinishedScene", { ...config, canGoBack: true });
  }

  create() {
    super.create();

    const finishedText = "YOU WON!";

    const textOptions = {
      ...this.fontOptions,
      wordWrap: { width: this.config.width - 40 },
      align: "center",
    };

    this.add
      .bitmapText(
        this.screenCenter[0],
        this.screenCenter[1],
        "pixel-font",
        finishedText,
        30
      )
      .setOrigin(0.5);
  }
}
