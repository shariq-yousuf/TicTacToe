// const chooseXorO = document.getElementById("choose-XorO");

const board = [];
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function initiateBoard() {
  for (let i = 0; i < 3; i++) {
    board.push([]);
    board[i].push(null, null, null);
  }
}
initiateBoard();

function placeMarker(row, col, input) {
  board[row].splice(col, 1, input);
}

function resetBoard() {
  initiateBoard();
}

placeMarker(0, 0, "X");
placeMarker(1, 1, "X");
placeMarker(2, 2, "X");
console.log(board);
