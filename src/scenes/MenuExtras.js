export default class MenuExtras extends Phaser.Scene {

  constructor() {
    super('MenuExtras')
  }

  preload() {
    this.load.setBaseURL('')

    // Fundo reutilizado do menu
    this.load.image('fundoExtras', 'public/assets/telas/Tela_Menu.png')
    this.load.image('voltarExtras', 'public/assets/telas/menu/voltar.png')

    // Imagens OCULTAS (mostradas antes de revelar)
    this.load.image('oculto_cabeca',    'public/assets/itens/extras jogo/oculto/cabecaOculta.png')
    this.load.image('oculto_madeira',   'public/assets/itens/extras jogo/oculto/cabecaMaderiaOCulta.png')
    this.load.image('oculto_espada',    'public/assets/itens/extras jogo/oculto/espada-Oculta.png')
    this.load.image('oculto_maquina',   'public/assets/itens/extras jogo/oculto/MaquinaEscreverOculta.png')
    this.load.image('oculto_reliquario','public/assets/itens/extras jogo/oculto/reliquarioOculto.png')

    // Imagens REVELADAS (mostradas ao clicar)
    this.load.image('rev_cabeca',    'public/assets/itens/extras jogo/cabeca-removebg-preview.png')
    this.load.image('rev_madeira',   'public/assets/itens/extras jogo/cabecaMaderia-removebg-preview.png')
    this.load.image('rev_espada',    'public/assets/itens/extras jogo/espada-removebg-preview.png')
    this.load.image('rev_maquina',   'public/assets/itens/extras jogo/Maquina_escrever-removebg-preview.png')
    this.load.image('rev_reliquario','public/assets/itens/extras jogo/reliquario-removebg-preview.png')
  }

  create() {
    const { width, height } = this.scale

    // ── Fundo ──────────────────────────────────────────────────────────────
    const fundo = this.add.image(width / 2, height / 2, 'fundoExtras')
    const scaleX = width / fundo.width
    const scaleY = height / fundo.height
    fundo.setScale(Math.max(scaleX, scaleY))

    // ── Overlay escuro semi-transparente ───────────────────────────────────
    this.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0.55)

    // ── Título ─────────────────────────────────────────────────────────────
    this.add.text(width / 2, 55, 'EXTRAS', {
      fontFamily: 'Georgia, serif',
      fontSize: '42px',
      color: '#F5D78E',
      stroke: '#3B1A00',
      strokeThickness: 6,
      shadow: { offsetX: 2, offsetY: 2, color: '#000', blur: 4, fill: true }
    }).setOrigin(0.5)

    this.add.text(width / 2, 98, 'Clique nos itens para descobrir seus segredos', {
      fontFamily: 'Georgia, serif',
      fontSize: '17px',
      color: '#C9A96E',
      stroke: '#1a0a00',
      strokeThickness: 3
    }).setOrigin(0.5)

    // ── Dados dos itens ────────────────────────────────────────────────────
    const itens = [
      {
        oculto: 'oculto_cabeca',
        revelado: 'rev_cabeca',
        nome: 'Crânio Indígena',
        descricao: 'Cracio de onça.\nGuarda histórias de um\npovo esquecido.'
      },
      {
        oculto: 'oculto_madeira',
        revelado: 'rev_madeira',
        nome: 'Cabeça de Madeira',
        descricao: 'Escultura entalhada à mão\npor artesãos do século XIX.\nSímbolo de proteção\ne espiritualidade.'
      },
      {
        oculto: 'oculto_espada',
        revelado: 'rev_espada',
        nome: 'Espada Dom Pedro',
        descricao: 'Lâmina que pertenceu\nà Dom Pedro Segundo.\nTestemunha de batalhas\ne da independência.'
      },
      {
        oculto: 'oculto_maquina',
        revelado: 'rev_maquina',
        nome: 'Máquina de Escrever',
        descricao: 'Registrou os primeiros\njornais da cidade.\nEcoa as palavras de\njornalistas pioneiros.'
      },
      {
        oculto: 'oculto_reliquario',
        revelado: 'rev_reliquario',
        nome: 'Relicário Dourado',
        descricao: 'Objeto sagrado que abriga\nrelíquias de santos.\nObjeto de devoção e fé\nda população colonial.'
      }
    ]

    // ── Posicionamento dos 5 cards lado a lado ─────────────────────────────
    const cardW = 180
    const cardH = 220
    const espacamento = 30
    const totalW = itens.length * cardW + (itens.length - 1) * espacamento
    const startX = (width - totalW) / 2 + cardW / 2
    const cardY = 370

    // ── Estado de revelação ────────────────────────────────────────────────
    this.revelados = new Array(itens.length).fill(false)

    // Container do painel de detalhe (revelação em tela cheia)
    this.painelDetalhe = null

    itens.forEach((item, i) => {
      const x = startX + i * (cardW + espacamento)

      // Fundo do card (moldura dourada)
      const moldura = this.add.rectangle(x, cardY, cardW, cardH, 0x2a1200, 1)
        .setStrokeStyle(2, 0xC8973A)

      // Brilho de hover
      const brilho = this.add.rectangle(x, cardY, cardW, cardH, 0xF5D78E, 0)

      // Imagem oculta
      const imgOculta = this.add.image(x, cardY - 20, item.oculto)
      imgOculta.setDisplaySize(cardW - 20, cardH - 60)

      // Texto "???" abaixo da imagem oculta
      const textoOculto = this.add.text(x, cardY + 85, '???', {
        fontFamily: 'Georgia, serif',
        fontSize: '20px',
        color: '#C9A96E',
        stroke: '#1a0a00',
        strokeThickness: 3
      }).setOrigin(0.5)

      // Área interativa sobre o card inteiro
      const zona = this.add.zone(x, cardY, cardW, cardH).setInteractive()

      zona.on('pointerover', () => {
        if (this.revelados[i]) return
        this.tweens.add({ targets: moldura, fillAlpha: 0, strokeAlpha: 1, duration: 80 })
        brilho.setAlpha(0.06)
        imgOculta.setTint(0xFFE0A0)
        this.tweens.add({ targets: imgOculta, scaleX: imgOculta.scaleX * 1.04, scaleY: imgOculta.scaleY * 1.04, duration: 100 })
      })

      zona.on('pointerout', () => {
        if (this.revelados[i]) return
        brilho.setAlpha(0)
        imgOculta.clearTint()
        imgOculta.setDisplaySize(cardW - 20, cardH - 60)
      })

      zona.on('pointerdown', () => {
        if (this.painelDetalhe) return // já tem painel aberto
        this.abrirDetalhe(item, i, imgOculta, textoOculto, moldura)
      })
    })

    // ── Botão Voltar ───────────────────────────────────────────────────────
    const btnVoltar = this.add.image(110, height - 50, 'voltarExtras')
    btnVoltar.setScale(0.28).setInteractive()

    btnVoltar.on('pointerover', () => {
      btnVoltar.setTint(0xE6B967)
      this.tweens.add({ targets: btnVoltar, scale: 0.31, duration: 100 })
    })
    btnVoltar.on('pointerout', () => {
      btnVoltar.clearTint()
      this.tweens.add({ targets: btnVoltar, scale: 0.28, duration: 100 })
    })
    btnVoltar.on('pointerdown', () => {
      this.scene.start('Menu')
    })
  }

  // ── Abre o painel de detalhe com animação de crescimento ────────────────
  abrirDetalhe(item, indice, imgOcultaCard, textoOcultaCard, molduraCard) {
    const { width, height } = this.scale

    // Marca como revelado
    this.revelados[indice] = true

    // Escurece o card original visualmente
    imgOcultaCard.setAlpha(0.3)
    textoOcultaCard.setAlpha(0.3)

    // Overlay de fundo escuro clicável para fechar
    const overlay = this.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0)
    overlay.setInteractive()
    overlay.on('pointerdown', () => this.fecharDetalhe(overlay, painelContainer, item, indice, imgOcultaCard, textoOcultaCard))

    // Container central do painel
    const painelContainer = this.add.container(width / 2, height / 2)
    painelContainer.setScale(0.1)
    painelContainer.setAlpha(0)

    // Fundo do painel
    const painelBg = this.add.rectangle(0, 0, 620, 480, 0x1a0800, 1)
      .setStrokeStyle(3, 0xC8973A)
    painelContainer.add(painelBg)

    // Imagem revelada
    const imgRev = this.add.image(-110, -20, item.revelado)
    imgRev.setDisplaySize(260, 300)
    painelContainer.add(imgRev)

    // Nome do item
    const nomeText = this.add.text(130, -160, item.nome, {
      fontFamily: 'Georgia, serif',
      fontSize: '26px',
      color: '#F5D78E',
      stroke: '#3B1A00',
      strokeThickness: 5,
      align: 'center',
      wordWrap: { width: 260 }
    }).setOrigin(0.5)
    painelContainer.add(nomeText)

    // Linha separadora
    const linha = this.add.rectangle(130, -110, 240, 2, 0xC8973A, 0.7)
    painelContainer.add(linha)

    // Descrição
    const descText = this.add.text(130, 10, item.descricao, {
      fontFamily: 'Georgia, serif',
      fontSize: '19px',
      color: '#D4B483',
      stroke: '#1a0a00',
      strokeThickness: 3,
      align: 'center',
      lineSpacing: 6,
      wordWrap: { width: 260 }
    }).setOrigin(0.5)
    painelContainer.add(descText)

    // Botão fechar (X)
    const btnFechar = this.add.text(285, -220, '✕', {
      fontFamily: 'Georgia, serif',
      fontSize: '28px',
      color: '#F5D78E',
      stroke: '#3B1A00',
      strokeThickness: 4
    }).setOrigin(0.5).setInteractive()

    btnFechar.on('pointerover', () => btnFechar.setColor('#FF9944'))
    btnFechar.on('pointerout', () => btnFechar.setColor('#F5D78E'))
    btnFechar.on('pointerdown', () => this.fecharDetalhe(overlay, painelContainer, item, indice, imgOcultaCard, textoOcultaCard))
    painelContainer.add(btnFechar)

    // Badge "REVELADO!"
    const badge = this.add.text(-110, 170, '✦ REVELADO ✦', {
      fontFamily: 'Georgia, serif',
      fontSize: '15px',
      color: '#F5D78E',
      stroke: '#3B1A00',
      strokeThickness: 3
    }).setOrigin(0.5).setAlpha(0)
    painelContainer.add(badge)

    this.painelDetalhe = painelContainer

    // Animação de abertura (cresce do centro)
    this.tweens.add({
      targets: overlay,
      fillAlpha: 0.7,
      duration: 200
    })

    this.tweens.add({
      targets: painelContainer,
      scale: 1,
      alpha: 1,
      ease: 'Back.easeOut',
      duration: 380,
      onComplete: () => {
        // Badge pisca depois que o painel abre
        this.tweens.add({
          targets: badge,
          alpha: 1,
          duration: 300,
          yoyo: true,
          repeat: 2,
          onComplete: () => badge.setAlpha(1)
        })

        // Mostra a imagem revelada no card original
        const cardW = 180
        const cardH = 220
        const espacamento = 30
        const totalW = 5 * cardW + 4 * espacamento
        const startX = (this.scale.width - totalW) / 2 + cardW / 2
        const x = startX + indice * (cardW + espacamento)

        imgOcultaCard.setTexture(item.revelado)
        imgOcultaCard.setDisplaySize(cardW - 20, cardH - 60)
        imgOcultaCard.setAlpha(0.5)

        textoOcultaCard.setText(item.nome)
        textoOcultaCard.setFontSize('13px')
        textoOcultaCard.setAlpha(0.5)
        molduraCard.setStrokeStyle(2, 0xF5D78E)
      }
    })
  }

  // ── Fecha o painel com animação de encolhimento ──────────────────────────
  fecharDetalhe(overlay, painelContainer, item, indice, imgOcultaCard, textoOcultaCard) {
    this.tweens.add({
      targets: [overlay, painelContainer],
      alpha: 0,
      scale: painelContainer.scale * 0.85,
      duration: 220,
      ease: 'Quad.easeIn',
      onComplete: () => {
        overlay.destroy()
        painelContainer.destroy()
        this.painelDetalhe = null

        // Restaura visibilidade do card (agora revelado)
        imgOcultaCard.setAlpha(1)
        textoOcultaCard.setAlpha(1)
      }
    })
  }
}