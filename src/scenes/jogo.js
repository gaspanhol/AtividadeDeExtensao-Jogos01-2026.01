import SoundManager from './SoundManager.js'

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
        this.load.spritesheet('Graveyard', 'public/assets/mapa/Graveyard.png', {
            frameWidth: 32,
            frameHeight: 32
        })
        this.load.spritesheet('GardenWalls', 'public/assets/mapa/GardenWalls.png', {
            frameWidth: 32,
            frameHeight: 32
        })
        this.load.spritesheet('GardenTerrain', 'public/assets/mapa/GardenTerrain.png', {
            frameWidth: 32,
            frameHeight: 32
        })

        this.load.spritesheet('player', 'public/assets/personagens/player.png', {
            frameWidth: 48,
            frameHeight: 50
        })
        this.load.image('vazio128x128', 'public/assets/vazio_128x128.png')

        const sonsParaCarregar = [
            { key: 'passo',  path: 'public/assets/sons/passo.mp3'  },
            { key: 'correr', path: 'public/assets/sons/passo.mp3' },
            { key: 'musica', path: 'public/assets/sons/musica.mp3' },
        ]

        sonsParaCarregar.forEach(({ key, path }) => {
                this.load.audio(key, path)
            })

        this.load.on('loaderror', (file) => {
                console.warn(`Arquivo não encontrado, ignorando: ${file.key}`)  
            })

        }

    create () {
        const mapa = this.make.tilemap({ key: 'mapa' })
        this.cursors = this.input.keyboard.createCursorKeys()

        this.shift = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT) //botão shift

        this.wasd = this.input.keyboard.addKeys({    //movimentação no WASD
        up:    Phaser.Input.Keyboard.KeyCodes.W,
        left:  Phaser.Input.Keyboard.KeyCodes.A,
        down:  Phaser.Input.Keyboard.KeyCodes.S,
        right: Phaser.Input.Keyboard.KeyCodes.D
        })
        this.teclaEsc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC)

        const tilesetChao = mapa.addTilesetImage('mansao', 'mansao')
        const tilesetObjetos = mapa.addTilesetImage('objetos', 'objetos')
        const tilesetObjetosInv = mapa.addTilesetImage('objetosinv', 'objetosinv')
        const tilesetQuadros = mapa.addTilesetImage('quadros', 'quadros')
        const tilesetGraveyard = mapa.addTilesetImage('Graveyard', 'Graveyard')
        const tilesetGardenWalls = mapa.addTilesetImage('GardenWalls', 'GardenWalls')
        const tilesetGardenTerrain = mapa.addTilesetImage('GardenTerrain', 'GardenTerrain')

        if (
            !tilesetChao ||
            !tilesetObjetos ||
            !tilesetObjetosInv ||
            !tilesetQuadros ||
            !tilesetGraveyard ||
            !tilesetGardenWalls ||
            !tilesetGardenTerrain
        ) {
            console.error('Erro ao carregar algum tileset')
        }

        const tilesets = [tilesetChao, tilesetObjetos, tilesetObjetosInv, tilesetQuadros, tilesetGardenTerrain, tilesetGardenWalls, tilesetGraveyard]

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

        this.player = this.physics.add.sprite(784.5, 3233.6, 'player')
        window.player = this.player //Comando para ver a localização do player no jogo, usando o comando console.log(player.x, player.y)
        this.direcao = 'baixo'
        this.physics.add.collider(this.player, this.layerColisao)
        this.player.setDepth(2)
        const teto = mapa.createLayer('teto', tilesets, 0, 0)
        teto.setDepth(3)
        
        // Câmera
        this.cameras.main.startFollow(this.player)
        this.cameras.main.setBounds(0, 0, mapa.widthInPixels, mapa.heightInPixels)
        this.cameras.main.setZoom(2)

        const animacoes = [
            {
                nome: 'cima',
                idle: [66, 67],    
                andar: [1, 8],
                correr: [75,81],
                pegarItem: [37,42]
            },
            {
                nome: 'esquerda',
                idle: [68, 69],        
                andar: [10, 17],
                correr: [82,88],
                pegarItem: [43,48]
            },
            {
                nome: 'baixo',
                idle: [70, 71],     
                andar: [19, 26],
                correr: [91,97],
                pegarItem: [49,54]
            },
            {
                nome: 'direita',
                idle: [72, 73],      
                andar: [28, 35],
                correr: [98,105],
                pegarItem:[55,60]
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

            this.anims.create({
                key: 'correr-' + anim.nome,
                frames: this.anims.generateFrameNumbers('player', {
                    start: anim.correr[0],
                    end: anim.correr[1]
                }),
                frameRate: 12,
                repeat: -1
            })

            this.anims.create({
                key: 'pegarItem-' + anim.nome,
                frames: this.anims.generateFrameNumbers('player', {
                    start: anim.pegarItem[0],
                    end: anim.pegarItem[1]
                }),
                frameRate: 8,
                repeat: -1
            })

        })

        this.soundManager = new SoundManager(this)
        this.soundManager.create()

        // ..:: PORTAS ::..

        // ..:: cenário Lobby ::..
        this.porta1 = this.physics.add.sprite(319.5, 3071.1, 'vazio128x128')
        this.physics.add.overlap(this.player, this.porta1, () => {
            this.cameras.main.fadeOut(200)
            this.player.x = 319.5
            this.player.y = 2818.6
            this.cameras.main.once('camerafadeoutcomplete', (camera) => {
                camera.fadeIn(200)
            })
        })

        this.porta2 = this.physics.add.sprite(592, 3071.1, 'vazio128x128')
        this.physics.add.overlap(this.player, this.porta2, () => {
            this.cameras.main.fadeOut(200)
            this.player.x = 592
            this.player.y = 2818.6
            this.cameras.main.once('camerafadeoutcomplete', (camera) => {
                camera.fadeIn(200)
            })
        })

        this.porta3 = this.physics.add.sprite(862.83, 3071.1, 'vazio128x128')
        this.physics.add.overlap(this.player, this.porta3, () => {
            this.cameras.main.fadeOut(200)
            this.player.x = 862.83
            this.player.y = 2818.6
            this.cameras.main.once('camerafadeoutcomplete', (camera) => {
                camera.fadeIn(200)
            })
        })

        this.porta4 = this.physics.add.sprite(1040.5, 3166.9, 'vazio128x128')
        this.physics.add.overlap(this.player, this.porta4, () => {
            this.cameras.main.fadeOut(200)
            this.player.x = 1241.9
            this.player.y = 3166.9
            this.cameras.main.once('camerafadeoutcomplete', (camera) => {
                camera.fadeIn(200)
            })
        })


        this.porta5 = this.physics.add.sprite(1040.5, 3328.77, 'vazio128x128')
        this.physics.add.overlap(this.player, this.porta5, () => {
            this.cameras.main.fadeOut(200)
            this.player.x = 1241.9
            this.player.y = 3322.77
            this.cameras.main.once('camerafadeoutcomplete', (camera) => {
                camera.fadeIn(200)
            })
        })

        // ..:: cenário fase 1 ::..
        this.porta6 = this.physics.add.sprite(319.5, 2864.6, 'vazio128x128')
        this.physics.add.overlap(this.player, this.porta6, () => {
            this.cameras.main.fadeOut(200)
            this.player.x = 319.5
            this.player.y = 3128.6
            this.cameras.main.once('camerafadeoutcomplete', (camera) => {
                camera.fadeIn(200)
            })
        })

        this.porta7 = this.physics.add.sprite(592, 2864.6, 'vazio128x128')
        this.physics.add.overlap(this.player, this.porta7, () => {
            this.cameras.main.fadeOut(200)
            this.player.x = 592
            this.player.y = 3128.6
            this.cameras.main.once('camerafadeoutcomplete', (camera) => {
                camera.fadeIn(200)
            })
        })

        this.porta8 = this.physics.add.sprite(864.5, 2864.6, 'vazio128x128')
        this.physics.add.overlap(this.player, this.porta8, () => {
            this.cameras.main.fadeOut(200)
            this.player.x = 864.5
            this.player.y = 3128.6
            this.cameras.main.once('camerafadeoutcomplete', (camera) => {
                camera.fadeIn(200)
            })
        })

        this.porta9 = this.physics.add.sprite(319.5, 2426.9, 'vazio128x128')
        this.physics.add.overlap(this.player, this.porta9, () => {
            this.cameras.main.fadeOut(200)
            this.player.x = 319.5
            this.player.y = 2181.9
            this.cameras.main.once('camerafadeoutcomplete', (camera) => {
                camera.fadeIn(200)
            })
        })

        this.porta10 = this.physics.add.sprite(592, 2426.9, 'vazio128x128')
        this.physics.add.overlap(this.player, this.porta10, () => {
            this.cameras.main.fadeOut(200)
            this.player.x = 592
            this.player.y = 2181.9
            this.cameras.main.once('camerafadeoutcomplete', (camera) => {
                camera.fadeIn(200)
            })
        })

        this.porta11 = this.physics.add.sprite(864.5, 2426.9, 'vazio128x128')
        this.physics.add.overlap(this.player, this.porta11, () => {
            this.cameras.main.fadeOut(200)
            this.player.x = 864.5
            this.player.y = 2181.9
            this.cameras.main.once('camerafadeoutcomplete', (camera) => {
                camera.fadeIn(200)
            })
        })

        // ..:: cenário fase 2 ::..
    //     this.porta12 = this.physics.add.sprite(1189.4, 3166.9, 'vazio128x128')
    //     this.physics.add.overlap(this.player, this.porta12, () => {
    //         this.cameras.main.fadeOut(200)
    //         this.player.x = 996.9
    //         this.player.y = 3166.9
    //         this.cameras.main.once('camerafadeoutcomplete', (camera) => {
    //             camera.fadeIn(200)
    //         })
    //     })


    //     this.porta13 = this.physics.add.sprite(1189.4, 3328.77, 'vazio128x128')
    //     this.physics.add.overlap(this.player, this.porta13, () => {
    //         this.cameras.main.fadeOut(200)
    //         this.player.x = 996.9
    //         this.player.y = 3322.77
    //         this.cameras.main.once('camerafadeoutcomplete', (camera) => {
    //             camera.fadeIn(200)
    //         })
    //     })
    }

    update () {

        // debug colisão
        //this.layerColisao.renderDebug(this.add.graphics(), {
        //tileColor: null,
          //collidingTileColor: new Phaser.Display.Color(255, 0, 0, 100)
        //})


        // debug posição do personagem
        // console.log(this.player.x, this.player.y)
    if (!this.soundManager) return 
    if (Phaser.Input.Keyboard.JustDown(this.teclaEsc)) {
        this.scene.pause()
        this.scene.launch('MenuPausa')
        this.soundManager.tocarMusica()  // minúsculo
    } else {
        this.soundManager.pararMusica()  // minúsculo
    }





        const correndo = this.shift.isDown

        const velocidade = correndo ? 250 : 150

        let vx = 0
        let vy = 0

        if (this.cursors.left.isDown || this.wasd.left.isDown) {
            vx = -velocidade
            this.direcao = 'esquerda'
        } else if (this.cursors.right.isDown || this.wasd.right.isDown) {
            vx = velocidade
            this.direcao = 'direita'
        } else if (this.cursors.up.isDown || this.wasd.up.isDown) {
            vy = -velocidade
            this.direcao = 'cima'
        } else if (this.cursors.down.isDown || this.wasd.down.isDown) {
            vy = velocidade
            this.direcao = 'baixo'
        }

        this.player.setVelocity(vx, vy)


         if (vx !== 0 || vy !== 0) {
            const prefixo = correndo ? 'correr' : 'andar'
            this.player.anims.play(prefixo + '-' + this.direcao, true)
             this.soundManager.tocarPasso(correndo) 
             } else {
             this.player.anims.play('idle-' + this.direcao, true)
             this.soundManager.pararPassos()
         }
    }
}
