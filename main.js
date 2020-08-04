// Necessary sleep function for delaying code execution
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Global variable for keeping score
let score = 0;

// Moves array
const movesList = ['R', 'P', 'SC', 'L', 'S'];

// Player moves array
const playerMoves = [];

// Player moves probabilities
const movesScore = {
  R: 0,
  P: 0,
  SC: 0,
  L: 0,
  S: 0,
};

// Rules box DOM variables
let rulesButton = document.querySelector('.rules-button');
let closeButton = document.querySelector('.close-icon');
let rulesBox = document.querySelector('.rules-background');

// Game buttons DOM variables
let movesButtons = document.querySelectorAll('.moves-button');
let playAgain = document.querySelector('.play-button');

// Middle section DOM variables
let mainSection = document.querySelector('#middle-section-main');
let gameSection = document.querySelector('#middle-section-game');

// Game icons DOM variables
let house = document.querySelector('.game-div-house');
let houseIcon = document.querySelector('#house-move');
let player = document.querySelector('.game-div-player');
let playerIcon = document.querySelector('#player-move');

// Result and score DOM variables
let result = document.querySelector('.result-container');
let scoreValue = document.querySelector('.score-value');
let gameResult = document.querySelector('.result-text');

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
  playerMove = this.id;
  setPlayerMove(playerMove);
  let houseMove = getHouseMove();
  setHouseMove(houseMove);
  setTimeout(function () {
    animateHouseMove();
  }, 2000);
  let roundResult = checkResult(playerMove, houseMove);
  if (roundResult === 'D') {
    gameResult.innerText = 'draw';
  } else if (roundResult === 'L') {
    score--;
    gameResult.innerText = 'you lose';
  } else {
    score++;
    gameResult.innerText = 'you win';
  }
  setTimeout(function () {
    animateResult(roundResult);
  }, 3000);
  playerMoves.push(playerMove);
}

// Get computer move
function getHouseMove() {
  // Generate random number between 0 and 4
  let randomMove = Math.floor(Math.random() * 5);
  // If it's the first round, do random move based on random number above
  if (playerMoves.length === 0) return movesList[randomMove];
  // Until round 4, update scores then do random move
  else if (playerMoves.length < 3) {
    updateScores(playerMoves[playerMoves.length - 1]);
    return movesList[randomMove];
    // Starting from round 4, plays move with the highest score
  } else {
    updateScores(playerMoves[playerMoves.length - 1]);
    let index =
      Math.random() *
      (Math.exp(movesScore.R) +
        Math.exp(movesScore.P) +
        Math.exp(movesScore.SC) +
        Math.exp(movesScore.L) +
        Math.exp(movesScore.S));
    if (index < Math.exp(movesScore.R)) return 'R';
    else if (index < Math.exp(movesScore.R) + Math.exp(movesScore.P))
      return 'P';
    else if (
      index <
      Math.exp(movesScore.R) + Math.exp(movesScore.P) + Math.exp(movesScore.SC)
    )
      return 'SC';
    else if (
      index <
      Math.exp(movesScore.R) +
        Math.exp(movesScore.P) +
        Math.exp(movesScore.SC) +
        Math.exp(movesScore.L)
    )
      return 'L';
    else if (
      index <
      Math.exp(movesScore.R) +
        Math.exp(movesScore.P) +
        Math.exp(movesScore.SC) +
        Math.exp(movesScore.L) +
        Math.exp(movesScore.S)
    )
      return 'S';
    else return movesList[randomMove];
  }
}

// Update moves scores based on player last move
function updateScores(move) {
  movesScore.R *= 0.95;
  movesScore.P *= 0.95;
  movesScore.SC *= 0.95;
  movesScore.L *= 0.95;
  movesScore.S *= 0.95;
  if (move === 'R') {
    movesScore.P += 0.1;
    movesScore.S += 0.1;
    movesScore.SC -= 0.1;
    movesScore.L -= 0.1;
  } else if (move === 'P') {
    movesScore.SC += 0.1;
    movesScore.L += 0.1;
    movesScore.R -= 0.1;
    movesScore.S -= 0.1;
  } else if (move === 'S') {
    movesScore.R += 0.1;
    movesScore.S += 0.1;
    movesScore.P -= 0.1;
    movesScore.L -= 0.1;
  } else if (move === 'L') {
    movesScore.R += 0.1;
    movesScore.SC += 0.1;
    movesScore.P -= 0.1;
    movesScore.S -= 0.1;
  } else if (move === 'S') {
    movesScore.P += 0.1;
    movesScore.L += 0.1;
    movesScore.R -= 0.1;
    movesScore.SC -= 0.1;
  }
}

// Check result
function checkResult(playerMove, houseMove) {
  if (playerMove === 'R' && houseMove === 'R') return 'D';
  else if (playerMove === 'R' && houseMove === 'SC') return 'W';
  else if (playerMove === 'R' && houseMove === 'L') return 'W';
  else if (playerMove === 'P' && houseMove === 'R') return 'W';
  else if (playerMove === 'P' && houseMove === 'P') return 'D';
  else if (playerMove === 'P' && houseMove === 'S') return 'W';
  else if (playerMove === 'SC' && houseMove === 'P') return 'W';
  else if (playerMove === 'SC' && houseMove === 'SC') return 'D';
  else if (playerMove === 'SC' && houseMove === 'L') return 'W';
  else if (playerMove === 'L' && houseMove === 'P') return 'W';
  else if (playerMove === 'L' && houseMove === 'L') return 'D';
  else if (playerMove === 'L' && houseMove === 'S') return 'W';
  else if (playerMove === 'S' && houseMove === 'R') return 'W';
  else if (playerMove === 'S' && houseMove === 'SC') return 'W';
  else if (playerMove === 'S' && houseMove === 'S') return 'D';
  else return 'L';
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
