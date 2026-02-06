const PLAYFIELD_COLUMNS = 10;
const PLAYFIELD_ROWS = 20;
const TETROMINO_NAMES = ["O", "I", "S", "Z", "L", "J", "T"];
const TETROMINOES = {
  O: [
    [1, 1],
    [1, 1],
  ],
  I: [
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  S: [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0],
  ],
  Z: [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0],
  ],
  L: [
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 1],
  ],
  J: [
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
  T: [
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
};
let tetromino = {
  name: "",
  matrix: [],
  column: 0,
  row: 0,
};
let playfield;

// Common functions
function convertPositionToIndex(row, col) {
  return row * PLAYFIELD_COLUMNS + col;
}
function randomFigure(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

// Generate functions
function generateTetromino() {
  const nameTetro = randomFigure(TETROMINO_NAMES);
  const matrix = TETROMINOES[nameTetro];

  const columnTetro = Math.floor(PLAYFIELD_COLUMNS / 2 - matrix.length / 2);
  const rowTetro = 5;

  tetromino = {
    name: nameTetro,
    matrix: matrix,
    column: columnTetro,
    row: rowTetro,
  };
}

function generatePlayfield() {
  for (let i = 0; i < PLAYFIELD_ROWS * PLAYFIELD_COLUMNS; i++) {
    const div = document.createElement("div");
    document.querySelector(".tetris").append(div);
  }
  playfield = new Array(PLAYFIELD_ROWS)
    .fill()
    .map(() => new Array(PLAYFIELD_COLUMNS).fill(0));
  console.table(playfield);
}

// Keyboard functions

document.addEventListener("keydown", handleKeyDown);

function handleKeyDown(event) {
  if (event.key === "ArrowLeft") {
    moveLeft();
    // drawMove();
    // console.log("Left");
  } else if (event.key === "ArrowRight") {
    moveRight();
    // drawMove();
    // console.log("Right");
  } else if (event.key === "ArrowDown") {
    moveDown();
    // drawMove();
    console.log("Down");
    //   }
    // else if (event.key === "ArrowUp") {
    //     tetromino.row--;
    //     if (isOutsideOfPlayfield(tetromino.row, tetromino.column)) {
    //       tetromino.row++;
    //     }
    // drawMove();
    console.log("Up");
  }
  drawMove();
}

function moveLeft() {
  tetromino.column--;
  if (!isValid()) {
    tetromino.column++;
  }
}
function moveRight() {
  tetromino.column++;
  if (!isValid()) {
    tetromino.column--;
  }
}
function moveDown() {
  tetromino.row++;
  if (!isValid()) {
    tetromino.row--;
    newFigure();
  }
}

function drawMove() {
  cells.forEach((el) => el.removeAttribute("class"));
  drawPlayfield();
  drawTetromino();
}

// Collision functions

function isValid() {
  const matrixSize = tetromino.matrix.length;
  for (let row = 0; row < matrixSize; row++) {
    for (let column = 0; column < matrixSize; column++) {
      if (isOutsideOfPlayfield(row, column)) {
        return false;
      }
    }
  }
  return true;
}

function isOutsideOfPlayfield(row, column) {
  return (
    tetromino.matrix[row][column] &&
    (tetromino.row + row >= PLAYFIELD_ROWS ||
      tetromino.column + column < 0 ||
      tetromino.column + column >= PLAYFIELD_COLUMNS)
  );
}

// function isOutsideOfPlayfield(row, column) {
//   return (
//     column < 0 ||
//     column > PLAYFIELD_COLUMNS - tetromino.matrix.length ||
//     row < 0 ||
//     row > PLAYFIELD_ROWS - tetromino.matrix.length
//   );
// }
// Draw functions
function drawPlayfield() {
  //   playfield[4][3] = "O";
  for (let row = 0; row < PLAYFIELD_ROWS; row++) {
    for (let col = 0; col < PLAYFIELD_COLUMNS; col++) {
      if (!playfield[row][col]) continue;
      const nameFigure = tetromino.name;
      const cellIndex = convertPositionToIndex(row, col);

      cells[cellIndex].classList.add(nameFigure);
    }
  }
}
function drawTetromino() {
  const name = tetromino.name;
  const tetrominoMatrixSize = tetromino.matrix.length;

  for (let row = 0; row < tetrominoMatrixSize; row++) {
    for (let column = 0; column < tetrominoMatrixSize; column++) {
      if (!tetromino.matrix[row][column]) continue;
      const cellIndex = convertPositionToIndex(
        tetromino.row + row,
        tetromino.column + column
      );
      cells[cellIndex].classList.add(name);
    }
  }
}

function newFigure() {
  const tetrominoMatrixSize = tetromino.matrix.length;
  for (let row = 0; row < tetrominoMatrixSize; row++) {
    for (let column = 0; column < tetrominoMatrixSize; column++) {
      if (tetromino.matrix[row][column]) {
        playfield[tetromino.row + row][tetromino.column + column] =
          tetromino.name;
      }
    }
  }
  generateTetromino();
}

generatePlayfield();
let cells = document.querySelectorAll(".tetris div");
generateTetromino();
drawPlayfield();
drawTetromino();
drawMove();
