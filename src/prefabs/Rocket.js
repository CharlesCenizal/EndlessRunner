class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        // add object to existing scene
        scene.add.existing(this);
        this.isFiring = false; // track rocket firing status
        this.moveSpeed = 2;
        this.sfxRocket = scene.sound.add('sfx_rocket');
    }

    update() {
        // left and right movement
        if (!this.isFiring) {
            if (keyLEFT.isDown && this.x >= borderUISize + 30) {
                this.x -= this.moveSpeed;
            }
            else if (keyRIGHT.isDown && this.x <= game.config.width - borderUISize - 30) {
                this.x += this.moveSpeed;
            }
            if (keyDOWN.isDown && this.y <= game.config.height - borderUISize - 30) {
                this.y += this.moveSpeed;
            }
            else if (keyUP.isDown && this.y >= borderUISize + 30) {
                this.y -= this.moveSpeed;
            }
        }
        // fire buh Ton
        if (Phaser.Input.Keyboard.JustDown(keyF) && !this.isFiring) {
            this.isFiring = true;
            this.sfxRocket.play();
        }

        // if fired move the rocket up
        if (this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
            this.y -= this.moveSpeed;
        }
        // reset on miss
        //if (this.y <= borderUISize * 3 + borderPadding) {
            //this.reset();
        //}
    }

    // reset rocket to ground
    reset() {
        this.isFiring = false;
        this.x = game.config.width/2;
        this.y = game.config.height - 30;
    }
}