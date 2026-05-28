import Abertura from '../scenes/abertura.js'
import Jogo from '../scenes/jogo.js'
import Menu from '../scenes/menu.js'
import MenuPausa from '../scenes/MenuPausa.js'

const config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    scene: [Abertura, Menu, Jogo, MenuPausa],
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: { y: 0 }
        }
    }
}

new Phaser.Game(config)
