class CreditsScene extends BaseScene {
  constructor(config) {
    super("CreditsScene", { ...config, canGoBack: true });
  }

  create() {
    super.create();

    const creditsText = "Elthen - Character Sprites\n";

    const textOptions = {
      ...this.fontOptions,
      wordWrap: { width: this.config.width - 40 },
      align: "center",
    };
    this.add
      .text(...this.screenCenter, creditsText, textOptions)
      .setOrigin(0.5);
  }
}
