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

// game config
let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Menu, Play, GameOver]
}
let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
let starSpeed = 3;

// reserve keyboard bindings

let keyF, keyR, keyLEFT, keyRIGHT, keyUP, keyDOWN;
