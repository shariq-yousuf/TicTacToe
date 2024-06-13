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
  if (player === "X") {
    currentPlayer = "O";
  } else if (player === "O") {
    currentPlayer = "X";
  }
}

function resetBoard() {
  board = [];
  initiateBoard();
}

placeMark(0, 2, currentPlayer);
placeMark(0, 0, currentPlayer);
placeMark(2, 0, currentPlayer);
placeMark(1, 1, currentPlayer);
placeMark(2, 2, currentPlayer);
placeMark(1, 2, currentPlayer);
placeMark(2, 1, currentPlayer);
console.log(board);

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

// resetBoard();
// console.log(checkWinner(board, "X"));
// console.log(showResult("X"));
