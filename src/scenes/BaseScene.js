class BaseScene extends Phaser.Scene {
  constructor(key, config) {
    // passing key since every other class will be having a unique key that will be passed here
    super(key);
    this.config = config;
    this.fontSize = 40;
    this.lineHeight = 50;
    this.fontOptions = { fontSize: `${this.fontSize}px`, fill: "#fff" };
    this.screenCenter = [config.width / 2, config.height / 2];
  }

  create() {
    this.add.image(0, 0, "menu-bg").setOrigin(0).setScale(6);

    if (this.config.canGoBack) {
      const backButton = this.add
        .image(this.config.width - 10, this.config.height - 10, "backbutton")
        .setOrigin(1)
        .setScale(0.5)
        .setInteractive();

      backButton.on("pointerup", () => {
        this.scene.start("MenuScene");
      });
    }
  }

  createMenu(menu, setUpMenuEvents) {
    let lastMenuPositionY = 0;

    menu.forEach((menuItem) => {
      const menuPosition = [
        this.screenCenter[0],
        this.screenCenter[1] + lastMenuPositionY,
      ];
      menuItem.textObj = this.add
        .bitmapText(...menuPosition, "pixel-font", menuItem.text, 32)
        .setOrigin(0.5, 1); 
      lastMenuPositionY += this.lineHeight;
      setUpMenuEvents(menuItem);
    });
  }
}
