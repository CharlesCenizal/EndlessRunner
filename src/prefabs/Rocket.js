class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        // add object to existing scene
        scene.add.existing(this);
        this.isFiring = false; // track rocket firing status
        this.moveSpeed = 4;
        this.sfxRocket = scene.sound.add('sfx_rocket');
        this.dashTimer = 0;
        this.fatigue = false;
    }

    update(time, delta, counter) {
        console.log(this.dashTimer);
        if (this.dashTimer > 240) {
            this.fatigue = true;
            this.moveSpeed = 4;
        }
        if (this.dashTimer > 840) {
            this.dashTimer = 0;
            this.fatigue = false;
            this.isFiring = false;
        }
        if (this.isFiring) {
            if (!this.fatigue) {
                this.moveSpeed = 6;
            }
            this.dashTimer += 1;
        }
        // left and right movement
        if (keyLEFT.isDown && this.x >= borderUISize + 30) {
            this.x -= this.moveSpeed;
        }
        else if (keyRIGHT.isDown && this.x <= game.config.width - borderUISize - 30) {
            this.x += this.moveSpeed;
        }
        if (keyDOWN.isDown && this.y <= game.config.height - borderUISize - 100) {
            this.y += this.moveSpeed;
        }
        else if (keyUP.isDown && this.y >= borderUISize + 30) {
            this.y -= this.moveSpeed;
        }
        // fire buh Ton
        if (Phaser.Input.Keyboard.JustDown(keyF) && !this.isFiring) {
            this.isFiring = true;
            this.sfxRocket.play();
        }

        // if fired move the rocket up
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
