export default {
  type: Phaser.AUTO,
  width: 1280,
  height: 720,
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
    width: 1280,
    height: 720
  }
}