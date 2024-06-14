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
const errorMsg = document.getElementById("error-msg");
const headMsg = document.getElementById("head-msg");
let currentPlayer;
let isGameStart = false;
let isGameRunning = false;
let isGameOver = true;
let hasWinner = false;
let cellsFilled;

function initiateBoard() {
  isGameStart = true;
  isGameOver = false;
  cellsFilled = 0;

  for (let i = 0; i < 3; i++) {
    board.push([null, null, null]);
  }

  selectPlayerMsg.style.opacity = "1";
  statusMsg.style.opacity = "0";
  errorMsg.textContent = "";
  startBtn.setAttribute("disabled", "disabled");
  xBtn.classList.add("hover-effect");
  oBtn.classList.add("hover-effect");
}

cellsEl.forEach((cellEl, index) => {
  cellEl.addEventListener("click", () => {
    if (isGameStart && isGameRunning && !cellEl.textContent) {
      const row = cellRows[index];
      const col = cellCols[cellEl.id];

      cellEl.textContent = currentPlayer;
      placeMark(row, col, currentPlayer);
    } else {
      if (!hasWinner && !isGameStart) {
        statusMsg.textContent = "";
        errorMsg.textContent = "Start game first!";
      } else if (!hasWinner && !isGameRunning) {
        statusMsg.textContent = "";
        errorMsg.textContent = "Select your mark!";
      } else {
        errorMsg.textContent = "Start new game!";
      }
    }
  });
});

function placeMark(row, col, input) {
  if (board[row][col] === null) {
    board[row].splice(col, 1, input);

    switchPlayer(input);
    checkWinner(board, input);
  }
}

function switchPlayer(player) {
  player === "X" ? (currentPlayer = "O") : (currentPlayer = "X");
  highlightPlayer();
}

function highlightPlayer() {
  selectPlayerMsg.style.opacity = "0";
  statusMsg.style.opacity = "1";
  errorMsg.textContent = "";

  if (currentPlayer === xBtn.textContent) {
    statusMsg.textContent = `${currentPlayer}'s turn!`;
    setBtnColor(xBtn, "blue");
    setBtnColor(oBtn, "black");
  } else if (currentPlayer === oBtn.textContent) {
    statusMsg.textContent = `${currentPlayer}'s turn!`;
    setBtnColor(oBtn, "blue");
    setBtnColor(xBtn, "black");
  }
}

function setBtnColor(btn, color) {
  btn.style.color = color;
  btn.style.borderColor = color;
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
      isGameRunning = false;
      isGameStart = false;
      statusMsg.textContent = `Congrats! Nice win, ${mark}!`;
      hasWinner = true;
      restartGame();
      return true;
    }
  }

  if (cellsFilled === 9) {
    isGameOver = true;
    isGameRunning = false;
    isGameStart = false;
    statusMsg.textContent = "It's a draw! Play again?";
    restartGame();
    return false;
  }
}

function restartGame() {
  setBtnColor(xBtn, "black");
  setBtnColor(oBtn, "black");
  startBtn.textContent = "New Game";
  startBtn.removeAttribute("disabled");
  startBtn.addEventListener("click", () => {
    resetBoard();
    initiateBoard();
  });
}

function resetBoard() {
  board = [];
  initiateBoard();
  selectPlayerMsg.style.opacity = "0";

  for (const cellEl of cellsEl) {
    cellEl.textContent = "";
  }

  currentPlayer = "";
  statusMsg.style.opacity = "1";
  statusMsg.textContent = "Ready?";
  setBtnColor(oBtn, "black");
  setBtnColor(xBtn, "black");
  isGameOver = true;
  isGameRunning = false;
  isGameStart = false;
  hasWinner = false;
  startBtn.removeAttribute("disabled");
  xBtn.classList.remove("hover-effect");
  oBtn.classList.remove("hover-effect");
}

startBtn.addEventListener("click", initiateBoard);
resetBtn.addEventListener("click", resetBoard);
xBtn.addEventListener("click", () => {
  if (isGameStart && !isGameRunning) {
    xBtn.classList.remove("hover-effect");
    oBtn.classList.remove("hover-effect");
    currentPlayer = xBtn.textContent;
    isGameRunning = true;
    highlightPlayer();
  }
});
oBtn.addEventListener("click", () => {
  if (isGameStart && !isGameRunning) {
    oBtn.classList.remove("hover-effect");
    xBtn.classList.remove("hover-effect");
    currentPlayer = oBtn.textContent;
    isGameRunning = true;
    highlightPlayer();
  }
});
