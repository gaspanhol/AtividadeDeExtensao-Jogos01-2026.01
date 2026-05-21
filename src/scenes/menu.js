import SoundManager from './SoundManager.js'

export default class Menu extends Phaser.Scene {

  constructor () {
    super('Menu')
  }

  preload () {
    this.load.setBaseURL('public/assets/')
    this.load.image('fundoMenu', 'telas/Tela_Menu.png')
    this.load.image('botaoJogar', 'botoes/Botao_Jogar_menu.png')
    this.load.image('botaoConfiguracoes', 'botoes/Botao_configuracoes_menu.png')
    this.load.image('botaoExtras', 'botoes/Botao_extras_menu.png')
    const sonsParaCarregar = [
      { key: 'abertura', path: 'sons/abertura.mp3'}]
    sonsParaCarregar.forEach(({ key, path }) => {
      this.load.audio(key, path)})
      this.load.on('loaderror', (file) => {
        console.warn(`Arquivo não encontrado, ignorando: ${file.key}`)})
  }

  create () {
    const { width, height } = this.scale
    this.SoundManager = new SoundManager(this)
    this.SoundManager.create()

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
      this.SoundManager.tocarAbertura('abertura')
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