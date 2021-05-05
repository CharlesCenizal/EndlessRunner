// Comment Explanation for "Organization"
/*
Collaborator Names:
Charles Cenizal
Jacob Yu
Efrain Luengas

Date Completed:
5/4/21

Game Title:
 Shark Dodger

*/

/*
Creative tilt:
--------------------------------------------------------------
The portion of our game that is technically interesting
And also adds great visual style to the game is that the
tileSprite changes every 100 points
This was implemented using if else statements, modulus
and the .setTexture('image') method in order to add technical
involvement into the game.
--------------------------------------------------------------
*/
class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    // preload

    preload() {
        // first background
        this.load.image('map_1', './assets/map1.png')
        // sea background
        this.load.image('sea0','./assets/sea0.png')
        this.load.image('sea1','./assets/sea1.png')
        this.load.image('sea2','./assets/sea2.png')
        this.load.image('sea3','./assets/sea3.png')
        this.load.image('sea4','./assets/sea4.png')
        this.load.image('sea5','./assets/sea5.png')
        this.load.image('sea6','./assets/sea6.png')
        //this.load.image('map_3', './assets/map_3.png')
        //this.load.image('map_4', './assets/map_4.png')
        this.load.image('rocket', './assets/Fish.png');
        this.load.image('spaceship', './assets/Shark.png');
        this.load.image('hammerhead', './assets/Hammerhead.png');
        this.load.audio('sfx_select', './assets/discord-leave.mp3');

        this.load.spritesheet('explosion', './assets/explosion.png', {
            frameWidth: 64,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 9
        });
    }
    // adding the menu
    create() {





        this.curr_background = this.add.tileSprite(0,0, game.config.width, game.config.height, 'sea0').setOrigin(0, 0);

        this.player1Rocket = new Rocket(this, game.config.width / 2, game.config.height / 2, 'rocket').setOrigin(0.5, 0.5);
        // add spaceshift (x3)

        this.ship01 = new Spaceship(this, game.config.width + borderUISize * 6, borderUISize * 4, 'spaceship', 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize * 3, borderUISize * 5 + borderPadding * 2, 'spaceship', 0, 20).setOrigin(0, 0);
      //  this.ship03 = new Spaceship(this, game.config.width, borderUISize * 6 + borderPadding * 4, 'spaceship', 0, 10).setOrigin(0, 0);
        this.hammerhead = new Hammerhead(this, game.config.width, borderUISize * 6 + borderPadding * 4, 'hammerhead', 0, 10).setOrigin(0, 0);
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

        this.difficultyTimer = 0;
        this.timer = 0;
        this.counter = 0;
    }

    // update
    update(time, delta,counter) {
        this.difficultyTimer += delta;
        this.timer += delta;
        while (this.difficultyTimer > 30000) {
            this.difficultyTimer -= 30000;
            if (this.ship01.moveSpeed < 7) {
                this.ship01.moveSpeed += .5;
                this.ship02.moveSpeed += .5;
                //this.ship03.moveSpeed += 1;
            }
        }
        while (this.timer > 1000) {
            this.scoreLeft.text = parseInt(this.scoreLeft.text) + 10;
            this.timer -= 1000;
        }

        if(parseInt(this.scoreLeft.text) % 1000 == 0 && parseInt(this.scoreLeft.text) > 0)
        {
          this.sound.play('sfx_select');
          this.curr_background.setTexture('map_1');
        }

        else if(parseInt(this.scoreLeft.text) % 900 == 0 && parseInt(this.scoreLeft.text) > 0)
        {
          this.sound.play('sfx_select');
          this.curr_background.setTexture('sea6');
        }
        else if(parseInt(this.scoreLeft.text) % 800 == 0 && parseInt(this.scoreLeft.text) > 0)
        {
          this.sound.play('sfx_select');
          this.curr_background.setTexture('sea5');
        }

        else if(parseInt(this.scoreLeft.text) %  700 ==0 && parseInt(this.scoreLeft.text)> 0){
          this.sound.play('sfx_select');
          this.curr_background.setTexture('sea4');
        }

        else if(parseInt(this.scoreLeft.text) %  600 ==0 && parseInt(this.scoreLeft.text)> 0){
          this.sound.play('sfx_select');
          this.curr_background.setTexture('sea2');
        }

        else if(parseInt(this.scoreLeft.text) %  500 ==0 && parseInt(this.scoreLeft.text)> 0){
          this.sound.play('sfx_select');
          this.curr_background.setTexture('sea0');
        }

        else if(parseInt(this.scoreLeft.text) %  400 ==0 && parseInt(this.scoreLeft.text)> 0){
          this.sound.play('sfx_select');
          this.curr_background.setTexture('sea6');
        }

        else if(parseInt(this.scoreLeft.text) %  300 ==0 && parseInt(this.scoreLeft.text)> 0){
          this.sound.play('sfx_select');
          this.curr_background.setTexture('sea5');
        }

        else if(parseInt(this.scoreLeft.text) %  200 ==0 && parseInt(this.scoreLeft.text)> 0){
          this.sound.play('sfx_select');

          this.curr_background.setTexture('sea4');
        }

        else if(parseInt(this.scoreLeft.text) %  100 ==0 && parseInt(this.scoreLeft.text)> 0){
          this.sound.play('sfx_select');
          this.curr_background.setTexture('sea2');
        }


        this.curr_background.tilePositionX += starSpeed;

        if (!this.gameOver) {
            // update rocket
            this.player1Rocket.update();
            // update ships
            this.ship01.update();
            this.ship02.update();
            //this.ship03.update();
            this.hammerhead.update();
            if (!this.hammerhead.active) {
                let randInt = Math.floor((Math.random() * 300));
                if (randInt == 30) {
                    this.hammerhead.active = true;
                }
            }
        }


        // check collisions
        if (this.checkCollision(this.player1Rocket, this.ship01)) {

            this.shipExplode(this.ship01);
        }
        if (this.checkCollision(this.player1Rocket, this.ship02)) {

            this.shipExplode(this.ship02);
        }
        /*
        if (this.checkCollision(this.player1Rocket, this.ship03)) {

            this.shipExplode(this.ship03);
        }
*/
        if (this.checkCollision(this.player1Rocket, this.hammerhead)) {

            this.shipExplode(this.ship01);
        }

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
        this.sound.play('explode');
        console.log("trying to go to game over scene");
        this.scene.start("gameOverScene");


    }
}
