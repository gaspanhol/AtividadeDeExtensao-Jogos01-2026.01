export default class SoundManager {
    constructor(scene) {
        this.scene = scene
        this.sons = {}
        this.musicaAtual = null
        this._mutado = false
        this._volumeGlobal = 1
    }

    create() {
    const tentarAdicionar = (key, config) => {
        if (this.scene.cache.audio.exists(key)) {
            this.sons[key] = this.scene.sound.add(key, config)
        } else {
            console.warn(`SoundManager: "${key}" não carregado, pulando.`)
        }
    }

        tentarAdicionar('passo',  { loop: false, volume: 0.5 })
        tentarAdicionar('correr', { loop: false, volume: 0.7 })
        tentarAdicionar('musica', { loop: true,  volume: 0.3 })
        tentarAdicionar('porta', { loop: false,  volume: 0.3 })
        tentarAdicionar('item', { loop: false,  volume: 0.3 })
        tentarAdicionar('abertura', { loop: false,  volume: 0.7 })
    }

  

    tocarMusica() {
        if (this.sons.musica && !this.sons.musica.isPlaying) {
            this.sons.musica.play({seek: 12})
        }
    }

    pararMusica() {
        if (this.sons.musica?.isPlaying) {
            this.sons.musica.stop()
        }
    }

  

    tocarPasso(correndo) {
        if (correndo) {
        if (this.sons.passo?.isPlaying) this.sons.passo.stop()
            if (this.sons.correr && !this.sons.correr.isPlaying) this.sons.correr.play({seek: 1.1, rate: 1.3})
            } else {
            if (this.sons.correr?.isPlaying) this.sons.correr.stop()
            if (this.sons.passo && !this.sons.passo.isPlaying) this.sons.passo.play({seek: 1.1})
        }
    }

    pararPassos() {
        if (this.sons.passo?.isPlaying)  this.sons.passo.stop()
        if (this.sons.correr?.isPlaying) this.sons.correr.stop()
    }

     tocarAbertura() {
        if (this.sons.abertura && !this.sons.abertura.isPlaying) {
            this.sons.abertura.play({seek: 0.5})
        }
    }
  
    //  Efeitos avulsos

    tocar(nome) {
        const som = this.sons[nome]
        if (!som) {
            console.warn(`SoundManager: som "${nome}" não encontrado.`)
            return
        }
        // Reinicia se já estiver tocando (bom pra efeitos rápidos)
        if (som.isPlaying) som.stop()
        som.play()
    }

    // Volume e mute

    setVolume(valor) {
        this._volumeGlobal = Phaser.Math.Clamp(valor, 0, 1)
        this.scene.sound.setVolume(this._volumeGlobal)
    }

    toggleMute() {
        this._mutado = !this._mutado
        this.scene.sound.setMute(this._mutado)
        return this._mutado
    }

    get mutado() {
        return this._mutado
    }

    //  Limpeza

    destroy() {
        Object.values(this.sons).forEach(som => {
            if (som.isPlaying) som.stop()
            som.destroy()
        })
        this.sons = {}
    }
}