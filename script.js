const dino = document.querySelector('.dinorunstyle1');
const background = document.querySelector('.background');
const scoreboard = document.querySelector('.scoreboard');
let isJumping = false;
let position =0;
let score =0;
let runStyle =1;
let gameover= false;

function handleKeyDown(event) {
    if(gameover)
        location.reload();

    if (event.keyCode === 32) {
        if (!isJumping){ 
            jump();
        }
  }
}

function jump(){
       isJumping = true;
       dino.classList.add('dinojump');

    let upInterval = setInterval (() =>{ 
        if (position >= 140) {
         clearInterval(upInterval);

    let downInterval = setInterval(() => {
        if (position <=0){
        clearInterval(downInterval);
        isJumping = false;
        dino.classList.remove('dinojump');
        } else{
            position -= 20;
            dino.style.bottom = position + 'px';
             }
            }, 30);
        } else{
        position += 20;

        dino.style.bottom = position + 'px';
        }
    }, 30);
}


function createRainbow() {
    const rainbow = document.createElement('div');
    let rainbowPosition = 1500;
    let randomTime = Math.random() * 6000;
    let rainbowHeight = 80;
    let rainbowWidth = 40;
    let dinoInitialPosition = 100;
    
    
    rainbow.classList.add('rainbow');
    rainbow.style.left = 1500 + 'px';
    background.appendChild(rainbow);

    let leftInterval = setInterval(() =>{
        if (rainbowPosition < - (dinoInitialPosition+rainbowWidth)  ) {
            clearInterval (leftInterval);
            background.removeChild(rainbow);
        } else if (rainbowPosition > dinoInitialPosition && rainbowPosition < 140 && position < rainbowHeight) {
      
        clearInterval(leftInterval); 
        document.body.innerHTML = `<h1 class="game-over">Fim de Jogo!</h1> <div class="bannergameover"></div> <h2 class="results">Placar Final: ${score}</h2> <h3 class="presskeytocontinue">Pressione qualquer tecla para jogar novamente!</h3>`;
        gameover = true;

        } else {
        rainbowPosition -=10;
        rainbow.style.left = rainbowPosition + 'px';
        }
    }, 20);

    setTimeout(createRainbow, randomTime);
}

function dinoRun() {
    let runInterval = setInterval(() =>{
        changeRunStyle();
        scoreboardRefresh();
           },200)
}

function scoreboardRefresh() {
    if (gameover) return;    
        scoreboard.innerHTML = `Score: ${score +=10}`
}

function changeRunStyle(){
    if (runStyle === 1){
        runStyle = 2;
        dino.classList.replace('dinorunstyle1','dinorunstyle2');    
    }else{
        runStyle = 1;
        dino.classList.replace('dinorunstyle2','dinorunstyle1');       
    }
}
createRainbow();
dinoRun();
document.addEventListener('keydown', handleKeyDown);