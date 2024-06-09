let board = [];
initiateBoard();

function initiateBoard() {
  for (let i = 0; i < 3; i++) {
    board.push([null, null, null]);
  }
}

function placeMark(row, col, input) {
  board[row].splice(col, 1, input);
}

function resetBoard() {
  board = [];
  initiateBoard();
}

placeMark(0, 2, "X");
placeMark(0, 0, "O");
placeMark(2, 0, "X");
placeMark(1, 1, "O");
placeMark(2, 2, "X");
placeMark(1, 2, "O");
placeMark(2, 1, "X");
console.log(board);

const checkWinner = (board, mark) => {
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
      return true;
    }
  }

  return false;
};

const showWinner = (mark) => {
  if (checkWinner(board, mark)) {
    return `${mark} is Winner!`;
  }
};

// resetBoard();
console.log(checkWinner(board, "X"));
console.log(showWinner("X"));
