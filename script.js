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
const youWinCountEl = document.getElementById("you-count");
let youWinCount = 0;
const aiWinCountEl = document.getElementById("ai-count");
let aiWinCount = 0;
const playingVs = document.getElementById("opponent");
const winnerYou = document.getElementById("winner-you");
const winnerAi = document.getElementById("winner-ai");
let marker;
let players = ["Your", "AI", "X", "O"];
let currentPlayer;
let isGameStart = false;
let isGameRunning = false;
let isGameOver = true;
let isAiPlaying = false;
let hasWinner = false;
let cellsFilled;
let isOpponentFriend = false;
let PLAYER;

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

function selectOpponent() {
  if (playingVs.value === "friend") {
    isOpponentFriend = true;
    winnerYou.textContent = "X";
    winnerAi.textContent = "O";
  } else {
    isOpponentFriend = false;
    winnerYou.textContent = "You";
    winnerAi.textContent = "AI";
  }
}

cellsEl.forEach((cellEl, index) => {
  cellEl.addEventListener("click", () => {
    if (isGameStart && isGameRunning && !cellEl.textContent) {
      const row = cellRows[index];
      const col = cellCols[cellEl.id];

      cellEl.textContent = marker;
      placeMark(row, col, marker);

      if (!hasWinner && !isOpponentFriend) {
        setTimeout(computerMove, 1200);
      }
    } else {
      if (!hasWinner && !isGameStart) {
        statusMsg.textContent = "";
        errorMsg.textContent = "Start game first!";
      } else if (!hasWinner && !isGameRunning && !isAiPlaying) {
        statusMsg.textContent = "";
        errorMsg.textContent = "Select your mark!";
      } else if (hasWinner) {
        errorMsg.textContent = "Start new game!";
      }
    }
  });
});

function placeMark(row, col, input) {
  if (board[row][col] === null) {
    // board[row].splice(col, 1, input);
    board[row][col] = input;

    PLAYER = currentPlayer;
    switchPlayer(input);
    checkWinner(board, input);
  }
}

function computerMove() {
  const randomCellID = Math.floor(Math.random() * 9);
  const randomCell = document.getElementById(randomCellID);
  const row = cellRows[randomCellID];
  const col = cellCols[randomCellID];

  if (board[row][col] === null && !randomCell.textContent) {
    randomCell.textContent = marker;
    placeMark(row, col, marker);
  } else {
    computerMove();
  }
}

function switchPlayer(mark) {
  mark === "X" ? (marker = "O") : (marker = "X");

  if (!isOpponentFriend) {
    currentPlayer === players[0]
      ? (currentPlayer = players[1])
      : (currentPlayer = players[0]);
  } else {
    currentPlayer === players[2]
      ? (currentPlayer = players[3])
      : (currentPlayer = players[2]);
  }

  highlightPlayer();

  return currentPlayer;
}

function highlightPlayer() {
  selectPlayerMsg.style.opacity = "0";
  statusMsg.style.opacity = "1";
  errorMsg.textContent = "";
  statusMsg.textContent =
    currentPlayer === "Your"
      ? `${currentPlayer} turn!`
      : `${currentPlayer}'s turn!`;
  statusMsg.style.color = "blue";
  statusMsg.style.fontSize = "1.8rem";

  if (marker === xBtn.textContent) {
    setBtnColor(xBtn, "blue");
    setBtnColor(oBtn, "black");
  } else if (marker === oBtn.textContent) {
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
      if (!isOpponentFriend) {
        if (currentPlayer === players[1]) {
          statusMsg.style.color = "green";
          statusMsg.textContent = "Congrats! You won!";
          youWinCount++;
          youWinCountEl.textContent = youWinCount;
        } else {
          statusMsg.style.color = "red";
          statusMsg.textContent = "You lost! Play again?";
          aiWinCount++;
          aiWinCountEl.textContent = aiWinCount;
        }
      } else {
        statusMsg.style.color = "green";
        statusMsg.textContent = `Congrats! ${PLAYER} won!`;
        if (currentPlayer === players[3]) {
          youWinCount++;
          youWinCountEl.textContent = youWinCount;
        } else {
          aiWinCount++;
          aiWinCountEl.textContent = aiWinCount;
        }
      }
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

  marker = "";
  // currentPlayer = "";
  statusMsg.style.opacity = "1";
  statusMsg.textContent = "Ready?";
  statusMsg.style.color = "green";
  setBtnColor(oBtn, "black");
  setBtnColor(xBtn, "black");
  isGameOver = true;
  isGameRunning = false;
  isGameStart = false;
  isAiPlaying = false;
  hasWinner = false;
  startBtn.removeAttribute("disabled");
  xBtn.classList.remove("hover-effect");
  oBtn.classList.remove("hover-effect");
}

startBtn.addEventListener("click", initiateBoard);
resetBtn.addEventListener("click", resetBoard);

playingVs.addEventListener("change", () => {
  resetBoard();
  youWinCount = 0;
  aiWinCount = 0;
  youWinCountEl.textContent = youWinCount;
  aiWinCountEl.textContent = aiWinCount;
  selectOpponent();
});

xBtn.addEventListener("click", () => {
  if (isGameStart && !isGameRunning) {
    xBtn.classList.remove("hover-effect");
    oBtn.classList.remove("hover-effect");
    marker = xBtn.textContent;
    isGameRunning = true;

    if (!isOpponentFriend) {
      currentPlayer = players[0];
    } else {
      currentPlayer = players[2];
    }

    highlightPlayer();
  }
});

oBtn.addEventListener("click", () => {
  if (isGameStart && !isGameRunning) {
    oBtn.classList.remove("hover-effect");
    xBtn.classList.remove("hover-effect");

    if (!isOpponentFriend) {
      marker = xBtn.textContent;
      currentPlayer = players[1];
      isAiPlaying = true;
      setTimeout(computerMove, 1000);
      setTimeout(() => (isGameRunning = true), 1100);
      highlightPlayer();
    } else {
      marker = xBtn.textContent;
      currentPlayer = players[2];
      isGameRunning = true;
      highlightPlayer();
      statusMsg.textContent = "X's turn, X goes first!";
      statusMsg.style.fontSize = "1.4rem";
    }
  }
});
