// Necessary sleep function for delaying code execution
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Global variable for keeping score
let score = 0;

// Moves array
const movesList = ['rock', 'paper', 'scissors', 'lizard', 'spock'];

// Store DOM in variables
let rulesBox = document.querySelector('.rules-background');
let closeButton = document.querySelector('.close-icon');
let rulesButtons = document.querySelectorAll('.rules-button');
let result = document.querySelector('.result-container');
let placeHolder = document.querySelector('.house-placeholder');
let house = document.querySelector('.game-div-house');
let houseIcon = document.querySelector('#house-move');
let player = document.querySelector('.game-div-player');
let playerIcon = document.querySelector('#player-move');
let playButton = document.querySelector('#play-again');
let movesButtons = document.querySelectorAll('.moves-button');
let mainSection = document.querySelector('#middle-section-main');
let gameSection = document.querySelector('#middle-section-game');
let scoreValue = document.querySelector('.score-value');
let gameResult = document.querySelector('#game-result');
let playAgain = document.querySelector('#play-again');

// Rules button
rulesButtons.forEach(function (button) {
  button.onclick = function () {
    rulesBox.style.display = 'block';
  };
});

closeButton.onclick = function () {
  rulesBox.style.display = 'none';
};

window.onclick = function (event) {
  if (event.target === rulesBox) {
    rulesBox.style.display = 'none';
  }
};

// Event listener for each of the moves buttons
movesButtons.forEach(function (button) {
  button.addEventListener('click', roundStart);
});

// Event listener for play again button
playAgain.addEventListener('click', function () {
  resetGame();
  animateMiddleSection();
});

// Start round passing clicked button as chosen move
function roundStart() {
  animateMiddleSection();
  let playerMove = this.id;
  setPlayerMove(playerMove);
  let houseMove = getHouseMove();
  setHouseMove(houseMove);
  setTimeout(function () {
    animateHouseMove();
  }, 2000);
  let roundResult = checkResult(playerMove, houseMove);
  if (roundResult === 'draw') {
    gameResult.innerText = 'draw';
  } else if (roundResult === 'lose') {
    score--;
    gameResult.innerText = 'you lose';
  } else {
    score++;
    gameResult.innerText = 'you win';
  }
  setTimeout(function () {
    animateResult(roundResult);
  }, 3000);
}

// Get computer move
function getHouseMove() {
  let moveIndex = Math.floor(Math.random() * 5);
  return movesList[moveIndex];
}

// Check result
function checkResult(playerMove, houseMove) {
  if (playerMove === 'rock' && houseMove === 'rock') return 'draw';
  else if (playerMove === 'rock' && houseMove === 'paper') return 'lose';
  else if (playerMove === 'rock' && houseMove === 'scissors') return 'win';
  else if (playerMove === 'rock' && houseMove === 'lizard') return 'win';
  else if (playerMove === 'rock' && houseMove === 'spock') return 'lose';
  else if (playerMove === 'paper' && houseMove === 'rock') return 'win';
  else if (playerMove === 'paper' && houseMove === 'paper') return 'draw';
  else if (playerMove === 'paper' && houseMove === 'scissors') return 'lose';
  else if (playerMove === 'paper' && houseMove === 'lizard') return 'lose';
  else if (playerMove === 'paper' && houseMove === 'spock') return 'win';
  else if (playerMove === 'scissors' && houseMove === 'rock') return 'lose';
  else if (playerMove === 'scissors' && houseMove === 'paper') return 'win';
  else if (playerMove === 'scissors' && houseMove === 'scissors') return 'draw';
  else if (playerMove === 'scissors' && houseMove === 'lizard') return 'win';
  else if (playerMove === 'scissors' && houseMove === 'spock') return 'lose';
  else if (playerMove === 'lizard' && houseMove === 'rock') return 'lose';
  else if (playerMove === 'lizard' && houseMove === 'paper') return 'win';
  else if (playerMove === 'lizard' && houseMove === 'scissors') return 'lose';
  else if (playerMove === 'lizard' && houseMove === 'lizard') return 'draw';
  else if (playerMove === 'lizard' && houseMove === 'spock') return 'win';
  else if (playerMove === 'spock' && houseMove === 'rock') return 'win';
  else if (playerMove === 'spock' && houseMove === 'paper') return 'lose';
  else if (playerMove === 'spock' && houseMove === 'scissors') return 'win';
  else if (playerMove === 'spock' && houseMove === 'lizard') return 'lose';
  else if (playerMove === 'spock' && houseMove === 'spock') return 'draw';
}

async function resetGame() {
  await sleep(500);
  house.style.transform = '';
  house.style.opacity = '';
  result.style.visibility = '';
  result.style.opacity = '';
}

// animate middle section for transitions
async function animateMiddleSection() {
  if (
    gameSection.style.display === '' ||
    gameSection.style.display === 'none'
  ) {
    mainSection.style.opacity = '0';
    await sleep(500);
    mainSection.style.display = 'none';
    gameSection.style.opacity = '0';
    gameSection.style.display = 'block';
    await sleep(500);
    gameSection.style.opacity = '1';
  } else if (
    mainSection.style.display === '' ||
    mainSection.style.display === 'none'
  ) {
    gameSection.style.opacity = '0';
    await sleep(500);
    gameSection.style.display = 'none';
    mainSection.style.opacity = '0';
    mainSection.style.display = 'block';
    await sleep(500);
    mainSection.style.opacity = '1';
  }
}

// Animate house move
async function animateHouseMove() {
  house.style.transform = 'scale(1.15)';
  house.style.opacity = '1';
  await sleep(600);
  house.style.transform = 'scale(1)';
}

// Animate player score and round result
async function animateResult(roundResult) {
  result.style.visibility = 'visible';
  result.style.opacity = '1';
  if (roundResult !== 'draw') {
    await sleep(500);
    scoreValue.style.opacity = '0';
    await sleep(500);
    scoreValue.innerText = score;
    scoreValue.style.opacity = '1';
  }
}

// Update player move
function setPlayerMove(move) {
  player.classList.remove(player.classList[player.classList.length - 1]);
  player.classList.add(`border-${move}`);
  playerIcon.setAttribute('src', `images/icon-${move}.svg`);
  playerIcon.setAttribute('alt', `${move} icon`);
}

// Update house move
function setHouseMove(move) {
  house.classList.remove(house.classList[house.classList.length - 1]);
  house.classList.add(`border-${move}`);
  houseIcon.setAttribute('src', `images/icon-${move}.svg`);
  houseIcon.setAttribute('alt', `${move} icon`);
}
