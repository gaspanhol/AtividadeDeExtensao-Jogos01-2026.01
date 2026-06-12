export default class Vitoria extends Phaser.Scene {
    constructor () {
        super("Vitoria");
    }

    preload () {
        // carrega sua imagem de vitória
        this.load.image("bgVitoria", "public/assets/telas/vitoria.png");
    }

    create () {
        // fundo ocupando a tela inteira
        this.add.image(0, 0, "bgVitoria")
            .setOrigin(0, 0)
            .setDisplaySize(this.scale.width, this.scale.height);

        // texto de instrução
        this.add.text(
            this.scale.width / 2,
            this.scale.height / 2 + 150,
            "Parabéns! Você ganhou! \n Clique em qualquer lugar para jogar novamente",
            {
                fontSize: "20px",
                color: "#ffffff",
                align: "center",
                backgroundColor: "rgba(0,0,0,0.5)",
                padding: { x: 10, y: 5 }
            }
        ).setOrigin(0.5);

        // clique em qualquer lugar da tela
        this.input.once("pointerdown", () => {
            // recarrega a página inteira (zera tudo)
            window.location.reload();
        });
    }
}