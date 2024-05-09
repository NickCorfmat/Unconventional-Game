class Healthbar {
  constructor(scene, x, y, scale = 1, health) {
    this.bar = new Phaser.GameObjects.Graphics(scene);

    // object should follow cam
    this.bar.setScrollFactor(0, 0);

    this.x = x / scale;
    this.y = y / scale;
    this.value = health;
    this.scale = scale;

    this.size = {
      width: 40,
      height: 8,
    };

    this.pixelPerHealth = this.size.width / this.value;

    scene.add.existing(this.bar);
    this.draw(this.x, this.y, this.scale);
  }

  decrease(amount) {
    if (amount <= 0) {
      this.value = 0;
    } else {
      this.value = amount;
    }

    this.draw(this.x, this.y, this.scale);
  }
  draw(x, y, scale) {
    this.bar.clear();
    const { width, height } = this.size;

    const margin = 2;

    // outline color
    this.bar.fillStyle(0x36454f);
    this.bar.fillRect(x, y, width + margin, height + margin);

    // underlayer color
    this.bar.fillStyle(0xcfffff);
    this.bar.fillRect(x + margin, y + margin, width - margin, height - margin);

    const healthWidth = Math.floor(this.value * this.pixelPerHealth);
    
    // bar color
    this.bar.fillStyle(0x51ad52);

    if (healthWidth <= this.size.width / 3) {
      this.bar.fillStyle(0xff0000);
    } else {
      this.bar.fillStyle(0x0ff00);
    }
    if (healthWidth > 0) {
      this.bar.fillRect(
        x + margin,
        y + margin,
        healthWidth - margin,
        height - margin
      );
    }

    this.bar.setScrollFactor(0, 0).setScale(scale);
  }
}
