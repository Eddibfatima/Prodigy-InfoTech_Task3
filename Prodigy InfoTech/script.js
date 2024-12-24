let timerDisplay = document.getElementById('timer');
let startBtn = document.getElementById('start-btn');
let pauseBtn = document.getElementById('pause-btn');
let resetBtn = document.getElementById('reset-btn');
let lapBtn = document.getElementById('lap-btn');
let lapsContainer = document.getElementById('laps');

let interval;
let elapsedTime = 0;
let running = false;
// script.js

const cells = document.querySelectorAll('[data-cell]');
const winnerMessage = document.getElementById('winner-message');
const restartButton = document.getElementById('restart-button');
let isXTurn = true; // X starts the game
let board = Array(9).fill(null);

// Winning combinations
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// Handle cell clicks
cells.forEach((cell, index) => {
  cell.addEventListener('click', () => handleClick(cell, index), { once: true });
});

function handleClick(cell, index) {
  const currentPlayer = isXTurn ? 'X' : 'O';
  cell.textContent = currentPlayer;
  board[index] = currentPlayer;
  cell.classList.add('taken');

  if (checkWin(currentPlayer)) {
    winnerMessage.textContent = `${currentPlayer} Wins!`;
    endGame();
  } else if (board.every(cell => cell)) {
    winnerMessage.textContent = "It's a Draw!";
    endGame();
  } else {
    isXTurn = !isXTurn;
  }
}

// Check for a win
function checkWin(currentPlayer) {
  return WINNING_COMBINATIONS.some(combination =>
    combination.every(index => board[index] === currentPlayer)
  );
}

// End game
function endGame() {
  cells.forEach(cell => cell.removeEventListener('click', handleClick));
}

// Restart game
restartButton.addEventListener('click', () => {
  board.fill(null);
  isXTurn = true;
  winnerMessage.textContent = '';
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('taken');
    cell.addEventListener('click', () => handleClick(cell), { once: true });
  });
});


  