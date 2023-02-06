const grid = document.querySelector("#grid");
const startButton = document.querySelector(".start-button");
const stopButton = document.querySelector(".stop-button");
const gridWidth = 10;
const gridHeight = 10;
let gameGrid = [];
const cellWidth = 20;
const cellHeight = 20;
grid.style.width = `${gridWidth * cellWidth}px`;

// function to create grid

const createGrid = () => {
  for (let row = 0; row < gridWidth; row++) {
    gameGrid[row] = [];
    for (let col = 0; col < gridHeight; col++) {
      gameGrid[row][col] = 0;
    }
  }
};

// function to render grid
const renderGrid = () => {
  createGrid();
  for (let row = 0; row < gridWidth; row++) {
    for (let column = 0; column < gridHeight; column++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      if (Math.random() > 0.5) {
        cell.classList.add("alive");
        cell.setAttribute("value", 1);
        gameGrid[row][column] = 1;
      } else {
        cell.classList.add("dead");
        cell.setAttribute("value", 0);
        gameGrid[row][column] = 0;
      }
      // const randomAlive = Math.random() > 0.5 ? "alive" : "dead";
      // cell.classList.add(randomAlive);
      cell.setAttribute("row", row);
      cell.id = `${row}-${column}`;
      cell.style.width = `${cellWidth}px`;
      cell.style.height = `${cellHeight}px`;
      grid.appendChild(cell);
    }
  }
};

renderGrid();

console.log("gameGrid", gameGrid);
console.log("gridWidth", gridWidth);
console.log("gridHeight", gridHeight);

// function to countAliveNeighbors
const countAliveNeighbors = (board, row, col) => {
  let count = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      if (i === 0 && j === 0) {
        continue;
      }
      const x = row + i;
      const y = col + j;
      if (x >= 0 && x < board.length && y >= 0 && y < board[0].length) {
        count += board[x][y];
      }
    }
  }
  // console.log("count", count);
  return count;
};

const updateGrid = () => {
  let newGrid = [];
  for (let row = 0; row < gridWidth; row++) {
    newGrid[row] = [];
    for (let col = 0; col < gridHeight; col++) {
      let aliveNeighbors = countAliveNeighbors(gameGrid, row, col);
      if (gameGrid[row][col] === 1) {
        if (aliveNeighbors < 2 || aliveNeighbors > 3) {
          newGrid[row][col] = 0;
        } else {
          newGrid[row][col] = 1;
        }
      } else {
        if (aliveNeighbors === 3) {
          newGrid[row][col] = 1;
        } else {
          newGrid[row][col] = 0;
        }
      }
    }
  }
};

updateGrid();
console.log("gameGrid", gameGrid);
