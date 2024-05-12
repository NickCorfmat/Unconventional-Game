class TutorialScene extends BaseScene {
  constructor(config) {
    super("TutorialScene", { ...config, canGoBack: true });
  }

  create() {
    super.create();

    const tutorialText =
      "- zxc: run right\n- cxz: run left\n- bnm: jump\n- g: stop";

    const textOptions = {
      ...this.fontOptions,
      wordWrap: { width: this.config.width - 40 },
      align: "left",
    };
    this.add
      .text(...this.screenCenter, tutorialText, textOptions)
      .setOrigin(0.5);
  }
}
