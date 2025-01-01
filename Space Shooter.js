const gameContainer = document.getElementById('game-container');
const spaceship = document.getElementById('spaceship');
const scoreDisplay = document.getElementById('score');

let score = 0;

// Move spaceship with the mouse
gameContainer.addEventListener('mousemove', (event) => {
  const rect = gameContainer.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  spaceship.style.left = `${mouseX - spaceship.offsetWidth / 2}px`;
});

// Shoot lasers on click
gameContainer.addEventListener('click', () => {
  shootLaser();
});

// Create and shoot a laser
function shootLaser() {
  const laser = document.createElement('div');
  laser.classList.add('laser');
  laser.style.left = `${spaceship.offsetLeft + spaceship.offsetWidth / 2 - 2.5}px`;
  laser.style.bottom = '60px';
  gameContainer.appendChild(laser);

  const laserInterval = setInterval(() => {
    const laserBottom = parseInt(laser.style.bottom);
    laser.style.bottom = `${laserBottom + 10}px`;

    // Remove laser if out of bounds
    if (laserBottom > window.innerHeight) {
      laser.remove();
      clearInterval(laserInterval);
    }

    // Check for collision with asteroids
    const asteroids = document.querySelectorAll('.asteroid');
    asteroids.forEach((asteroid) => {
      if (isCollision(laser, asteroid)) {
        asteroid.remove();
        laser.remove();
        clearInterval(laserInterval);
        updateScore();
      }
    });
  }, 20);
}

// Spawn asteroids at random positions
function spawnAsteroids() {
  const asteroid = document.createElement('div');
  asteroid.classList.add('asteroid');
  asteroid.style.left = `${Math.random() * (window.innerWidth - 40)}px`;
  asteroid.style.top = '0px';
  gameContainer.appendChild(asteroid);

  const asteroidInterval = setInterval(() => {
    const asteroidTop = parseInt(asteroid.style.top);
    asteroid.style.top = `${asteroidTop + 5}px`;

    // Remove asteroid if out of bounds
    if (asteroidTop > window.innerHeight) {
      asteroid.remove();
      clearInterval(asteroidInterval);
    }

    // Check for collision with spaceship
    if (isCollision(asteroid, spaceship)) {
      alert('Game Over! Your Score: ' + score);
      window.location.reload();
    }
  }, 20);
}

// Check for collision between two elements
function isCollision(elem1, elem2) {
  const rect1 = elem1.getBoundingClientRect();
  const rect2 = elem2.getBoundingClientRect();
  return !(
    rect1.top > rect2.bottom ||
    rect1.bottom < rect2.top ||
    rect1.left > rect2.right ||
    rect1.right < rect2.left
  );
}

// Update and display score
function updateScore() {
  score++;
  scoreDisplay.textContent = `Score: ${score}`;
}

// Spawn asteroids every 2 seconds
setInterval(spawnAsteroids, 2000);
