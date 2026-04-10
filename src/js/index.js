import config from './config.js'
import Phaser from 'phaser'
import abertura from './abertura.js'


class Game extends Phaser.Game {
    constructor () {
        super(config)
        this.scene.add('abertura', abertura)
        this.scene.start('abertura')
    }
}

window.onload = () => {
    window.Game = new Game()
}
