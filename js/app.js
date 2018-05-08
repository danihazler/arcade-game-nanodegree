// Enemies our player must avoid
var Enemy = function(x,y,speed) {

  this.x = x;
  this.y = y;
  this.speed = speed;
  this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.

  this.x =+ this.x + this.speed;

  // to restart in different positions
  const randomX = Math.floor(Math.random() * (-85));

  if(this.x > 505){
    this.x = randomX;
  }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
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
      this.y = 350;
    }

  }
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const player = new Player(200,350);

const randomSpeed = Math.floor(Math.random() * 6);

const enemy = new Enemy(-50,60, randomSpeed);
const enemy1 = new Enemy(-100,140, randomSpeed);
const enemy2 = new Enemy(-200,150, randomSpeed);
const enemy3 = new Enemy(-300,220, randomSpeed);

const allEnemies = [enemy, enemy1, enemy2, enemy3];



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
