const mario = document.querySelector(".mario");
const pipe = document.querySelector(".pipe");
const overDiv = document.querySelector(".game-status");
var counterVal = 0;
var body = document.querySelector(".tela-body");
var scoreInterval;
var pipeSpeed = 1500; // Velocidade inicial do tubo em milissegundos
var levelInterval;
var speedIncrement = 10; // Incremento de velocidade
const backgroundMusic = document.getElementById('background-music');
const jumpSound = new Audio('musica/puloMario.wav');

function jump() {
    mario.classList.add("jump");
    jumpSound.currentTime = 0; // Reseta o tempo do áudio para permitir repetição
    jumpSound.play();

    setTimeout(() => {
        mario.classList.remove("jump");
    }, 500);
}

function startScoreCounter() {
    scoreInterval = setInterval(() => {
        counterVal += 0.10;
        updateDisplay(counterVal);
    }, 1000); // Incrementa a pontuação a cada segundo
}

function increaseDifficulty() {
    levelInterval = setInterval(() => {
        if (pipeSpeed > 500) { // Limite mínimo para a velocidade do tubo
            pipeSpeed -= speedIncrement; // Diminui a velocidade do tubo de forma gradual
            pipe.style.animationDuration = `${pipeSpeed}ms`;
        }
    }, 1000); // Ajusta a dificuldade a cada segundo para uma transição mais suave
}

const loop = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

    if (document.body.offsetWidth >= 760) {
        if (pipePosition <= 100 && pipePosition > 0 && marioPosition < 80) {
            pipe.style.animation = 'none';
            pipe.style.left = `${pipePosition}px`;

            mario.style.animation = 'none';
            mario.style.bottom = `${marioPosition}px`;
            mario.src = '../images/loser.gif';
            mario.style.width = '65px';
            mario.style.marginLeft = '35px';

            clearInterval(loop);
            clearInterval(scoreInterval);
            clearInterval(levelInterval);

            gameOver();
        }
    } else if (document.body.offsetWidth >= 420) {
        if (pipePosition <= 85 && pipePosition > 0 && marioPosition < 50) {
            pipe.style.animation = 'none';
            pipe.style.left = `${pipePosition}px`;

            mario.style.animation = 'none';
            mario.style.bottom = `${marioPosition}px`;
            mario.src = '../images/loser.gif';
            mario.style.width = '50px';
            mario.style.marginLeft = '35px';

            clearInterval(loop);
            clearInterval(scoreInterval);
            clearInterval(levelInterval);

            gameOver();
        }
    } else {
        if (pipePosition <= 80 && pipePosition > 0 && marioPosition < 50) {
            pipe.style.animation = 'none';
            pipe.style.left = `${pipePosition}px`;

            mario.style.animation = 'none';
            mario.style.bottom = `${marioPosition}px`;
            mario.src = '../images/loser.gif';
            mario.style.width = '50px';
            mario.style.marginLeft = '35px';

            clearInterval(loop);
            clearInterval(scoreInterval);
            clearInterval(levelInterval);

            gameOver();
        }
    }
}, 10);

function gameOver() {
    overDiv.innerHTML += `<img src="../images/overpic.png" alt="imagem game over" class="game-over">
    <button class="buttonStart" onclick="start()">
        <img src="../images/Daco_4422541.png" alt="imagem começar jogo" width="150px" class="start">
    </button>`;
    backgroundMusic.pause(); // Pausa a música quando o jogo acaba
}

function start() {
    location.reload();
}

function updateDisplay(val) {
    document.getElementById("counter-label").innerHTML = val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

body.addEventListener('touchstart', jump);

document.addEventListener('keydown', function (event) {
    if (event.key === " ") {
        jump();
    }
});

document.addEventListener('keydown', function (event) {
    if (event.key === "Enter") {
        start();
    }
});

const inst = document.querySelector(".instrucoes");

let i = 0;
function handleInstrucao() {
    if (window.innerWidth < 990 && i < 1) {
        inst.innerHTML += "<p><b>Usando Mobile?</b> Toque a tela para pular e pressione <i>Start</i> para reiniciar o jogo.</p>";
        i += 1;
    }
}

window.addEventListener("resize", handleInstrucao);
window.addEventListener("pageshow", handleInstrucao);

// Inicia a contagem de pontos e a dificuldade crescente quando a página é carregada
window.addEventListener("load", () => {
    startScoreCounter();
    increaseDifficulty();
    backgroundMusic.play(); // Inicia a reprodução da música
});

