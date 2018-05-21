//-- Variables to handle events
const livesCounter = document.querySelector("#lives-counter");
const scoreCounter = document.querySelector("#score-counter");
const gameOverModal = document.querySelector(".game-over-modal");
const finalScore = document.querySelector("#final-score");
const rulesModal = document.querySelector(".rules-modal");
const modalBtn = document.querySelector("#close-modal");
const playBtn = document.querySelector("#play-btn");
const timer = document.querySelector("#time-counter");

let lives;
let score;
let move_player;

let counter = 0;
let timeLeft = 60;


// -- (Re)Start the game
function newGame() {
  lives = 3;
  score = 0;
  move_player = true;
  livesCounter.innerHTML = lives;
  scoreCounter.innerHTML = score;
  timer.innerHTML = timeLeft;
};

window.onload = newGame();

// -- Timer ------
function countdown(){

  timer.innerHTML = timeLeft - counter;
  const interval = setInterval(timeInt, 1000);

  function timeInt() {
    counter ++;
    timer.innerHTML = timeLeft - counter;
    if (counter == timeLeft) {
      gameOverModal.classList.add("show-modal");
      finalScore.innerHTML = score;
      clearInterval(interval);
      counter = 0;
      move_player = false;
    }
  }
}

// -- Close Modal , Play
playBtn.addEventListener("click", function(){
  rulesModal.classList.add("hide-modal");
  countdown();
});

// Player class
// This class has an update(), render() and
// a handleInput() method.
class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
  }
  update(dt) {
    this.render();
  }
  //-- Player's moviments and prevents Player to leave the canvas
  handleInput(allowedKeys) {
    if(allowedKeys === "up" && this.y > 1){
      this.y -= 80;
    }
    if(allowedKeys === "down" && this.y < 350){
      this.y += 80;
    }
    if(allowedKeys === "right" && this.x < 400){
      this.x += 100;
    }
    if(allowedKeys === "left" && this.x > 1){
      this.x -= 100;
    }
    //-- if Player reachs the water goes back to initial position
    if(this.y < 30) {
      this.y = 370;
      score += 100;
      scoreCounter.innerHTML = score;
    }

  }
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

// Enemy class
// This class has an update(), render() and
// a handleInput() method.
class Enemy {
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = Math.floor((Math.random() * 150) + 50);
    this.sprite = 'images/enemy-bug.png';
  }
  update(dt) {
    this.render();

    this.x += this.speed * dt;
    //-- goes back in the beginning once out of the canvas
    if(this.x > 505){
      this.x = -100;
    }
    //-- checks if a collision has happened
    handleCollision();
  }
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

// --Instantiate objects.
const player = new Player(200,370);

const enemy = new Enemy(-50,60);
const enemy1 = new Enemy(-100,140);
const enemy2 = new Enemy(-200,150);
const enemy3 = new Enemy(-300,220);

const allEnemies = [enemy, enemy1, enemy2, enemy3];

// This listens for key presses and sends the keys to
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };
  if (move_player) {
    player.handleInput(allowedKeys[e.keyCode]);
  }
});

// Checking collision
function handleCollision() {
  allEnemies.forEach(function(enemy){
    if ((player.x < enemy.x + 70 && player.x + 50 > enemy.x) && (player.y < enemy.y + 40 && player.y + 40 > enemy.y)) {
      player.x = 200;
      player.y = 370;
      lives--;
      livesCounter.innerHTML = lives;
      //-- checks if lives are finished
      if(lives == 0) {
        move_player = false;
        finalScore.innerHTML = score;
        gameOverModal.classList.add("show-modal");
        clearInterval(interval);
      }
    }
  });
}

// -- Close Modal , Try Again
modalBtn.addEventListener("click", function(){
  gameOverModal.classList.remove("show-modal");
  newGame();
  countdown();
});
