class GameOver extends Phaser.Scene {
    constructor() {
        super("gameOverScene");
    }

    preload() {
        this.load.image('map_1', './assets/map1.png')
        this.load.audio('sfx_select', './assets/discord-leave.mp3');
    }

    create() {
        let menuConfig =
        {
            fontFamily: 'Times',
            fontSize: '32px',
            backgroundColor: '#4B0082',
            color: '#ADD8E6',
            align: 'right',
            padding:
            {
                top: 10,
                bottom: 10,
            },
            fixedWidth: 0
        }
        let overConfig =
        {
            fontFamily: 'Times',
            fontSize: '14px',
            backgroundColor: '#4B0082',
            color: '#ADD8E6',
            align: 'right',
            padding:
            {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        this.map_1 = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'map_1').setOrigin(0, 0);
        this.add.text(game.config.width / 2, game.config.height / 2 - 160, 'GAME OVERRRRR',menuConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, game.config.height / 2 - 96, 'Press (R) to Restart or ← to Menu',menuConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, game.config.height / 2 + 64, 'Credits:',overConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, game.config.height / 2 + 96, 'Collaborators: Charles Cenizal (Programmer), Jacob Yu (Programmer), Efrain Luengas (Artist)',overConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, game.config.height / 2 + 128, 'Music: Made by Jacob Yu',overConfig).setOrigin(0.5);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.sound.play('sfx_select');
            this.scene.start("menuScene")
        }
        if (Phaser.Input.Keyboard.JustDown(keyR)) {
            this.sound.play('sfx_select');
            this.scene.start("playScene")
        }
    }
 }
