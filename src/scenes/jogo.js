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
        this.cursors = this.input.keyboard.createCursorKeys()

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
        this.direcao = 'baixo'

        // animações parado

        this.anims.create({
            key: 'idle-cima',
            frames: [{ key: 'player', frame: 0 }],
            frameRate: 1
        })

        this.anims.create({
            key: 'idle-esquerda',
            frames: [{ key: 'player', frame: 9 }],
            frameRate: 1
        })

        this.anims.create({
            key: 'idle-baixo',
            frames: [{ key: 'player', frame: 18 }],
            frameRate: 1
        })

        this.anims.create({
            key: 'idle-direita',
            frames: [{ key: 'player', frame: 27 }],
            frameRate: 1
        })

        //animações de andar

        this.anims.create({
            key: 'andar-cima',
            frames: this.anims.generateFrameNumbers('player', { start: 1, end: 8 }),
            frameRate: 8,
            repeat: -1
        })

        this.anims.create({
            key: 'andar-esquerda',
            frames: this.anims.generateFrameNumbers('player', { start: 10, end: 17 }),
            frameRate: 8,
            repeat: -1
        })

        this.anims.create({
            key: 'andar-baixo',
            frames: this.anims.generateFrameNumbers('player', { start: 19, end: 26 }),
            frameRate: 8,
            repeat: -1
        })

        this.anims.create({
            key: 'andar-direita',
            frames: this.anims.generateFrameNumbers('player', { start: 28, end: 35 }),
            frameRate: 8,
            repeat: -1
        })

    }

    update () {

        // velocidade do personagem
        const velocidade = 150

        this.player.setVelocity(0)

        // movimento e animação

        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-velocidade)
            this.player.anims.play('andar-esquerda', true)
            this.direcao = 'esquerda'

        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(velocidade)
            this.player.anims.play('andar-direita', true)
            this.direcao = 'direita'

        } else if (this.cursors.up.isDown) {
            this.player.setVelocityY(-velocidade)
            this.player.anims.play('andar-cima', true)
            this.direcao = 'cima'

        } else if (this.cursors.down.isDown) {
            this.player.setVelocityY(velocidade)
            this.player.anims.play('andar-baixo', true)
            this.direcao = 'baixo'

        } else {
            this.player.setVelocity(0)

            // toca o idle baseado na última direção
            this.player.anims.play('idle-' + this.direcao, true)
        }
    }
}