class CreditsScene extends BaseScene {
  constructor(config) {
    super("CreditsScene", { ...config, canGoBack: true });
  }

  create() {
    super.create();

    const creditsText =
      "Elthen - Character Sprites\nSzadi art.- Environment Assets/Sprites";

    this.add
      .bitmapText(
        this.screenCenter[0],
        this.screenCenter[1],
        "pixel-font",
        creditsText,
        30
      )
      .setOrigin(0.5);
  }
}
