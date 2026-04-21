export default class Abertura extends Phaser.Scene {
  
    constructor () {
    super('abertura')
  }

  preload () {
    this.load.setBaseURL('public/assets/')
    this.load.image('fundo', 'tilemaps/imagem_museu_teste.jpg')
  } 

  create () {
    const { width, height } = this.scale

    const fundo = this.add.image(width / 2, height / 2, 'fundo')

    const scaleX = width / fundo.width
    const scaleY = height / fundo.height

    const scale = Math.max(scaleX, scaleY)

    fundo.setScale(scale)
    .setInteractive()
    .on('pointerdown', () => {
      navigator.mediaDevices.getUserMedia({ video: false, audio: true })
        .then((stream) => {
          globalThis.game.midias = stream
        })
        .catch((error) => console.error(error))
    })
  }

  update () {
  }
}