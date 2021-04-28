class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this); // add to existing scene
        this.points = pointValue; // store point value
        this.moveSpeed = 3;       // pixels per frame 
    }

    update() {
        // move spaceshift left
        this.x -= this.moveSpeed;

        // wrap around 

        if (this.x <= 0 - this.width) {
            this.reset();
        }
    }
    // position reset
    reset() {
        this.moveSpeed = Math.ceil(Math.random() * 5) + 2;
        console.log(this.moveSpeed);
        this.x = game.config.width;
        let randheight = Math.floor(Math.random() * game.config.height - 180);
        this.y = randheight;
    }

}