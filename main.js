// Necessary sleep function for delaying code execution
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Global variable for keeping score
let score = 0;

// Moves array
const movesList = ['R', 'P', 'S', 'L', 'K'];

// Player moves array
const playerMoves = [];

// Player moves probabilities
const movesScore = {
  R: 0,
  P: 0,
  S: 0,
  L: 0,
  K: 0,
};

// Rules box DOM variables
const rulesButton = document.querySelector('.rules-button');
const closeButton = document.querySelector('.close-icon');
const rulesBox = document.querySelector('.rules-background');

// Game buttons DOM variables
const movesButtons = document.querySelectorAll('.moves-button');
const playAgain = document.querySelector('.play-button');

// Middle section DOM variables
const mainSection = document.querySelector('#middle-section-main');
const gameSection = document.querySelector('#middle-section-game');

// Game icons DOM variables
const house = document.querySelector('.game-div-house');
const houseIcon = document.querySelector('#house-move');
const player = document.querySelector('.game-div-player');
const playerIcon = document.querySelector('#player-move');

// Result and score DOM variables
const result = document.querySelector('.result-container');
const scoreValue = document.querySelector('.score-value');
const gameResult = document.querySelector('.result-text');

// Rules button
rulesButton.onclick = function () {
  rulesBox.style.display = 'block';
};

closeButton.onclick = function () {
  rulesBox.style.display = 'none';
};

window.onclick = function (event) {
  if (event.target === rulesBox) {
    rulesBox.style.display = 'none';
  }
};

// Update moves scores based on player last move
function updateScores(move) {
  movesScore.R *= 0.95;
  movesScore.P *= 0.95;
  movesScore.S *= 0.95;
  movesScore.L *= 0.95;
  movesScore.K *= 0.95;
  if (move === 'R') {
    movesScore.P += 0.1;
    movesScore.K += 0.1;
    movesScore.S -= 0.1;
    movesScore.L -= 0.1;
  } else if (move === 'P') {
    movesScore.S += 0.1;
    movesScore.L += 0.1;
    movesScore.R -= 0.1;
    movesScore.K -= 0.1;
  } else if (move === 'S') {
    movesScore.R += 0.1;
    movesScore.K += 0.1;
    movesScore.P -= 0.1;
    movesScore.L -= 0.1;
  } else if (move === 'L') {
    movesScore.R += 0.1;
    movesScore.S += 0.1;
    movesScore.P -= 0.1;
    movesScore.K -= 0.1;
  } else if (move === 'K') {
    movesScore.P += 0.1;
    movesScore.L += 0.1;
    movesScore.R -= 0.1;
    movesScore.S -= 0.1;
  }
}

// Get computer move
function getHouseMove() {
  // Generate random number between 0 and 4
  const randomMove = Math.floor(Math.random() * 5);
  // If it's the first round, do random move based on random number above
  if (playerMoves.length === 0) return movesList[randomMove];
  // Until round 4, update scores then do random move
  if (playerMoves.length < 3) {
    updateScores(playerMoves[playerMoves.length - 1]);
    return movesList[randomMove];
  }
  // Starting from round 4, plays move based on scores
  updateScores(playerMoves[playerMoves.length - 1]);
  const index =
    Math.random() *
    (Math.exp(movesScore.R) +
      Math.exp(movesScore.P) +
      Math.exp(movesScore.S) +
      Math.exp(movesScore.L) +
      Math.exp(movesScore.K));
  if (index < Math.exp(movesScore.R)) return 'R';
  if (index < Math.exp(movesScore.R) + Math.exp(movesScore.P)) return 'P';
  if (
    index <
    Math.exp(movesScore.R) + Math.exp(movesScore.P) + Math.exp(movesScore.S)
  )
    return 'S';
  if (
    index <
    Math.exp(movesScore.R) +
      Math.exp(movesScore.P) +
      Math.exp(movesScore.S) +
      Math.exp(movesScore.L)
  )
    return 'L';
  return 'K';
}

// Check result
function checkResult(playerMove, houseMove) {
  playerMoves.push(playerMove);
  if (playerMove === 'R' && houseMove === 'R') return 'D';
  if (playerMove === 'R' && houseMove === 'S') return 'W';
  if (playerMove === 'R' && houseMove === 'L') return 'W';
  if (playerMove === 'P' && houseMove === 'R') return 'W';
  if (playerMove === 'P' && houseMove === 'P') return 'D';
  if (playerMove === 'P' && houseMove === 'K') return 'W';
  if (playerMove === 'S' && houseMove === 'P') return 'W';
  if (playerMove === 'S' && houseMove === 'S') return 'D';
  if (playerMove === 'S' && houseMove === 'L') return 'W';
  if (playerMove === 'L' && houseMove === 'P') return 'W';
  if (playerMove === 'L' && houseMove === 'L') return 'D';
  if (playerMove === 'L' && houseMove === 'K') return 'W';
  if (playerMove === 'K' && houseMove === 'R') return 'W';
  if (playerMove === 'K' && houseMove === 'S') return 'W';
  if (playerMove === 'K' && houseMove === 'K') return 'D';
  return 'L';
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
  } else if (mainSection.style.display === 'none') {
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
  if (roundResult !== 'D') {
    await sleep(100);
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

// Start round passing clicked button as chosen move
function roundStart() {
  animateMiddleSection();
  const playerMove = this.id;
  setPlayerMove(playerMove);
  const houseMove = getHouseMove();
  setHouseMove(houseMove);
  setTimeout(function () {
    animateHouseMove();
  }, 1500);
  const roundResult = checkResult(playerMove, houseMove);
  if (roundResult === 'D') {
    gameResult.innerText = 'draw';
  } else if (roundResult === 'L') {
    score -= 1;
    gameResult.innerText = 'you lose';
  } else {
    score += 1;
    gameResult.innerText = 'you win';
  }
  setTimeout(function () {
    animateResult(roundResult);
  }, 2000);
}

// Event listener for each of the moves buttons
movesButtons.forEach(function (button) {
  button.addEventListener('click', roundStart);
});

// Event listener for play again button
playAgain.addEventListener('click', function () {
  resetGame();
  animateMiddleSection();
});
