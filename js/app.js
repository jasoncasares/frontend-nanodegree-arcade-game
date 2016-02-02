// Enemies our player must avoid
var Enemy = function (x, y) {
    this.x = x;
    this.y = y;
    this.speed = Math.floor((Math.random() * 5) + 1);
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started


    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    this.x = this.x + 100 * dt * this.speed;
    // Limit enemy reaches on X Axis before it resets
    var enemyLimit = 800;
    if (this.x > enemyLimit) {
        this.reset();
    }

    Enemy.prototype.reset = function () {
        this.x = -50;
        var valueY = [60, 140, 225];
        this.y = valueY[Math.floor(Math.random() * 3)];
        this.speed = Math.floor((Math.random() * 5) + 1);
    };
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function () {
    this.x = 200;
    this.y = 400;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function () {
    if (this.x < 0) {
        this.x = 0;
    } else if (this.x > 400) {
        this.x = 400;
    } else if (this.y === 0) {
        this.y = 400;
    } else if (this.y < 0) {
        this.y = 0;
    } else if (this.y > 400) {
        this.y = 400;
    }

    this.checkCollision();
};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (key) {
    switch (key) {
    case 'left':
        this.x = this.x - 100;
        break;
    case 'up':
        this.y = this.y - 85;
        break;
    case 'right':
        this.x = this.x + 100;
        break;
    case 'down':
        this.y = this.y + 85;
        break;
    }
};

Player.prototype.checkCollision = function () {
    for (var i = 0; i < allEnemies.length; i++)
        if (this.x < allEnemies[i].x + 50 &&
            this.x + 50 > allEnemies[i].x &&
            this.y < allEnemies[i].y + 50 &&
            this.y + 50 > allEnemies[i].y) {
            this.x = 200;
            this.y = 400;
        }
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
(function () {
    var allEnemies = [];
    var valueY = [60, 140, 225];

    for (var i = 0; i < 5; i++) {
        var x = (Math.floor(Math.random() * -1000) + 1);
        var y = valueY[Math.floor(Math.random() * 3)];
        var enemy = new Enemy(x, y);
        allEnemies.push(enemy);
        window['allEnemies'] = allEnemies;
    }
})();

var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});