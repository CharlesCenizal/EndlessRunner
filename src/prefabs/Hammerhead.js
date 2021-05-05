class Hammerhead extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this); // add to existing scene
        this.points = pointValue; // store point value
        this.moveSpeed = 7;       // pixels per frame
        this.active = false;
    }

    update() {
        if (this.active) {
            // move hammerhead left
            this.x -= this.moveSpeed;
        }

        // wrap around

        if (this.x <= 0 - this.width) {
            this.reset();
        }
    }
    // position reset
    reset() {
        this.active = false;
        this.x = game.config.width;
        let randheight = Math.floor(Math.random() * game.config.height - 200);
        this.y = randheight;
    }

}
