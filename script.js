const gameContainer = document.getElementById('game-container');
const timerEl = document.getElementById('timer');
const killsEl = document.getElementById('kills');
const levelEl = document.getElementById('level');
const muteBtn = document.getElementById('mute-btn');
const offlineBanner = document.getElementById('offline');
const startBtn = document.getElementById('start-btn');
const bgMusic = document.getElementById('bg-music');
const smashSound = document.getElementById('smash-sound');
const speedingUpMessage = document.getElementById('speeding-up-message'); // NEW

let time = 0;
let kills = 0;
let level = 1;
let spawnInterval = 2000;
let gameInterval;

// Function to spawn cockroach
function spawnCockroach() {
  const cockroach = document.createElement('img');
  cockroach.src = 'cockroach.jpg';
  cockroach.className = 'cockroach';
  cockroach.style.top = Math.random() * (window.innerHeight - 60) + 'px';
  cockroach.style.left = Math.random() * (window.innerWidth - 60) + 'px';

  cockroach.onclick = () => {
    if (!cockroach.classList.contains('dead')) {
      cockroach.classList.add('dead');
      cockroach.src = 'cockroach-dead.jpg';
      kills++;
      killsEl.textContent = kills;
      smashSound.currentTime = 0;
      smashSound.play();

      setTimeout(() => cockroach.remove(), 1000);
    }
  };

  gameContainer.appendChild(cockroach);
}

// Function to display "Speeding Up!" message
function showSpeedingUpMessage() {
  speedingUpMessage.style.opacity = 1; // Show the message
  setTimeout(() => {
    speedingUpMessage.style.opacity = 0; // Fade it out
  }, 1500); // Message will fade out after 1.5 seconds
}

// Start the game
function startGame() {
  setInterval(() => {
    time++;
    timerEl.textContent = time;

    // Every 10 seconds, increase difficulty and show speeding-up message
    if (time % 10 === 0 && spawnInterval > 300) {
      level++;
      levelEl.textContent = level;
      spawnInterval -= 150; // Speed up the game
      clearInterval(gameInterval);
      gameInterval = setInterval(spawnCockroach, spawnInterval);

      // Show speeding-up message
      showSpeedingUpMessage();
    }
  }, 1000);

  gameInterval = setInterval(spawnCockroach, spawnInterval);
}

// Mute button functionality
muteBtn.onclick = () => {
  bgMusic.muted = !bgMusic.muted;
  smashSound.muted = !smashSound.muted;
  muteBtn.textContent = bgMusic.muted ? 'Unmute' : 'Mute';
};

// Check internet connection
function checkConnection() {
  offlineBanner.style.display = navigator.onLine ? 'none' : 'block';
}

window.addEventListener('online', checkConnection);
window.addEventListener('offline', checkConnection);
checkConnection();

// Handle Start button click
startBtn.addEventListener('click', () => {
  document.getElementById('landing-page').style.display = 'none';
  document.getElementById('ui').style.display = 'block';
  document.getElementById('game-container').style.display = 'block';

  bgMusic.play().catch((error) => {
    console.log('Autoplay blocked, trying manual play');
  });

  startGame();
});
