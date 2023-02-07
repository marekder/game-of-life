const grid = document.querySelector("#grid");
const startStopButton = document.querySelector(".start-stop-button");
const randomButton = document.querySelector(".random-button");
const gridWidth = 20;
const gridHeight = 20;
let gameGrid = [];
const cellWidth = 20;
const cellHeight = 20;
grid.style.width = `${gridWidth * cellWidth}px`;

let startGame = true;

// function for start/stop button on click
let startStopGame = startStopButton.addEventListener("click", () => {
  if (!startGame) {
    startStopButton.innerText = "Start";
    startStopButton.style.backgroundColor = "#4caf50";
    startGame = !startGame;
  } else {
    startStopButton.innerText = "Stop";
    startStopButton.style.backgroundColor = "#f44336";
    startGame = !startGame;
    updateGrid();
  }
});

// function to create grid
const createGrid = () => {
  for (let row = 0; row < gridWidth; row++) {
    gameGrid[row] = [];
    for (let col = 0; col < gridHeight; col++) {
      gameGrid[row][col] = 0;
    }
  }
};

const renderRandomGrid = () => {
  createGrid();
  for (let row = 0; row < gridWidth; row++) {
    for (let column = 0; column < gridHeight; column++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      if (Math.random() > 0.7) {
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

randomButton.addEventListener("click", renderRandomGrid);

// function to render grid
// const renderGrid = () => {
//   createGrid();
//   console.log("gameGrid", gameGrid);
//   updateGrid();
// };

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
  console.log("newGrid", newGrid);

  renderNewGrid(newGrid);
};

const renderNewGrid = (nextGrid) => {
  grid.innerHTML = "";
  for (let row = 0; row < gridWidth; row++) {
    for (let column = 0; column < gridHeight; column++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      if (nextGrid[row][column] == 1) {
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

document.body.addEventListener("click", () => {
  updateGrid();
});

// startStopButton.addEventListener('click', ()=>{

// })
