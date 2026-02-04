const PLAYFIELD_COLUMNS = 10;
const PLAYFIELD_ROWS = 20;
const TETROMINO_NAMES = ["O", "I", "S", "Z", "L", "J", "T"];
const TETROMINOES = {
  O: [
    [1, 1],
    [1, 1],
  ],
};
let tetromino = {
  name: "",
  matrix: [],
  column: 0,
  row: 0,
};
let playfield;

function generateTetromino() {
  const nameTetro = TETROMINO_NAMES[0];
  const matrix = TETROMINOES[0];

  const columnTetro = 4;
  const rowTetro = 5;

  tetromino = {
    name: nameTetro,
    matrix: matrix,
    column: columnTetro,
    row: rowTetro,
  };
}
function drawPlayfield() {
  playfield[4][3] = "O";
  for (let row = 0; row < PLAYFIELD_ROWS; row++) {
    for (let col = 0; col < PLAYFIELD_COLUMNS; col++) {
      if (!playfield[row][col]) continue;
      const nameFigure = "T";
      const cellIndex = convertPositionToIndex(row, col);

      cells[cellIndex].classList.add(nameFigure);
    }
  }
}

function convertPositionToIndex(row, col) {
  return row * PLAYFIELD_COLUMNS + col;
}
// function drawTetromino() {
//   const name = tetromino.name;
//   const tetrominoMatrixSize = tetromino.matrix.length;

//   for(let row=0;row<tetrominoMatrixSize;row++){
//     for(let)
//   }
// }

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

generatePlayfield();
let cells = document.querySelectorAll(".tetris div");
generateTetromino();
drawPlayfield();
