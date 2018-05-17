//-- Variables to handle Player lives
const livesCounter = document.querySelector("#lives-counter");
const scoreCounter = document.querySelector("#score-counter");
const gameOverModal = document.querySelector(".game-over-modal");
const finalScore = document.querySelector("#final-score");
const modalBtn = document.querySelector("#close-modal");


let lives;
let score;
let move_plyr;

function newGame() {
  lives = 3;
  score = 0;
  move_plyr = true;
  livesCounter.innerHTML = lives;
  scoreCounter.innerHTML = score;
};

window.onload = newGame();


// Player class
// This class has an update(), render() and
// a handleInput() method.
class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
    // this.lives = 3;
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
// Instantiate objects.
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
  if (move_plyr) {
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
        move_plyr = false;
        finalScore.innerHTML = score;
        gameOverModal.classList.add("show-modal");
      }
    }
  });
}

// -- Close Modal , Try Again
modalBtn.addEventListener("click", function(){
  gameOverModal.classList.remove("show-modal");
  newGame();
});
