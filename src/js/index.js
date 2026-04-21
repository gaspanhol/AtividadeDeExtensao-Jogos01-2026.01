import config from './config.js'
import Abertura from './scene/abertura.js'


class Game extends Phaser.Game {
    constructor () {
        super(config)
        this.scene.add('abertura', Abertura)
        this.scene.start('abertura')
    }
}

window.onload = () => {
    window.Game = new Game()
}
