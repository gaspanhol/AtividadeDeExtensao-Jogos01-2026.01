export default class MenuPausa extends Phaser.Scene {

  constructor() {
    super('MenuPausa')
  }

  create () {
    const { width, height } = this.scale

    this.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0.6)
      .setScrollFactor(0)

    // texto temporário só pra confirmar que está abrindo
    this.add.text(width / 2, height / 2, 'PAUSADO', {
      fontSize: '48px',
      fill: '#ffffff'
    }).setOrigin(0.5).setScrollFactor(0)

    // ESC para voltar
    this.input.keyboard.once('keydown-ESC', () => {
      this.scene.resume('Jogo')
      this.scene.stop()
    })
  }
}