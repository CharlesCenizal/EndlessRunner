class GameOver extends Phaser.Scene {
    constructor() {
        super("gameOverScene");
    }

    preload() {
        this.load.image('map_1', './assets/map1.png')
    }

    create() {
        this.map_1 = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'map_1').setOrigin(0, 0);
        this.add.text(game.config.width / 2, game.config.height / 2, 'GAMEOVERRRRR').setOrigin(0.5);
        this.add.text(game.config.width / 2, game.config.height / 2 + 64, 'Press (R) to Restart or ← to Menu').setOrigin(0.5);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    }
    
    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene")
        }
    }
 }
  