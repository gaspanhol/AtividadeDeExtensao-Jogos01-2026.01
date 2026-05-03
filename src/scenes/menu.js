export default class Menu extends Phaser.Scene {
  
  constructor () {
    super('Menu')
  }

  preload () {
    this.load.setBaseURL('public/assets/')
    this.load.image('fundoMenu', 'telas/tela_menu.png')
    this.load.image('botaoJogar', 'botoes/botao_jogar_menu.png')
    this.load.image('botaoConfiguracoes', 'botoes/botao_configuracoes_menu.png')
    this.load.image('botaoExtras', 'botoes/botao_extras_menu.png')
  } 

  create () {
    const { width, height } = this.scale

    // Fundo
    const fundoMenu = this.add.image(width / 2, height / 2, 'fundoMenu')

    const scaleX = width / fundoMenu.width
    const scaleY = height / fundoMenu.height
    fundoMenu.setScale(Math.max(scaleX, scaleY))

    // ESCALA DOS BOTÕES
    const escalaBotao = 0.5

    // JOGAR (mais em cima)
    const botaoJogar = this.add.image(width / 2, 250, 'botaoJogar')
    botaoJogar.setScale(escalaBotao)
    botaoJogar.setInteractive()

    botaoJogar.on('pointerdown', () => {
      this.scene.start('Jogo')
    })

    // CONFIGURAÇÕES
    const botaoConfiguracoes = this.add.image(width / 2, 380, 'botaoConfiguracoes')
    botaoConfiguracoes.setScale(escalaBotao)

    // EXTRAS
    const botaoExtras = this.add.image(width / 2, 510, 'botaoExtras')
    botaoExtras.setScale(escalaBotao)
  }
}