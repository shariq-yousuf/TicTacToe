let board = [];

const cellRows = {
  0: 0,
  1: 0,
  2: 0,
  3: 1,
  4: 1,
  5: 1,
  6: 2,
  7: 2,
  8: 2,
};
const cellCols = {
  0: 0,
  1: 1,
  2: 2,
  3: 0,
  4: 1,
  5: 2,
  6: 0,
  7: 1,
  8: 2,
};

const cellsEl = document.querySelectorAll(".cell");
const startBtn = document.getElementById("start-btn");
const resetBtn = document.getElementById("reset-btn");
const xBtn = document.getElementById("X-btn");
const oBtn = document.getElementById("O-btn");
const selectPlayerMsg = document.getElementById("select-player-msg");
const statusMsg = document.getElementById("status");
let currentPlayer = "X";
let isGameOver = false;
let cellsFilled = 0;

function initiateBoard() {
  for (let i = 0; i < 3; i++) {
    board.push([null, null, null]);
  }

  selectPlayerMsg.style.opacity = "1";
  statusMsg.style.opacity = "0";
}

cellsEl.forEach((cellEl, index) => {
  cellEl.addEventListener("click", () => {
    if (!isGameOver) {
      const row = cellRows[index];
      const col = cellCols[cellEl.id];

      cellEl.textContent = currentPlayer;
      placeMark(row, col, currentPlayer);
    }
  });
});

function placeMark(row, col, input) {
  if (board[row][col] === null) {
    board[row].splice(col, 1, input);

    checkWinner(board, input);
    switchPlayer(input);
  }
}

function switchPlayer(player) {
  player === "X" ? (currentPlayer = "O") : (currentPlayer = "X");
}

function update() {
  const cell = {
    0: board[0][0],
    1: board[0][1],
    2: board[0][2],
    3: board[1][0],
    4: board[1][1],
    5: board[1][2],
    6: board[2][0],
    7: board[2][1],
    8: board[2][2],
  };

  const winningConditions = [
    [cell[0], cell[1], cell[2]],
    [cell[3], cell[4], cell[5]],
    [cell[6], cell[7], cell[8]],
    [cell[0], cell[3], cell[6]],
    [cell[1], cell[4], cell[7]],
    [cell[2], cell[5], cell[8]],
    [cell[0], cell[4], cell[8]],
    [cell[2], cell[4], cell[6]],
  ];

  return { conditions: winningConditions, cells: cell };
}

function checkWinner(board, mark) {
  cellsFilled++;

  for (const condition of update().conditions) {
    if (
      condition[0] === mark &&
      condition[1] === mark &&
      condition[2] === mark
    ) {
      isGameOver = true;
      return console.log(`${mark} is Winner!`);
    }
  }

  if (cellsFilled === 9) {
    return console.log("Draw");
  }
}

function resetBoard() {
  board = [];
  initiateBoard();
  selectPlayerMsg.style.opacity = "0";

  for (const cellEl of cellsEl) {
    cellEl.textContent = "";
  }

  currentPlayer = "X";
  statusMsg.style.opacity = "1";
  statusMsg.textContent = "Ready?";
}

startBtn.addEventListener("click", initiateBoard);
resetBtn.addEventListener("click", resetBoard);
