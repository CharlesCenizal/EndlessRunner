class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    preload() {
        this.load.image('map_1', './assets/map1.png')
        this.load.audio('sfx_select', './assets/discord-leave.mp3');
        this.load.audio('sfx_explosion', './assets/assets_explosion38.wav');
        this.load.audio('sfx_rocket', './assets/assets_rocket_shot.wav');
        this.load.audio('music','./assets/UnderwaterJingle.mp3')
        this.load.audio('explode', './assets/roblox.mp3');
    }
    // adding the menu
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
        // show menu text
        this.map_1 = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'map_1').setOrigin(0, 0);
        this.add.text(game.config.width / 2, game.config.height / 2 - 160, 'Shark Dodger',menuConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, game.config.height / 2 - 96, 'Press up and down to dodge the sharks',menuConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, game.config.height / 2 - 32, 'Press F for a speedboost',menuConfig).setOrigin(0.5);

        menuConfig.backgorundColor = "#4B0082";
        menuConfig.color = '#ADD8E6';
        this.add.text(game.config.width / 2, game.config.height / 2 + borderUISize + borderPadding, 'Press ← or → to play', menuConfig).setOrigin(0.5);

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        this.music = this.sound.add('music');

        var musicConfig =
        {
          mute: false,
          volume: 1,
          rate: 1,
          detune: 0,
          seek: 0,
          loop: true,
          delate: 0
        }
        this.music.play(musicConfig);
        //this.add.text(20, 20, "Rocket Patrol Menu");
        // change scenes
        //this.scene.start("playScene")
    }
    update() {
        //this.music.play(musicConfig);
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            game.settings =
            {
                spaceshipSpeed: 3,
                gameTimer: 60000
            }
            this.sound.play('sfx_select');
            this.scene.start("playScene");
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            game.settings =
            {
                spaceshipSpeed: 4,
                gameTimer: 45000
            }
            this.sound.play('sfx_select');
            this.scene.start("playScene");
        }
    }

}
