const grid = document.querySelector("#grid");
const startStopButton = document.querySelector(".start-stop-button");
const randomButton = document.querySelector(".random-button");
const widthButton = document.querySelector(".width");

let gridWidth = parseInt(widthButton.getAttribute("value"));
const gridHeight = 20;
let gameGrid = [];
const cellWidth = 20;
const cellHeight = 20;

widthButton.addEventListener("change", (event) => {
  widthButton.setAttribute("value", event.target.value);
  gridWidth = parseInt(event.target.value);
});

grid.style.width = `${gridWidth * cellWidth}px`;

console.log("gridWidth", gridWidth);
console.log("cellWidth", cellWidth);

let startGame = false;

startStopButton.addEventListener("click", () => {
  if (startGame) {
    window.clearInterval(startGame);
    startGame = false;
    startStopButton.innerHTML = "Start";
    startStopButton.style.backgroundColor = "#4caf50";
  } else {
    startGame = window.setInterval(updateGrid, 100);
    startStopButton.innerHTML = "Stop";
    startStopButton.style.backgroundColor = "#f44336";
  }
  console.log("startGame", startGame);
});

// function to create grid
const createGrid = () => {
  grid.innerHTML = "";
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
      // cell.setAttribute("row", row);
      // cell.id = `${row}-${column}`;
      cell.style.width = `${cellWidth}px`;
      cell.style.height = `${cellHeight}px`;
      grid.appendChild(cell);
    }
  }
};

randomButton.addEventListener("click", renderRandomGrid);

const countAliveNeighbors = (board, row, col) => {
  let count = 0;
  for (let i = row - 1; i <= row + 1; i++) {
    if (i >= 0 && i < gridWidth) {
      for (let j = col - 1; j <= col + 1; j++) {
        if (j >= 0 && j < gridHeight) {
          if (i != row || j != col) {
            count += board[i][j] == 1 ? 1 : 0;
          }
        }
      }
    }
  }
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
      // cell.setAttribute("row", row);
      // cell.id = `${row}-${column}`;
      cell.style.width = `${cellWidth}px`;
      cell.style.height = `${cellHeight}px`;
      grid.appendChild(cell);
    }
  }
};
document.body.addEventListener("click", () => {
  updateGrid();
});
