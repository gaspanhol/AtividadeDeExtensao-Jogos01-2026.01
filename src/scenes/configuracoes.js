export default class Configuracao extends Phaser.Scene {
  
  constructor () {
    super('Configuracao')
  }
 
  preload () {
    this.load.setBaseURL('public/assets/')
    this.load.image('fundoMenu', 'telas/Tela_Menu.png')
    this.load.image('fundoConfiguracao', 'telas/menu/menuConfiguracoes.png')
    this.load.image('botaoVoltarMenu', 'telas/menu/voltar.png')
  }
 
  create () {
    const { width, height } = this.scale
 
    // Fundo do menu (atrás do painel)
    const fundoMenu = this.add.image(width / 2, height / 2, 'fundoMenu')
    fundoMenu.setScale(Math.max(width / fundoMenu.width, height / fundoMenu.height))
 
    // Painel de configurações (por cima do fundo)
    const fundoConfiguracao = this.add.image(width / 2, height / 2, 'fundoConfiguracao')
 
    const scaleX = width / fundoConfiguracao.width
    const scaleY = height / fundoConfiguracao.height
    fundoConfiguracao.setScale(Math.min(scaleX, scaleY))
 
    // ESCALA DO BOTÃO
    const escalaBotao = 0.5
 
    // ..:: BOTÃO VOLTAR AO MENU ::..
    const botaoVoltarMenu = this.add.image(width / 2, height - 110, 'botaoVoltarMenu')
    botaoVoltarMenu.setScale(escalaBotao)
    botaoVoltarMenu.setInteractive()
 
    // Aumentar escala quando o mouse está sobre o botão
    botaoVoltarMenu.on('pointerover', () => {
      this.tweens.add({
        targets: botaoVoltarMenu,
        scale: escalaBotao * 1.1,
        duration: 100
      })
      botaoVoltarMenu.setTint(0xE6B967)
    })
 
    // Voltar escala ao padrão quando o mouse não está sobre o botão
    botaoVoltarMenu.on('pointerout', () => {
      this.tweens.add({
        targets: botaoVoltarMenu,
        scale: escalaBotao,
        duration: 100
      })
      botaoVoltarMenu.clearTint()
    })
 
    // Voltar para o Menu ao clicar
    botaoVoltarMenu.on('pointerdown', () => {
      this.scene.start('Menu')
    })
  }
 
  update () {
  }
}
