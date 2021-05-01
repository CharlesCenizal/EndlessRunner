// GameOver scene
class GameOver extends Phaser.Scene {
  constructor() {
    super('gameOverScene');
  }
  create(){
      this.add.text(game.config.width / 2, game.config.height / 2 + 64, 'Press (R) to Restart or ← to Menu').setOrigin(0.5);
  }
  update(){
    if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT))
    {
        this.scene.start("menuScene")
    }
  }
}
