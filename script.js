const cells = document.querySelectorAll(".cell");
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
const board = [];
let currentPlayer = "X";
initiateBoard();

function initiateBoard() {
  for (let i = 0; i < 3; i++) {
    board.push([null, null, null]);
  }
}

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

function resetBoard() {
  board = [];
  initiateBoard();
}

function checkWinner(board, mark) {
  const winningConditions = [
    [board[0][0], board[0][1], board[0][2]],
    [board[1][0], board[1][1], board[1][2]],
    [board[2][0], board[2][1], board[2][2]],
    [board[0][0], board[1][0], board[2][0]],
    [board[0][1], board[1][1], board[2][1]],
    [board[0][2], board[1][2], board[2][2]],
    [board[0][0], board[1][1], board[2][2]],
    [board[0][2], board[1][1], board[2][0]],
  ];

  for (const condition of winningConditions) {
    if (
      condition[0] === mark &&
      condition[1] === mark &&
      condition[2] === mark
    ) {
      showResult(mark);
    }
  }
}

function showResult(mark) {
  console.log(`${mark} is Winner!`);
}

cells.forEach((cell, index) => {
  cell.addEventListener("click", () => {
    const row = cellRows[index];
    const col = cellCols[cell.id];

    placeMark(row, col, currentPlayer);
  });
});
// resetBoard();
// console.log(checkWinner(board, "X"));
// console.log(showResult("X"));
