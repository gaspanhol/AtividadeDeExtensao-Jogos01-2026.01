import Abertura from '../scenes/abertura.js'
import Jogo from '../scenes/jogo.js'

const config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    scene: [Abertura, Jogo],
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: { y: 0 }
        }
    }
}

new Phaser.Game(config)
