// const chooseXorO = document.getElementById("choose-XorO");

let board = [];

function initiateBoard() {
  for (let i = 0; i < 3; i++) {
    board.push([null, null, null]);
  }
}
initiateBoard();

function placeMark(row, col, input) {
  board[row].splice(col, 1, input);
}

function resetBoard() {
  board = [];
  initiateBoard();
}

placeMark(0, 2, "X");
placeMark(1, 1, "X");
placeMark(2, 0, "X");
console.log(board);

function checkWinner(board, mark) {
  for (const row of board) {
    if (row[0] === mark && row[1] === mark && row[2] === mark) {
      return true;
    }
  }
  if (
    (board[0][0] === mark && board[1][0] === mark && board[2][0] === mark) ||
    (board[0][1] === mark && board[1][1] === mark && board[2][1] === mark) ||
    (board[0][2] === mark && board[1][2] === mark && board[2][2] === mark) ||
    (board[0][0] === mark && board[1][1] === mark && board[2][2] === mark) ||
    (board[0][2] === mark && board[1][1] === mark && board[2][0] === mark)
  ) {
    return true;
  } else {
    return false;
  }
}
resetBoard();
console.log(checkWinner(board, "X"));
