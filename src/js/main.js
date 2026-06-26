import Abertura from '../scenes/abertura.js'
import Jogo from '../scenes/jogo.js'
import Menu from '../scenes/menu.js'
import MenuPausa from '../scenes/MenuPausa.js'
import MenuExtras from '../scenes/MenuExtras.js'

const config = {
    type: Phaser.AUTO,
    pixelArt: true,
    width: 1280,
    height: 720,
    scene: [Abertura, Menu, Jogo, MenuPausa, MenuExtras],
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: { y: 0 }
        }
    }
}

new Phaser.Game(config)
