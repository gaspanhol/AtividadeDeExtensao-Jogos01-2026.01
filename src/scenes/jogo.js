import MenuPausa from './MenuPausa.js'
import SoundManager from './SoundManager.js'

export default class Jogo extends Phaser.Scene {
    constructor() {
        super('Jogo')
    }

    preload() {
        this.load.tilemapTiledJSON('mapa', 'public/assets/mapa/mapa.json')

        // Carregando os sprites dos personagens
        this.load.spritesheet('player', 'public/assets/personagens/player.png', { frameWidth: 48, frameHeight: 50 })
        this.load.spritesheet('enemy1', 'public/assets/personagens/enemy1.png', { frameWidth: 48, frameHeight: 50 })
        this.load.spritesheet('enemy2', 'public/assets/personagens/enemy2.png', { frameWidth: 48, frameHeight: 50 })
        this.load.spritesheet('enemy3', 'public/assets/personagens/enemy3.png', { frameWidth: 48, frameHeight: 50 })
        this.load.spritesheet('npc', 'public/assets/personagens/npc.png', { frameWidth: 48, frameHeight: 50 })

        // Carregando os sprites do mapa
        this.load.image('casinhaDeEstoque', 'public/assets/mapa/casinhaDeEstoque.png')
        this.load.image('engenho', 'public/assets/mapa/engenho.png')
        this.load.image('iconeConversa', 'public/assets/botoes/iconeConversa.png')
        this.load.spritesheet('GardenTerrain', 'public/assets/mapa/GardenTerrain.png', { frameWidth: 32, frameHeight: 32 })
        this.load.spritesheet('GardenWalls', 'public/assets/mapa/GardenWalls.png', { frameWidth: 32, frameHeight: 32 })
        this.load.spritesheet('mansao', 'public/assets/mapa/mansao.png', { frameWidth: 32, frameHeight: 32 })
        this.load.spritesheet('Graveyard', 'public/assets/mapa/Graveyard.png', { frameWidth: 32, frameHeight: 32 })
        this.load.spritesheet('escadaPrincipal', 'public/assets/mapa/escadaPrincipal.png', { frameWidth: 175, frameHeight: 125 })
        this.load.spritesheet('objetos', 'public/assets/mapa/objetos.png', { frameWidth: 32, frameHeight: 32 })
        this.load.spritesheet('objetosinv', 'public/assets/mapa/objetosinv.png', { frameWidth: 32, frameHeight: 32 })
        this.load.spritesheet('mesasCadeiras', 'public/assets/mapa/mesasCadeiras.png', { frameWidth: 32, frameHeight: 32 })
        this.load.spritesheet('colunaV', 'public/assets/mapa/colunaV.png', { frameWidth: 6, frameHeight: 32 })
        this.load.spritesheet('colunaH', 'public/assets/mapa/colunaH.png', { frameWidth: 32, frameHeight: 6 })
        this.load.spritesheet('portas', 'public/assets/mapa/portas.png', { frameWidth: 96, frameHeight: 70 })
        this.load.spritesheet('vazio128x128', 'public/assets/mapa/vazio_128x128.png', { frameWidth: 32, frameHeight: 32 })
        this.load.spritesheet('enfeites', 'public/assets/mapa/enfeites.png', { frameWidth: 32, frameHeight: 32 })
        this.load.spritesheet('enfeitesPequenos', 'public/assets/mapa/enfeitesPequenos.png', { frameWidth: 16, frameHeight: 16 })
        this.load.spritesheet('maquinaFilmagem', 'public/assets/mapa/maquinaFilmagem.png', { frameWidth: 32, frameHeight: 32 })
        this.load.spritesheet('tapeteEDecoracoes', 'public/assets/mapa/tapeteEDecoracoes.png', { frameWidth: 32, frameHeight: 32 })
        this.load.spritesheet('cadeiraDentista', 'public/assets/mapa/cadeiraDentista.png', { frameWidth: 64, frameHeight: 64 })
        this.load.spritesheet('armas', 'public/assets/mapa/armas.png', { frameWidth: 32, frameHeight: 32 })
        this.load.spritesheet('carruagem', 'public/assets/mapa/carruagem.png', { frameWidth: 190, frameHeight: 80 })
        this.load.spritesheet('banheiro', 'public/assets/mapa/banheiro.png', { frameWidth: 32, frameHeight: 32 })
        this.load.spritesheet('canoa', 'public/assets/mapa/canoa.png', { frameWidth: 128, frameHeight: 128 })
        this.load.spritesheet('acessoriosIndigenas', 'public/assets/mapa/acessoriosIndigenas.png', { frameWidth: 32, frameHeight: 32 })
        this.load.spritesheet('cozinha', 'public/assets/mapa/cozinha.png', { frameWidth: 32, frameHeight: 32 })
        this.load.spritesheet('pedestalCatolico', 'public/assets/mapa/pedestalCatolico.png', { frameWidth: 128, frameHeight: 128 })
        this.load.spritesheet('quadros', 'public/assets/mapa/quadros.png', { frameWidth: 64, frameHeight: 64 })
        this.load.spritesheet('roupaPadre', 'public/assets/mapa/roupaPadre.png', { frameWidth: 128, frameHeight: 128 })
        this.load.spritesheet('roupasFestivas', 'public/assets/mapa/roupasFestivas.png', { frameWidth: 128, frameHeight: 128 })
        this.load.spritesheet('roupasFestivasInv', 'public/assets/mapa/roupasFestivasInv.png', { frameWidth: 128, frameHeight: 128 })
        this.load.spritesheet('arvoresGrandes', 'public/assets/mapa/arvoresGrandes.png', { frameWidth: 256, frameHeight: 256 })
        this.load.spritesheet('caixasMobilias', 'public/assets/mapa/caixasMobilias.png', { frameWidth: 32, frameHeight: 32 })
        this.load.spritesheet('cozinhaModificada', 'public/assets/mapa/cozinhaModificada.png', { frameWidth: 32, frameHeight: 32 })
        this.load.spritesheet('jardimFundos', 'public/assets/mapa/jardimFundos.png', { frameWidth: 32, frameHeight: 32 })
        this.load.spritesheet('pilares', 'public/assets/mapa/pilares.png', { frameWidth: 64, frameHeight: 64 })
        this.load.spritesheet('cranioDeOnca', 'public/assets/itens/cranioDeOnca.png', { frameWidth: 64, frameHeight: 64 })
        this.load.spritesheet('espadaDomPedro', 'public/assets/itens/espadaDomPedro.png', { frameWidth: 64, frameHeight: 64 })
        this.load.spritesheet('maquinaDeEscrever', 'public/assets/itens/maquinaDeEscrever.png', { frameWidth: 64, frameHeight: 64 })
        this.load.spritesheet('mascaraTribal', 'public/assets/itens/mascaraTribal.png', { frameWidth: 64, frameHeight: 64 })
        this.load.spritesheet('relicarioDourado', 'public/assets/itens/relicarioDourado.png', { frameWidth: 64, frameHeight: 64 })

        // ..:: Carregando os sons do jogo ::..
        const sonsParaCarregar = [
            { key: 'passo', path: 'public/assets/sons/passo.mp3' },
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

    create() {
        const mapa = this.make.tilemap({ key: 'mapa' })

        // ..:: Mapeamento de teclas do teclado para as interações ::..
        this.cursors = this.input.keyboard.createCursorKeys()

        this.shift = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT) //botão shift

        this.wasd = this.input.keyboard.addKeys({    //movimentação no WASD
            up: Phaser.Input.Keyboard.KeyCodes.W,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            right: Phaser.Input.Keyboard.KeyCodes.D
        })
        this.teclaEsc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC)
        this.teclaE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E)


        // ..:: Criação de constantes para os tileset dos elementos do mapa ::..
        const tilesetChao = mapa.addTilesetImage('mansao', 'mansao')
        const tilesetObjetos = mapa.addTilesetImage('objetos', 'objetos')
        const tilesetObjetosInv = mapa.addTilesetImage('objetosinv', 'objetosinv')
        const tilesetGraveyard = mapa.addTilesetImage('Graveyard', 'Graveyard')
        const tilesetGardenWalls = mapa.addTilesetImage('GardenWalls', 'GardenWalls')
        const tilesetGardenTerrain = mapa.addTilesetImage('GardenTerrain', 'GardenTerrain')
        const tilesetColunaV = mapa.addTilesetImage('colunaV', 'colunaV')
        const tilesetColunaH = mapa.addTilesetImage('colunaH', 'colunaH')
        const tilesetPortas = mapa.addTilesetImage('portas', 'portas')
        const tilesetEscada = mapa.addTilesetImage('escadaPrincipal', 'escadaPrincipal')
        const tilesetMesasCadeiras = mapa.addTilesetImage('mesasCadeiras', 'mesasCadeiras')
        const tilesetEnfeites = mapa.addTilesetImage('enfeites', 'enfeites')
        const tilesetEnfeitesPequenos = mapa.addTilesetImage('enfeitesPequenos', 'enfeitesPequenos')
        const tilesetMaquinaFilmagem = mapa.addTilesetImage('maquinaFilmagem', 'maquinaFilmagem')
        const tilesetTapeteEDecoracoes = mapa.addTilesetImage('tapeteEDecoracoes', 'tapeteEDecoracoes')
        const tilesetCadeiraDentista = mapa.addTilesetImage('cadeiraDentista', 'cadeiraDentista')
        const tilesetArmas = mapa.addTilesetImage('armas', 'armas')
        const tilesetBanheiro = mapa.addTilesetImage('banheiro', 'banheiro')
        const tilesetCarruagem = mapa.addTilesetImage('carruagem', 'carruagem')
        const tilesetCanoa = mapa.addTilesetImage('canoa', 'canoa')
        const tilesetAcessoriosIndigenas = mapa.addTilesetImage('acessoriosIndigenas', 'acessoriosIndigenas')
        const tilesetCozinha = mapa.addTilesetImage('cozinha', 'cozinha')
        const tilesetPedestal = mapa.addTilesetImage('pedestalCatolico', 'pedestalCatolico')
        const tilesetQuadros = mapa.addTilesetImage('quadros', 'quadros')
        const tilesetRoupaPadre = mapa.addTilesetImage('roupaPadre', 'roupaPadre')
        const tilesetRoupasFestivas = mapa.addTilesetImage('roupasFestivas', 'roupasFestivas')
        const tilesetRoupasFestivasInv = mapa.addTilesetImage('roupasFestivasInv', 'roupasFestivasInv')
        const tilesetArvoresGrandes = mapa.addTilesetImage('arvoresGrandes', 'arvoresGrandes')
        const tilesetCaixasMobilias = mapa.addTilesetImage('caixasMobilias', 'caixasMobilias')
        const tilesetCasinhaDeEstoque = mapa.addTilesetImage('casinhaDeEstoque', 'casinhaDeEstoque')
        const tilesetCozinhaModificada = mapa.addTilesetImage('cozinhaModificada', 'cozinhaModificada')
        const tilesetEngenho = mapa.addTilesetImage('engenho', 'engenho')
        const tilesetJardimFundos = mapa.addTilesetImage('jardimFundos', 'jardimFundos')
        const tilesetPilares = mapa.addTilesetImage('pilares', 'pilares')

        // ..:: Verificação de carregamento dos sprites ::..
        if (
            !tilesetChao ||
            !tilesetObjetos ||
            !tilesetObjetosInv ||
            !tilesetGraveyard ||
            !tilesetGardenWalls ||
            !tilesetGardenTerrain ||
            !tilesetMesasCadeiras ||
            !tilesetEscada ||
            !tilesetColunaV ||
            !tilesetColunaH ||
            !tilesetPortas ||
            !tilesetEnfeites ||
            !tilesetEnfeitesPequenos ||
            !tilesetMaquinaFilmagem ||
            !tilesetTapeteEDecoracoes ||
            !tilesetCadeiraDentista ||
            !tilesetArmas ||
            !tilesetBanheiro ||
            !tilesetCanoa ||
            !tilesetAcessoriosIndigenas ||
            !tilesetCozinha ||
            !tilesetPedestal ||
            !tilesetQuadros ||
            !tilesetRoupaPadre ||
            !tilesetRoupasFestivas ||
            !tilesetRoupasFestivasInv ||
            !tilesetArvoresGrandes ||
            !tilesetCaixasMobilias ||
            !tilesetCasinhaDeEstoque ||
            !tilesetCozinhaModificada ||
            !tilesetEngenho ||
            !tilesetJardimFundos ||
            !tilesetPilares
        ) {
            console.error('Erro ao carregar algum tileset')
        }

        // ..:: criação das layers e das colisões ::..
        const tilesets = [tilesetChao, tilesetObjetos, tilesetObjetosInv, tilesetGardenTerrain, tilesetGardenWalls, tilesetGraveyard, tilesetColunaV, tilesetColunaH, tilesetPortas, tilesetEscada, tilesetMesasCadeiras, tilesetEnfeites, tilesetEnfeitesPequenos, tilesetMaquinaFilmagem, tilesetTapeteEDecoracoes, tilesetCadeiraDentista, tilesetArmas, tilesetBanheiro, tilesetCarruagem, tilesetCanoa, tilesetAcessoriosIndigenas, tilesetCozinha, tilesetPedestal, tilesetQuadros, tilesetRoupaPadre, tilesetRoupasFestivas, tilesetRoupasFestivasInv, tilesetArvoresGrandes, tilesetCaixasMobilias, tilesetCasinhaDeEstoque, tilesetCozinhaModificada, tilesetEngenho, tilesetJardimFundos, tilesetPilares]

        mapa.createLayer('chao', tilesets, 0, 0)
        mapa.createLayer('parede', tilesets, 0, 0)
        this.layerColisao = mapa.createLayer('colisao', tilesets, 0, 0)

        const layers = ['1', '2', '3']

        const tilesetsMap = mapa.tilesets

        const FLIP_X = 0x80000000
        const FLIP_Y = 0x40000000

        this.colunasColisao = this.physics.add.staticGroup()

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

                const sprite = this.add.image(
                    obj.x,
                    obj.y,
                    tileset.name,
                    frame
                ).setOrigin(0, 1)

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

                // ..:: COLISÃO DAS COLUNAS ::..
                if (tileset.name === 'colunaV') {

                    sprite.setVisible(false)

                    const largura = 6
                    const altura = 32

                    const cx = obj.x + largura / 2
                    const cy = obj.y - altura / 2

                    const colisor = this.add.rectangle(cx, cy, largura, altura)

                    // deixe true para testar
                    // colisor.visible = false
                    colisor.setAlpha(0.5)

                    this.physics.add.existing(colisor, true)

                    this.colunasColisao.add(colisor)
                }
                if (tileset.name === 'colunaH') {

                    sprite.setVisible(false)

                    const largura = 32
                    const altura = 6

                    const cx = obj.x + largura / 2
                    const cy = obj.y - altura / 2

                    const colisor = this.add.rectangle(cx, cy, largura, altura)

                    // deixe true para testar
                    // colisor.visible = false
                    colisor.setAlpha(0.5)

                    this.physics.add.existing(colisor, true)

                    this.colunasColisao.add(colisor)
                }
            })
        })

        this.layerColisao.setCollisionByExclusion([-1])

        // ..:: Configuração do player ::..
        this.player = this.physics.add.sprite(784.5, 3246.1, 'player')
        window.player = this.player //Comando para ver a localização do player no jogo, usando o comando console.log(player.x, player.y)
        this.direcao = 'esquerda'
        this.physics.add.collider(this.player, this.layerColisao)
        this.physics.add.collider(this.player, this.colunasColisao)
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
                correr: [75, 81],
                pegarItem: [37, 42]
            },
            {
                nome: 'esquerda',
                idle: [68, 69],
                andar: [10, 17],
                correr: [82, 88],
                pegarItem: [43, 48]
            },
            {
                nome: 'baixo',
                idle: [70, 71],
                andar: [19, 26],
                correr: [91, 97],
                pegarItem: [49, 54]
            },
            {
                nome: 'direita',
                idle: [72, 73],
                andar: [28, 35],
                correr: [98, 105],
                pegarItem: [55, 60]
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

        // ..:: Configuração NPC ::..

        this.npc = this.physics.add.sprite(675, 3244.5, 'npc')

        this.physics.add.collider(this.npc, this.player)

        this.npc.setPushable(false)
        this.npc.setImmovable(true)

        // Levantando
        this.anims.create({
            key: 'npc-levantando',
            frames: this.anims.generateFrameNumbers('npc', {
                start: 0,
                end: 5
            }),
            frameRate: 3,
            repeat: 0
        })

        // Virando para direita (idle)
        this.anims.create({
            key: 'npc-virandoDireita',
            frames: this.anims.generateFrameNumbers('npc', {
                start: 6,
                end: 8
            }),
            frameRate: 2,
            repeat: -1
        })

        // Agradecendo
        this.anims.create({
            key: 'npc-agradecendo',
            frames: this.anims.generateFrameNumbers('npc', {
                start: 9,
                end: 12
            }),
            frameRate: 2,
            repeat: 0
        })

        this.npc.play('npc-levantando')
        this.npc.on('animationcomplete-npc-levantando', () => {
            this.npc.play('npc-virandoDireita')
        })

        // Balão de fala do NPC
        this.iconeConversa = this.add.image(
            this.npc.x,
            this.npc.y - 40,
            'iconeConversa'
        )

        this.iconeConversa.setScale(0.5)
        this.iconeConversa.setVisible(false)

        this.physics.add.overlap(
            this.player,
            this.npc,
            () => {
                this.iconeConversa.setVisible(true)
            },
            null,
            this
        )

        // Interação com o NPC
        this.npc.on('animationcomplete-npc-agradecendo', () => {
            this.npc.play('npc-virandoDireita')
        })

        // ..:: Configurações dos Inimigos ::..

        const tiposEnemy = ['enemy1', 'enemy2', 'enemy3']

        const animacoesEnemy = [
            {
                nome: 'cima',
                idle: [0, 1],
                andar: [8, 16],
                correr: [44, 51]
            },
            {
                nome: 'esquerda',
                idle: [2, 3],
                andar: [17, 25],
                correr: [52, 59]
            },
            {
                nome: 'baixo',
                idle: [4, 5],
                andar: [26, 34],
                correr: [60, 67]
            },
            {
                nome: 'direita',
                idle: [6, 7],
                andar: [35, 43],
                correr: [68, 75]
            }
        ]

        // Animações dos inimigos
        tiposEnemy.forEach(tipo => {

            animacoesEnemy.forEach(anim => {

                this.anims.create({
                    key: `${tipo}-idle-${anim.nome}`,
                    frames: this.anims.generateFrameNumbers(tipo, {
                        start: anim.idle[0],
                        end: anim.idle[1]
                    }),
                    frameRate: 2,
                    repeat: -1
                })

                this.anims.create({
                    key: `${tipo}-andar-${anim.nome}`,
                    frames: this.anims.generateFrameNumbers(tipo, {
                        start: anim.andar[0],
                        end: anim.andar[1]
                    }),
                    frameRate: 8,
                    repeat: -1
                })

                this.anims.create({
                    key: `${tipo}-correr-${anim.nome}`,
                    frames: this.anims.generateFrameNumbers(tipo, {
                        start: anim.correr[0],
                        end: anim.correr[1]
                    }),
                    frameRate: 12,
                    repeat: -1
                })

            })

        })

        // Fase 1
        const configInimigos = [

            {
                tipo: 'enemy1',
                pontos: [
                    { x: 618.2, y: 2755.8 },
                    { x: 988.2, y: 2755.8 }
                ]
            },

            {
                tipo: 'enemy1',
                pontos: [
                    { x: 563.2, y: 2755.8 },
                    { x: 205.5, y: 2755.8 }
                ]
            },

            {
                tipo: 'enemy1',
                pontos: [
                    { x: 383, y: 2657 },
                    { x: 203, y: 2657 },
                    { x: 203, y: 2484.5 },
                    { x: 383, y: 2484.5 }
                ]
            },

            {
                tipo: 'enemy1',
                pontos: [
                    { x: 834.1, y: 2662 },
                    { x: 529.1, y: 2662 },
                    { x: 529.1, y: 2527 },
                    { x: 834.1, y: 2527 }
                ]
            },

            {
                tipo: 'enemy1',
                pontos: [
                    { x: 944.1, y: 2502 },
                    { x: 944.1, y: 2769.5 }
                ]
            }

        ]

        this.inimigos = []

        configInimigos.forEach(config => {

            const inimigo = this.physics.add.sprite(
                config.pontos[0].x,
                config.pontos[0].y,
                config.tipo
            )

            inimigo.tipo = config.tipo
            inimigo.velocidade = 100
            inimigo.modoMovimento = 'andar'

            inimigo.pontos = config.pontos
            inimigo.pontoAtual = 1

            inimigo.setDepth(2)

            this.physics.add.collider(inimigo, this.layerColisao)
            this.physics.add.collider(inimigo, this.colunasColisao)
            this.physics.add.collider(inimigo, this.player)

            this.inimigos.push(inimigo)

        })

        // ..:: Configuração dos itens ::..

        // gerando os sprites dos itens no mapa
        this.cranioDeOnca = this.physics.add.sprite(1018.9, 2012.4, 'cranioDeOnca')
        this.espadaDomPedro = this.physics.add.sprite(945.3, 496.2, 'espadaDomPedro')
        this.maquinaDeEscrever = this.physics.add.sprite(244.2, 2536.5, 'maquinaDeEscrever')
        this.mascaraTribal = this.physics.add.sprite(1888.6, 2570.8, 'mascaraTribal')
        this.relicarioDourado = this.physics.add.sprite(2700.3, 1464.8, 'relicarioDourado')

        // Fazendo a colisão dos itens com o player
        this.physics.add.collider(this.cranioDeOnca, this.player)
        this.physics.add.collider(this.espadaDomPedro, this.player)
        this.physics.add.collider(this.maquinaDeEscrever, this.player)
        this.physics.add.collider(this.mascaraTribal, this.player)
        this.physics.add.collider(this.relicarioDourado, this.player)

        // Deixando os itens imóveis
        this.npc.setPushable(false)
        this.npc.setImmovable(true)

        this.cranioDeOnca.setPushable(false)
        this.cranioDeOnca.setImmovable(true)

        this.espadaDomPedro.setPushable(false)
        this.espadaDomPedro.setImmovable(true)

        this.maquinaDeEscrever.setPushable(false)
        this.maquinaDeEscrever.setImmovable(true)

        this.mascaraTribal.setPushable(false)
        this.mascaraTribal.setImmovable(true)

        this.relicarioDourado.setPushable(false)
        this.relicarioDourado.setImmovable(true)

        // animação cranio
        this.anims.create({
            key: 'cranio-brilhando',
            frames: this.anims.generateFrameNumbers('cranioDeOnca', {
                start: 1,
                end: 14
            }),
            frameRate: 2,
            repeat: -1
        })

        // animação espada
        this.anims.create({
            key: 'espada-brilhando',
            frames: this.anims.generateFrameNumbers('espadaDomPedro', {
                start: 1,
                end: 3
            }),
            frameRate: 2,
            repeat: -1
        })

        // animação maquina de escrever
        this.anims.create({
            key: 'maquina-brilhando',
            frames: this.anims.generateFrameNumbers('maquinaDeEscrever', {
                start: 2,
                end: 15
            }),
            frameRate: 2,
            repeat: -1
        })

        // animação mascara
        this.anims.create({
            key: 'mascara-brilhando',
            frames: this.anims.generateFrameNumbers('mascaraTribal', {
                start: 1,
                end: 13
            }),
            frameRate: 2,
            repeat: -1
        })

        // animação relicário
        this.anims.create({
            key: 'relicario-brilhando',
            frames: this.anims.generateFrameNumbers('relicarioDourado', {
                start: 1,
                end: 15
            }),
            frameRate: 2,
            repeat: -1
        })

        // Corrigindo escala dos itens e iniciando animação
        this.cranioDeOnca.setScale(0.5)
        this.cranioDeOnca.play('cranio-brilhando')

        this.espadaDomPedro.setScale(0.8)
        this.espadaDomPedro.play('espada-brilhando')
        this.espadaDomPedro.setDepth(4)

        this.maquinaDeEscrever.setScale(0.5)
        this.maquinaDeEscrever.play('maquina-brilhando')

        this.mascaraTribal.setScale(0.5)
        this.mascaraTribal.play('mascara-brilhando')

        this.relicarioDourado.setScale(0.8)
        this.relicarioDourado.play('relicario-brilhando')


        // Sons
        this.soundManager = new SoundManager(this)
        this.soundManager.create()

        // ..:: PORTAS ::..

        const configPortas = [
            // ..:: cenário Lobby ::..
            { x: 319.5, y: 3071.1, destX: 319.5, destY: 2818.6 }, //porta 1
            { x: 592, y: 3071.1, destX: 592, destY: 2818.6 }, // porta 2
            { x: 862.83, y: 3071.1, destX: 862.83, destY: 2818.6 }, // porta 3
            { x: 1040.5, y: 3166.9, destX: 1822.5, destY: 3196.9 }, // porta 4
            { x: 1040.5, y: 3328.77, destX: 1825, destY: 3360.8 }, // porta 5

            // ..:: cenário fase 1 ::..
            { x: 319.5, y: 2864.6, destX: 319.5, destY: 3128.6 }, // porta 1
            { x: 592, y: 2864.6, destX: 592, destY: 3128.6 }, // porta 2
            { x: 864.5, y: 2864.6, destX: 864.5, destY: 3128.6 }, // porta 3
            { x: 319.5, y: 2426.9, destX: 319.5, destY: 2181.9 }, // porta 4
            { x: 592, y: 2426.9, destX: 592, destY: 2181.9 }, // porta 5
            { x: 864.5, y: 2426.9, destX: 864.5, destY: 2181.9 }, // porta 6

            // ..:: cenário fase 2 ::..
            { x: 1773.5, y: 3200, destX: 990, destY: 3166.9 }, // porta 1
            { x: 1773.5, y: 3360.8, destX: 995, destY: 3328.77 }, // porta 2
            { x: 2096.6, y: 2458.5, destX: 1330, destY: 2175.8 }, // porta 3

            // ..:: cenário fase 3 ::..
            { x: 319.16, y: 2225, destX: 319.16, destY: 2480 }, // porta 1
            { x: 593, y: 2225, destX: 593, destY: 2480 }, // porta 2
            { x: 863.5, y: 2225, destX: 863.5, destY: 2480 }, // porta 3
            { x: 1328.6, y: 2225, destX: 2097.6, destY: 2507.5 }, // porta 4
            { x: 513.60, y: 1940, destX: 512.8, destY: 1598.3 }, // porta 5

            // ..:: cenário fase 4 ::..
            { x: 512.8, y: 1655.8, destX: 511.6, destY: 1995.2 }, // porta 1
            { x: 1010.3, y: 1651.6, destX: 2450.3, destY: 527.5 }, // porta 2

            // ..:: cenário fase 5 ::..
            { x: 2449.4, y: 473, destX: 1012.5, destY: 1602.5 }, // porta 1

        ]

        this.portas = configPortas.map(({ x, y, destX, destY }) => {
            const sprite = this.physics.add.sprite(x, y, 'vazio128x128')

            this.physics.add.overlap(this.player, sprite, () => {
                this.cameras.main.fadeOut(200)
                this.player.x = destX
                this.player.y = destY
                this.cameras.main.once('camerafadeoutcomplete', (camera) => {
                    camera.fadeIn(200)
                })
            })

            return sprite
        })
    }

    update() {

        // debug colisão
        //this.layerColisao.renderDebug(this.add.graphics(), {
        //tileColor: null,
        //collidingTileColor: new Phaser.Display.Color(255, 0, 0, 100)
        //})


        // debug posição do personagem
        // console.log(this.player.x, this.player.y)
        if (!this.soundManager) return
        if (Phaser.Input.Keyboard.JustDown(this.teclaEsc)) {
            this.soundManager.tocarMusica()
            this.scene.pause()
            this.scene.launch('MenuPausa')
        } else {
            this.soundManager.pararMusica()
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

        // Balão de conversa do NPC:
        this.iconeConversa.setPosition(
            this.npc.x,
            this.npc.y - 40
        )

        const distancia = Phaser.Math.Distance.Between(
            this.player.x,
            this.player.y,
            this.npc.x,
            this.npc.y
        )

        const pertoDoNpc = distancia < 50
        const jogadorADireitaDoNpc = this.player.x > this.npc.x

        this.iconeConversa.setVisible(
            pertoDoNpc &&
            jogadorADireitaDoNpc
        )

        const podeConversar = this.iconeConversa.visible

        if (
            podeConversar &&
            Phaser.Input.Keyboard.JustDown(this.teclaE) &&
            this.npc.anims.currentAnim.key !== 'npc-agradecendo'
        ) {
            this.npc.play('npc-agradecendo')
        }

        // ..:: Movimentação dos inimigos ::..
        this.inimigos.forEach(inimigo => {

            const alvo = inimigo.pontos[inimigo.pontoAtual]

            const distancia = Phaser.Math.Distance.Between(
                inimigo.x,
                inimigo.y,
                alvo.x,
                alvo.y
            )

            if (distancia < 16) {

                inimigo.pontoAtual++

                if (inimigo.pontoAtual >= inimigo.pontos.length) {
                    inimigo.pontoAtual = 0
                }

            }

            const alvoAtual = inimigo.pontos[inimigo.pontoAtual]

            this.physics.moveTo(
                inimigo,
                alvoAtual.x,
                alvoAtual.y,
                inimigo.velocidade
            )

            const vx = inimigo.body.velocity.x
            const vy = inimigo.body.velocity.y

            let direcao

            if (Math.abs(vx) > Math.abs(vy)) {
                direcao = vx > 0 ? 'direita' : 'esquerda'
            } else {
                direcao = vy > 0 ? 'baixo' : 'cima'
            }

            inimigo.anims.play(
                `${inimigo.tipo}-${inimigo.modoMovimento}-${direcao}`,
                true
            )

        })

    }
}
