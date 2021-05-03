class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    // preload

    preload() {
        // first background
        this.load.image('map_1', './assets/map1.png')
        // sea background
        this.load.image('map_2','./assets/SeaBackground.png')
        this.load.image('map_3', './assets/map_3.png')
        this.load.image('map_4', './assets/map_4.png')
        this.load.image('rocket', './assets/Fish.png');
        this.load.image('spaceship', './assets/Shark.png')

        this.load.spritesheet('explosion', './assets/explosion.png', {
            frameWidth: 64,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 9
        });
    }
    // adding the menu
    create() {



        // place map_1
        //this.map_1 = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'map_1').setOrigin(0, 0);
        //this.map_2 = this.add.tileSprite(0,0, game.config.width, game.config.height, 'map_2').setOrigin(0, 0);
        this.map_3 = this.add.tileSprite(0,0, game.config.width, game.config.height, 'map_3').setOrigin(0, 0);
        this.map_4 = this.add.tileSprite(0,0, game.config.width, game.config.height, 'map_2').setOrigin(0, 0);
        // this.add.text(20, 20, "Rocket Patrol Play"); // debug line
        // green UI background
        //this.add.rectangle(0, borderUISize + borderPadding, game.config.width,
        //    borderUISize * 2, 0x00FF00).setOrigin(0, 0);

        // white borders
        //top
        //this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        // bottom
        //this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize,
        //    0xFFFFFF).setOrigin(0, 0);
        // left
        //this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        // right
        //this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height
        //    , 0xFFFFFF).setOrigin(0, 0);
        // add a Rocket
        this.player1Rocket = new Rocket(this, game.config.width / 2, game.config.height / 2, 'rocket').setOrigin(0.5, 0.5);
        // add spaceshift (x3)

        this.ship01 = new Spaceship(this, game.config.width + borderUISize * 6, borderUISize * 4, 'spaceship', 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize * 3, borderUISize * 5 + borderPadding * 2, 'spaceship', 0, 20).setOrigin(0, 0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize * 6 + borderPadding * 4, 'spaceship', 0, 10).setOrigin(0, 0);
        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {
                start: 0,
                end: 9,
                first: 0
            }),
            frameRate: 30
        });

        // keeping score
        this.p1Score = 0;

        // display the score

        let scoreConfig =
        {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F38141',
            color: '#843605',
            align: 'right',
            padding:
            {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding * 2, this.p1Score, scoreConfig);

        // game over
        this.gameOver = false;

        // 60 second play clock

        scoreConfig.fixedWidth = 0;
        //this.clock = this.time.delayedCall(60000, () => {
        //    this.add.text(game.config.width / 2, game.config.height / 2, 'GAME OVER', scoreConfig).setOrigin(0.5);
        //    this.add.text(game.config.width / 2, game.config.height / 2 + 64, 'Press (R) to Restart or ← to Menu', scoreConfig).setOrigin(0.5);
        //    this.gameOver = true;
        //}, null, this);

        this.timer = 0;
        this.counter = 0;
    }

    // update
    update(time, delta,counter) {

        this.timer += delta;
        while (this.timer > 1000) {
            this.scoreLeft.text = parseInt(this.scoreLeft.text) + 10;
            this.timer -= 1000;

        }
        if(parseInt(this.scoreLeft.text) % 150 == 0 && parseInt(this.scoreLeft.text) > 0)
        {
          this.map_4.setTexture('map_1');
        }
        else if(parseInt(this.scoreLeft.text) % 300 ==0 && parseInt(this.scoreLeft.text)> 0){
          this.map_4.setTexture('map_2');
        }

        this.map_3.tilePositionX += starSpeed;
        this.map_4.tilePositionX += starSpeed;
    
        if (!this.gameOver) {
            // update rocket
            this.player1Rocket.update();
            // update ships
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
        }


        // check collisions
        if (this.checkCollision(this.player1Rocket, this.ship01)) {
            //console.log('hit s1');
            //this.player1Rocket.reset();
            this.shipExplode(this.ship01);
        }
        if (this.checkCollision(this.player1Rocket, this.ship02)) {
            //console.log('hit s2');
            //this.player1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if (this.checkCollision(this.player1Rocket, this.ship03)) {
            //console.log('hit s3');
            //this.player1Rocket.reset();
            this.shipExplode(this.ship03);
        }
        //this.map_1 = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'map_1',500).setOrigin(0, 0);
        //this.map_2 = this.add.tileSprite(0,0, game.config.width, game.config.height, 'map_2',1000).setOrigin(0,0);
    }


    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width &&
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship.y) {
            return true; // collision
        }
        else {
            return false; // no collision
        }
    }

    shipExplode(ship) {
        console.log("trying to go to game over scene");
        this.scene.start("gameOverScene");
        // temporarily hide ship
        /*ship.alpha = 0;

        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');

        boom.on('animationcomplete', () => {
            ship.reset();
            ship.alpha = 1;
            boom.destroy();
        });
        // score add
        this.p1Score += ship.points;
        //this.scoreLeft.text = this.p1Score;
        // expload sound

        this.sound.play('sfx_explosion');
        //this.add.text(game.config.width / 2, game.config.height / 2, 'GAME OVER').setOrigin(0.5);
        //    this.add.text(game.config.width / 2, game.config.height / 2 + 64, 'Press (R) to Restart or ← to Menu').setOrigin(0.5);
        //    this.gameOver = true;*/


    }
}
