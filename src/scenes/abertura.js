export default class Abertura extends Phaser.Scene {
  
    constructor () {
    super('abertura')
  }

  preload () {
    this.load.setBaseURL('public/assets/')
    this.load.image('fundo', 'tilemaps/imagem_museu_teste.jpg')
  } 

  create () {
    this.add.image(400, 300,'fundo')
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