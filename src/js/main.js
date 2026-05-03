import Abertura from '../scenes/abertura.js'
import Jogo from '../scenes/jogo.js'
import Menu from '../scenes/menu.js'

const config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    scene: [Abertura, Menu, Jogo],
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: { y: 0 }
        }
    }
}

new Phaser.Game(config)
