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
        this.layerColisao = mapa.createLayer('paredecolisao', tilesets, 0, 0)
        mapa.createLayer('teto', tilesets, 0, 0)
        mapa.createLayer('objetos', tilesets, 0, 0)
        
        this.layerColisao.setCollisionByExclusion([-1])

        this.player = this.physics.add.sprite(178, 405, 'player')
        this.direcao = 'baixo'
        this.physics.add.collider(this.player, this.layerColisao)

        // Câmera
        this.cameras.main.startFollow(this.player)
        this.cameras.main.setBounds(0, 0, mapa.widthInPixels, mapa.heightInPixels)
        this.cameras.main.setZoom(2)

        const animacoes = [
            {
                nome: 'cima',
                idle: [66, 67],    
                andar: [1, 8]
            },
            {
                nome: 'esquerda',
                idle: [68, 69],        
                andar: [10, 17]
            },
            {
                nome: 'baixo',
                idle: [70, 71],     
                andar: [19, 26]
            },
            {
                nome: 'direita',
                idle: [72, 73],      
                andar: [28, 35]
            }
        ]

        animacoes.forEach(anim => {

            // IDLE (parado)
            this.anims.create({
                key: 'idle-' + anim.nome,
                frames: this.anims.generateFrameNumbers('player', {
                    start: anim.idle[0],
                    end: anim.idle[1]
                }),
                frameRate: 2, 
                repeat: -1
            })

            // ANDAR 
            this.anims.create({
                key: 'andar-' + anim.nome,
                frames: this.anims.generateFrameNumbers('player', {
                    start: anim.andar[0],
                    end: anim.andar[1]
                }),
                frameRate: 8,
                repeat: -1
            })

        })

    }

    update () {

        // debug colisão
        //this.layerColisao.renderDebug(this.add.graphics(), {
        //    tileColor: null,
        //    collidingTileColor: new Phaser.Display.Color(255, 0, 0, 100)
        //})

        // debug posição do personagem
        // console.log(this.player.x, this.player.y)

        const velocidade = 150

        let vx = 0
        let vy = 0

        // detectar direção
        if (this.cursors.left.isDown) {
            vx = -velocidade
            this.direcao = 'esquerda'

        } else if (this.cursors.right.isDown) {
            vx = velocidade
            this.direcao = 'direita'

        } else if (this.cursors.up.isDown) {
            vy = -velocidade
            this.direcao = 'cima'

        } else if (this.cursors.down.isDown) {
            vy = velocidade
            this.direcao = 'baixo'
        }

        // aplicar movimento
        this.player.setVelocity(vx, vy)

        // animação
        if (vx !== 0 || vy !== 0) {
            this.player.anims.play('andar-' + this.direcao, true)
        } else {
            this.player.anims.play('idle-' + this.direcao, true)
        }
    }
}