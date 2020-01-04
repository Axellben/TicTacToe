const boardUI = document.querySelector("#board");

let board;
const rows = 3,
  cols = 3;

let players = ["X", "O"];
let currentPlayer;
let gameOver = false;

InitGame();

function InitBoard(rows, cols) {
  board = new Array(rows);
  for (let i = 0; i < rows; ++i) {
    board[i] = new Array(cols);
    for (let j = 0; j < cols; ++j) {
      board[i][j] = "";
    }
  }

  for (let i = 0; i < rows; ++i) {
    let row = boardUI.insertRow(-1);
    for (let j = 0; j < cols; ++j) {
      let cell = row.insertCell(-1);
      if (i < rows - 1 && j < cols) cell.classList.add("horizontal");
      if (i < rows && j > 0 && j < cols - 1) cell.classList.add("vertical");

      cell.addEventListener("click", function handler() {
        let mark = players[currentPlayer];
        currentPlayer = Number(!currentPlayer);

        this.innerHTML = mark;
        board[i][j] = mark;

        let winner = CheckWinner();

        if (winner == "X") {
          console.log("X");
          gameOver = true;
        } else if (winner == "O") {
          console.log("O");
          gameOver = true;
        }
        this.removeEventListener("click", handler, false);
      });
    }
  }
}

function CheckWinner() {
  //Check every row
  for (let i = 0; i < rows; ++i) {
    let mark = board[i][0];
    let winner = true;
    if (mark != "") {
      for (let j = 0; j < cols; ++j) {
        if (mark != board[i][j]) {
          winner = false;
          break;
        }
      }
      if (winner) return mark;
    }
  }

  //Check every column
  for (let i = 0; i < rows; ++i) {
    let mark = board[0][i];
    let winner = true;
    if (mark != "") {
      for (let j = 0; j < cols; ++j) {
        if (mark != board[j][i]) {
          winner = false;
          break;
        }
      }
      if (winner) return mark;
    }
  }

  //Check the main diagonals
  if (board[0][0] != "") {
    let winner = true;
    let mark = board[0][0];
    for (let i = 0; i < rows; ++i) {
      if (board[i][i] != mark) {
        winner = false;
        break;
      }
    }
    if (winner) return mark;
  }

  // //Check the second diagonal
  // console.log(board[cols - 1][cols - 1]);

  if (board[0][cols - 1] != "") {
    let winner = true;
    let mark = board[0][cols - 1];
    for (let i = 0; i < rows; ++i) {
      // console.log(board[cols - i - 1][cols - i - 1]);
      if (board[i][cols - i - 1] != mark) {
        winner = false;
        break;
      }
    }
    if (winner) return mark;
  }
  return "";
}

function InitGame() {
  InitBoard(rows, cols);
  currentPlayer = Math.floor(Math.random() * 2);
}
