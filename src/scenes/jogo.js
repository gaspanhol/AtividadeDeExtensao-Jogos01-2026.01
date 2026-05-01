export default class Jogo extends Phaser.Scene {
    constructor () {
        super('Jogo')
    }

    preload () {
        this.load.tilemapTiledJSON('mapa', 'public/assets/mapa/mapa.json')

        this.load.image('mapa-mansao32', 'public/assets/mapa/mapa-mansao32.png')
        this.load.image('objetos-mansao-32', 'public/assets/mapa/objetos-mansao-32.png')

        this.load.spritesheet('player', 'public/assets/personagens/player.png', {
            frameWidth: 48,
            frameHeight: 60
        })
    }

    create () {
        const mapa = this.make.tilemap({ key: 'mapa' })

        const tilesetChao = mapa.addTilesetImage('mapa-mansao32', 'mapa-mansao32')
        const tilesetObjetos = mapa.addTilesetImage('objetos-mansao-32', 'objetos-mansao-32')

        if (!tilesetChao || !tilesetObjetos) {
            console.error('Erro ao carregar tilesets')
        }

        const tilesets = [tilesetChao, tilesetObjetos]

        mapa.createLayer('chao', tilesets, 0, 0)
        mapa.createLayer('parede', tilesets, 0, 0)
        mapa.createLayer('teto', tilesets, 0, 0)
        mapa.createLayer('objetos', tilesets, 0, 0)

        this.player = this.physics.add.sprite(100, 100, 'player')
    }

    update () { }
}