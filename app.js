const boardUI = document.querySelector("#board");
const markBtns = document.querySelectorAll(".markBtn");
const resetBtn = document.querySelector("#restart");

let cells;

let board;
const rows = 3,
  cols = 3;

let human;
let ai;

let currentPlayer;
let gameOver = false;

function InitPlayers() {
  for (let i = 0; i < markBtns.length; ++i) {
    markBtns[i].addEventListener("click", function handler() {
      if (this.textContent == "O") {
        markBtns[0].classList.remove("selected");
        markBtns[1].classList.remove("selected");
        this.classList.add("selected");
        human = "O";
        ai = "X";
        currentPlayer = ai;
        markBtns[0].removeEventListener("click", handler, false);
        markBtns[1].removeEventListener("click", handler, false);
        AiTurn();
      }
    });
  }

  human = "X";
  ai = "O";
  currentPlayer = human;
  console.log("Current Player " + "human");

  resetBtn.addEventListener("click", function() {
    location.reload();
  });
}

function InitUi() {
  for (let i = 0; i < rows; ++i) {
    let row = boardUI.insertRow(-1);
    for (let j = 0; j < cols; ++j) {
      let cell = row.insertCell(-1);
      if (i < rows - 1 && j < cols) cell.classList.add("horizontal");
      if (i < rows && j > 0 && j < cols - 1) cell.classList.add("vertical");
      cell.classList.add("cell");

      cell.addEventListener("click", function handler() {
        // Do until is not Game Over
        if (!gameOver) {
          this.innerHTML = currentPlayer;
          board[i][j] = currentPlayer;

          IsTheGameEnd(CheckWinner());

          if (!gameOver) {
            if (currentPlayer == human) {
              currentPlayer = ai;
              AiTurn();
            } else if (currentPlayer == ai) {
              currentPlayer == human;
              HumanTurn();
            }
          }

          this.removeEventListener("click", handler, false);
        }
      });
    }
  }
}

function InitBoard(rows, cols) {
  board = new Array(rows);
  for (let i = 0; i < rows; ++i) {
    board[i] = new Array(cols);
    for (let j = 0; j < cols; ++j) {
      board[i][j] = "";
    }
  }
}

function IsTheGameEnd(winner) {
  switch (winner) {
    case "X":
      console.log("X");
      gameOver = true;
      break;
    case "O":
      console.log("O");
      gameOver = true;
      break;
    case "tie":
      console.log("tie");
      gameOver = true;
      break;

    default:
      break;
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

  //Check for a tie
  let markSpots = 0;
  for (let i = 0; i < rows; ++i) {
    for (let j = 0; j < cols; ++j) {
      if (board[i][j] != "") markSpots++;
    }
  }

  return markSpots == rows * cols ? "tie" : null;
}

function HumanTurn() {
  console.log("Current Player " + "ai");
  currentPlayer = ai;
}

function AiTurn() {
  let bestScore = -Infinity;
  let bestMove;
  for (let i = 0; i < rows; ++i) {
    for (let j = 0; j < cols; ++j) {
      if (board[i][j] == "") {
        board[i][j] = ai;
        let score = minimax(false);
        board[i][j] = "";
        if (score > bestScore) {
          bestScore = score;
          bestMove = { i, j };
        }
      }
    }
  }
  cells[bestMove.i * cols + bestMove.j].click();
  console.log("Current Player " + "human");
  currentPlayer = human;
}

let scores = {
  X: 1,
  human: -1,
  tie: 0
};

function minimax(isMaximaxing) {
  // Base Case
  let result = CheckWinner();
  if (result != null) {
    if (result == ai) {
      return 1;
    } else if (result == human) {
      return -1;
    }
    return 0;
  }

  if (isMaximaxing) {
    let bestScore = -Infinity;
    for (let i = 0; i < rows; ++i) {
      for (let j = 0; j < cols; ++j) {
        if (board[i][j] == "") {
          board[i][j] = ai;
          let score = minimax(false);
          board[i][j] = "";
          bestScore = Math.max(score, bestScore);
        }
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < rows; ++i) {
      for (let j = 0; j < cols; ++j) {
        if (board[i][j] == "") {
          board[i][j] = human;
          let score = minimax(true);
          board[i][j] = "";
          bestScore = Math.min(score, bestScore);
        }
      }
    }
    return bestScore;
  }
}

function InitGame() {
  InitPlayers();
  InitUi();
  InitBoard(rows, cols);
}

window.addEventListener("DOMContentLoaded", event => {
  InitGame();
  cells = document.querySelectorAll(".cell");
});
