export default {
  type: Phaser.AUTO,
  width: 1920,
  height: 1080,
  parent: 'game-container',


  physics: {
    default: 'arcade',
    arcade: {
        gravity: {y:0},
        debug: true
    }
  },

  scale: {
    mode: Phaser.Scale.FIT,
    parent: 'game-container',
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 1920,
    height: 1080
  }
}