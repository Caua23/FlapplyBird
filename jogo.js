console.log('[©Dev Vargas]');

const somDeHit = new Audio()
somDeHit.src = './efeitos/hit.wav'

const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

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
const chao = {
  spritesX: 0,
  spritesY: 610,
  largura: 224,
  altura: 112,
  x: 0,
  y: canvas.height - 112,
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
      if (fazColisao(flapplyBird, chao)) {
        console.log('fez colizao')
        somDeHit.play()
        mudaParaTela(Telas.inicio)
        return
      }

      flapplyBird.velocidade = flapplyBird.velocidade + flapplyBird.gravidade
      flapplyBird.y = flapplyBird.y + flapplyBird.velocidade
      // codigo q faz o passaro cair,seria meio que uma gravidade

    },

    desenha() {
      contexto.drawImage(
        sprites,
        flapplyBird.spritesX, flapplyBird.spritesY, //Sprite X e Y
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
      globais.flapplyBird = criaFlappyBird();
    },
    desenha() {

      planoDeFundo.desenha()
      chao.desenha()
      globais.flapplyBird.desenha()
      mensgemGetReady.desenha()
    },

    click() {
      mudaParaTela(Telas.Jogo)
    },

    atualiza() {

    }
  }
}


Telas.Jogo = {
  desenha() {

    planoDeFundo.desenha()
    chao.desenha()
    globais.flapplyBird.desenha()
  },

  click() {
    globais.flapplyBird.Pula()
  },
  atualiza() {
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
