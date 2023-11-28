console.log('[©Dev Vargas]');

let frames = 0;
const somDeHit = new Audio()
somDeHit.src = './efeitos/hit.wav'

const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');


/*
Para fazer o jogo ficar se atualizando e faazendo anima
-ções Criasse a *function criaChao* que assim faz 
ultilizar uma variavel global
*/

//Fundo
const planoDeFundo = {
  spritesX: 390,
  spritesY: 0,
  largura: 275,
  altura: 204,
  x: 0,
  y: canvas.height - 204,
  desenha() {

    contexto.fillStyle = '#70c5ce'
    contexto.fillRect(0, 0, canvas.width, canvas.height)

    contexto.drawImage(
      sprites,
      planoDeFundo.spritesX, planoDeFundo.spritesY, //Sprite X e Y
      planoDeFundo.largura, planoDeFundo.altura,//tamnha do recorte no sprite
      planoDeFundo.x, planoDeFundo.y, //aonde vai aparecer
      planoDeFundo.largura, planoDeFundo.altura,//tamnha q vai aparecer
    )

    contexto.drawImage(
      sprites,
      planoDeFundo.spritesX, planoDeFundo.spritesY,
      planoDeFundo.largura, planoDeFundo.altura,
      (planoDeFundo.x + planoDeFundo.largura), planoDeFundo.y,
      planoDeFundo.largura, planoDeFundo.altura,
    )

  }
}


//Chão
function criaChao() {
  const chao = {
    spritesX: 0,
    spritesY: 610,
    largura: 224,
    altura: 112,
    x: 0,
    y: canvas.height - 112,
    atualiza() {
      const movimentoDoChao = 1
      const RepeteChao = chao.largura / 2
      const movimentacao = chao.x - movimentoDoChao
      chao.x = movimentacao % RepeteChao
    },
    desenha() {
      contexto.drawImage(
        sprites,
        chao.spritesX, chao.spritesY,
        chao.largura, chao.altura,
        chao.x, chao.y,
        chao.largura, chao.altura,
      )

      contexto.drawImage(
        sprites,
        chao.spritesX, chao.spritesY,
        chao.largura, chao.altura,
        (chao.x + chao.largura), chao.y,
        // essa tag *(chao.x + chao.largura)* ela empurra o chão para o lado
        chao.largura, chao.altura,
      )
    }
  }
  return chao
}


function fazColisao(flapplyBird, chao) {
  const flapplyBirdY = flapplyBird.y + flapplyBird.altura
  const chaoY = chao.y

  if (flapplyBirdY >= chaoY) {
    return true
  }
  return false

}


//passaro
function criaFlappyBird() {
  const flapplyBird = {
    spritesX: 0,
    spritesY: 0,
    largura: 33,
    altura: 24,
    x: 10,
    y: 50,


    pulo: 4.6,
    Pula() {
      console.log('pula')
      flapplyBird.velocidade = - flapplyBird.pulo
    },

    gravidade: 0.25,
    velocidade: 0,

    atualiza() {
      if (fazColisao(flapplyBird, globais.chao)) {
        console.log('fez colizao')
        somDeHit.play()
        mudaParaTela(Telas.inicio)
        return
      }

      flapplyBird.velocidade = flapplyBird.velocidade + flapplyBird.gravidade
      flapplyBird.y = flapplyBird.y + flapplyBird.velocidade
      // codigo q faz o passaro cair,seria meio que uma gravidade

    },

    movimentos: [
      { spriteX: 0, spriteY: 0 },//asa cima
      { spriteX: 0, spriteY: 26 },//asa meio
      { spriteX: 0, spriteY: 52 },//asa baixo
      { spriteX: 0, spriteY: 26 },//asa meio

    ],
    frameAtual: 0,
    atualizaOFrameAtual() {
      const intervaloDeFrames = 8
      const passouOintervalo = frames % intervaloDeFrames === 0

      if (passouOintervalo) {
        const baseDoIncremento = 1
        const incremento = baseDoIncremento + flapplyBird.frameAtual
        const baseRepeticao = flapplyBird.movimentos.length
        flapplyBird.frameAtual = incremento % baseRepeticao
      }

    },
    desenha() {
      flapplyBird.atualizaOFrameAtual()
      const { spriteX, spriteY } = flapplyBird.movimentos[flapplyBird.frameAtual]
      contexto.drawImage(
        sprites,
        spriteX, spriteY, //Sprite X e Y
        flapplyBird.largura, flapplyBird.altura,//tamnha do recorte no sprite
        flapplyBird.x, flapplyBird.y, //aonde vai aparecer
        flapplyBird.largura, flapplyBird.altura, //tamnha q vai aparecer

        /*
        0, 0,      Sprite X e Y
        33, 24,    tamnha do recorte no sprite
        10, 50,    aonde vai aparecer
        33, 24,    tamnha q vai aparecer
        
        esse codigo ele é uma function para organizar o seu 
        codigo ,que vc cria para desenhar o passaro e logo 
        chama ele na (funciton loop)
        */
      )
    }
  }
  return flapplyBird
}

function criaCanos() {
  const canos = {
    largura: 52,
    altura: 400,
    chao: {
      spritesX: 0,
      spritesY: 169,
    },
    ceu: {
      spriteX: 52,
      spriteY: 169
    },
    espaco: 80,
    desenha() {


      canos.pares.forEach(function (par) {
        const espacamentoEntreCanos = 90
        const yRandow = par.y

        //[Canos do Ceu]
        const canoCeuX = par.x
        const canoCeuY = yRandow
        contexto.drawImage(
          sprites,
          canos.ceu.spriteX, canos.ceu.spriteY,
          canos.largura, canos.altura,
          canoCeuX, canoCeuY,
          canos.largura, canos.altura,
        )

        //[Canos Do Chão]

        const canoChaoX = par.x;
        const canoChaoY = canos.altura + espacamentoEntreCanos + yRandow;
        contexto.drawImage(
          sprites,
          canos.chao.spritesX, canos.chao.spritesY,
          canos.largura, canos.altura,
          canoChaoX, canoChaoY,
          canos.largura, canos.altura,
        )
        par.canoCeu = {
          x: canoCeuX,
          y: canos.altura + canoCeuY
        }

        par.canoChao = {
          x: canoChaoX,
          y: canos.altura + canoChaoY
        }
      })

    },
    temColisaoComOFlappyird(par) {
      const cabecaDoFlapply = globais.flapplyBird.y
      const peDoFlappy = globais.flapplyBird.y + globais.flapplyBird.altura

      if (globais.flapplyBird.x >= par.x) {

        if (cabecaDoFlapply <= par.canoCeu.y) {
          return true
        }

        if (peDoFlappy >= par.canoChao.y) {
          return true
        }

      }
      return false
    },
    pares: [],
    atualiza() {
      const Passou100Frames = frames % 100 === 0;
      if (Passou100Frames) {
        console.log('frames')
        canos.pares.push({

          x: canvas.width,
          y: -150 * (Math.random() + 1),

        })


      }
      canos.pares.forEach(function (par) {
        par.x = par.x - 2;
        if (canos.temColisaoComOFlappyird(par)) {
          mudaParaTela(Telas.inicio)
          console.log('perdeu')
        }
        if (par.x + canos.largura <= 0) {
          canos.pares.shift()
        }
      })
    }
  }

  return canos;
}


//msg de inicio
const mensgemGetReady = {
  spritesX: 134,
  spritesY: 0,
  largura: 174,
  altura: 152,
  x: (canvas.width / 2) - 174 / 2,
  y: 50,
  desenha() {
    contexto.drawImage(
      sprites,
      mensgemGetReady.spritesX, mensgemGetReady.spritesY,
      mensgemGetReady.largura, mensgemGetReady.altura,
      mensgemGetReady.x, mensgemGetReady.y,
      mensgemGetReady.largura, mensgemGetReady.altura,
    )
  }
}



//[Telas]
const globais = {};
let telaAtiva = {};

function mudaParaTela(novaTela) {
  telaAtiva = novaTela;

  if (telaAtiva.inicializa) {
    telaAtiva.inicializa()
  }
};

//Essa function faz mudar a tela ativa

const Telas = {
  inicio: {
    inicializa() {
      globais.canos = criaCanos()
      globais.flapplyBird = criaFlappyBird()
      globais.chao = criaChao()
    },
    desenha() {

      planoDeFundo.desenha()
      globais.canos.desenha()
      globais.chao.desenha()
      globais.flapplyBird.desenha()

      mensgemGetReady.desenha()

    },

    click() {
      mudaParaTela(Telas.Jogo)
    },

    atualiza() {
      globais.chao.atualiza()
    }
  }
}


Telas.Jogo = {
  desenha() {

    planoDeFundo.desenha()
    globais.canos.desenha()
    globais.chao.desenha()
    globais.flapplyBird.desenha()
  },

  click() {
    globais.flapplyBird.Pula()
  },
  atualiza() {
    globais.canos.atualiza()
    globais.chao.atualiza()
    globais.flapplyBird.atualiza()
  }
}

/*  
dica a ordem de cima para baixo, seria como fosse 0 , 1 , 2 , 3
essa tag ela que chama a function para fazer o desenho na tela 
São telas que podem ser alternadas entre si
*/

function loop() {
  //esta em loop para ficar sempre desenhando
  telaAtiva.desenha();
  telaAtiva.atualiza();
  frames = frames + 1

  requestAnimationFrame(loop)
  //ajuda a desenhar na tela os quadros

  /*  
  Esses comando são duas functions para organizar o codigo
  resumindo essa funciton chama um loop que chama ela msm no *requestAnimationFrame(loop)*(Assim fazendo o loop)
  o contexto.drawImage mostra aonde esta e qual parte tem que recortar dos Sprites
  */

}


window.addEventListener('click', function () {
  if (telaAtiva && telaAtiva.click) {
    telaAtiva.click();
  }
});
mudaParaTela(Telas.inicio);
//esse comando chama a function que esta executando como ex a de inico
loop()
