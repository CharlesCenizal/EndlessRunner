class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this); // add to existing scene
        this.points = pointValue; // store point value
        this.moveSpeed = 3;       // pixels per frame
        this.tempSpeed = 4;
    }

    update() {
        // move spaceshift left
        this.x -= this.tempSpeed;

        // wrap around

        if (this.x <= 0 - this.width) {
            this.reset();
        }
    }
    // position reset
    reset() {
        this.tempSpeed = Math.ceil(Math.random() * 3) + this.moveSpeed;
        //console.log(this.moveSpeed);
        this.x = game.config.width;
        let randheight = Math.floor(Math.random() * game.config.height - 180);
        if (randheight < 34) {
            randheight = 34;
        }
        this.y = randheight;
    }

}
