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
      .text(...this.screenCenter, finishedText, textOptions)
      .setOrigin(0.5);
  }
}
