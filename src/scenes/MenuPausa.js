export default class MenuPausa extends Phaser.Scene {

  constructor() {
    super('MenuPausa')
  }



  create () {
    const { width, height } = this.scale

    this.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0.6)
      .setScrollFactor(0)

    const centroX = width / 2;
    const conjuntoMenu = this.add.container(width / 2, height / 2);
    const menu = this.add.image(centroX,360, 'menuPausa')
    menu.setScale(0.7);
    const reiniciar = this.add.image(centroX, 290, 'reiniciar')
    reiniciar.setScale(0.7)
    .setInteractive();
    const voltar =  this.add.image(width / 2.02, 400, 'voltar')
    voltar.setScale(0.7)
    .setInteractive();
    const volume = this.add.image(centroX+3, 500, 'volume') 
    volume.setScale(0.7)
    .setOrigin(0.5)
    .setScrollFactor(0);

    const botaoMenos = this.add.image(centroX - 180, 500, 'menos')
    .setScale(0.3)
    .setInteractive()

    const botaoMais = this.add.image(centroX + 180, 500, 'mais')
      .setScale(0.3)
      .setInteractive()




    const jogo = this.scene.get('Jogo');


    reiniciar.on('pointerover', () => {
        reiniciar.setTint(0xE6B967);
        this.tweens.add({
            targets: reiniciar,
            scale: 0.77,
            duration: 100
        });
    });
    reiniciar.on('pointerout', () => {
        reiniciar.clearTint();

        this.tweens.add({
            targets: reiniciar,
            scale: 0.7,
            duration: 100
        });
    });
    reiniciar.on('pointerdown', () => {
        this.scene.stop('Jogo');
        this.sound.stopAll();
        this.scene.start('Jogo');

    });




      voltar.on('pointerover', () => {
        voltar.setTint(0xE6B967);
        this.tweens.add({
          targets: voltar,
          scale: 0.77,
          duration: 100
      });
  });

      voltar.on('pointerout', () => {
          voltar.clearTint();

          this.tweens.add({
              targets: voltar,
              scale: 0.7,
              duration: 100
          });
      });

      voltar.on('pointerdown', () => {
          this.scene.resume('Jogo')
          this.scene.stop()
      });

      botaoMenos.on('pointerover', () => {
    botaoMenos.setTint(0xE6B967)

    this.tweens.add({
        targets: botaoMenos,
        scale: 0.35,
        duration: 100
    })
})

botaoMenos.on('pointerout', () => {
    botaoMenos.clearTint()

    this.tweens.add({
        targets: botaoMenos,
        scale: 0.3,
        duration: 100
    })
})
botaoMenos.on('pointerdown', () => {
    jogo.soundManager.diminuirVolume()
})

botaoMais.on('pointerover', () => {
    botaoMais.setTint(0xE6B967)

    this.tweens.add({
        targets: botaoMais,
        scale: 0.35,
        duration: 100
    })
})

botaoMais.on('pointerout', () => {
    botaoMais.clearTint()

    this.tweens.add({
        targets: botaoMais,
        scale: 0.3,
        duration: 100
    })
})
botaoMais.on('pointerdown', () => {
    jogo.soundManager.aumentarVolume()
})




    // ESC para voltar
    const sairMenu = this.input.keyboard.once('keydown-ESC', () => {
      this.scene.resume('Jogo')
      this.scene.stop()
    })
  }
}