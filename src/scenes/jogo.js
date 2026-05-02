export default class Jogo extends Phaser.Scene {
    constructor () {
        super('Jogo')
    }

    preload () {
        this.load.tilemapTiledJSON('mapa', 'public/assets/mapa/mapa.json')

        this.load.spritesheet('mansao', 'public/assets/mapa/mansao.png', {
            frameWidth: 32,
            frameHeight: 32
        })
        this.load.spritesheet('objetos', 'public/assets/mapa/objetos.png', {
            frameWidth: 32,
            frameHeight: 32
        })
        this.load.spritesheet('objetosinv', 'public/assets/mapa/objetosinv.png', {
            frameWidth: 32,
            frameHeight: 32
        })
        this.load.spritesheet('quadros', 'public/assets/mapa/quadros.png', {
            frameWidth: 32,
            frameHeight: 32
        })

        this.load.spritesheet('player', 'public/assets/personagens/player.png', {
            frameWidth: 48,
            frameHeight: 50
        })
    }

    create () {
        const mapa = this.make.tilemap({ key: 'mapa' })
        this.cursors = this.input.keyboard.createCursorKeys()

        const tilesetChao = mapa.addTilesetImage('mansao', 'mansao')
        const tilesetObjetos = mapa.addTilesetImage('objetos', 'objetos')
        const tilesetObjetosInv = mapa.addTilesetImage('objetosinv', 'objetosinv')
        const tilesetQuadros = mapa.addTilesetImage('quadros', 'quadros')

        if (!tilesetChao || !tilesetObjetos || !tilesetQuadros) {
            console.error('Erro ao carregar tilesets')
        }

        const tilesets = [tilesetChao, tilesetObjetos, tilesetObjetosInv, tilesetQuadros]

        mapa.createLayer('chao', tilesets, 0, 0)
        mapa.createLayer('parede', tilesets, 0, 0)
        this.layerColisao = mapa.createLayer('colisao', tilesets, 0, 0)

        const layers = ['1', '2', '3']

        const tilesetsMap = mapa.tilesets

        const FLIP_X = 0x80000000
        const FLIP_Y = 0x40000000

        layers.forEach(nome => {
            const layer = mapa.getObjectLayer(nome)

            if (!layer) {
                console.warn('Layer não encontrada:', nome)
                return
            }

            layer.objects.forEach(obj => {
                if (!obj.gid) return

                // detectar flip
                const flipX = (obj.gid & FLIP_X) !== 0
                const flipY = (obj.gid & FLIP_Y) !== 0

                // limpar gid (remover flags)
                const gid = obj.gid & ~(FLIP_X | FLIP_Y)

                // encontrar tileset automaticamente
                const tileset = tilesetsMap.find(ts =>
                    gid >= ts.firstgid && gid < ts.firstgid + ts.total
                )

                if (!tileset) {
                    console.warn('Tileset não encontrado pro gid:', gid)
                    return
                }

                const frame = gid - tileset.firstgid

                const sprite = this.add.image(obj.x, obj.y, tileset.name, frame)
                    .setOrigin(0, 1)

                // aplicar flip
                sprite.setFlip(flipX, flipY)

                // depth por layer
                switch (nome) {
                    case '1':
                        sprite.setDepth(1)
                        break
                    case '2':
                        sprite.setDepth(2)
                        break
                    case '3':
                        sprite.setDepth(3)
                        break
                }
            })
        })
        
        this.layerColisao.setCollisionByExclusion([-1])

        this.player = this.physics.add.sprite(290, 407, 'player')
        this.direcao = 'baixo'
        this.physics.add.collider(this.player, this.layerColisao)
        this.player.setDepth(2)
        mapa.createLayer('teto', tilesets, 0, 0)

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
        //tileColor: null,
        //  collidingTileColor: new Phaser.Display.Color(255, 0, 0, 100)
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