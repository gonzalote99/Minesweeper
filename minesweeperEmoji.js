disableFriendlyErrors = true;


let cvn;


let cols = 10;
let rows = 10;
let numOfCells = rows * cols;
let cellW = 40;
let cellH = 40;
let cells = [];
let sizeError = 7;



const WON = "😄";
const LOST = "😵";
const EMPTY = "🔲";
const MINE = "💣";
const DETONATION = "💥";
const FLAG = "🚩";
const DIGITS = ["⬜️", "1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣"];
const TIMER = "⌛";


document.addEventListener("contextmenu", (event) => event.preventDefault());

let initialMines = 15;
let numberOfMines = initialMines;
let cellCounter = 0;
let minedCells = [];



let flaggedCells = 0;

let startTime = null;

let gameFinished = false;

let newBestTime = false;

function allocateMines() {
  while (numberOfMines > 0) {
    let targetCell = Math.floor(Math.random() * (numOfCells - 1)) + 1;
    if(!minedCells.includes(targetCell)) {
      minedCells.push(targetCell)
      numberOfMines -= 1;
    }
  }
}


function generateCells() {
  for (let i = 0; i < cols; i++) {
    for( let j = 0; j < rows; j ++) {
      let newCell = new Cell(i, j);
      newCell.num = cellCounter;
      cellCounter += 1;

     
      if(minedCells.includes(newCell.num)) {
        newCell.mine = true;
      }
      
      cells.push(newCell);
    }
  }
}


function calculateMines() {
  cells.forEach((c) => {
    let neighbors = getNeighbors(c);
    let reducer = (accumulator, currentValue) => accumulator + currentValue;
    c.minesAround = neighbors.map((n) => n.mine).reduce(reducer);
  });
}


let timePassed = 0;
let stopTimer = false;

const startTimer = () => {
setInterval(() => {
if (stopTimer) {
  return;
} 
  timePassed +=1;

}, 1000); 
};


function setup() {
  background(249, 249, 249);

  cnv = createCanvas(
    cellW * cols + sizeError,
    cellH * rows + sizeError + 30
  );

  cnv.parent("board");
  textSize(cellH - 2);

  allocateMines();
  generateCells();
  calculateMines();



}


function draw() {
  background(235);

  translate(-3, cellH, -3);
  cells.forEach(function (c) {
    c.draw();
  });

textSize(24);
textStyle(BOLD);
textFont("Arial");

if(flaggedCells > initialMines) {
  fill(248, 49, 47);
} else {
  fill(15, 15, 15)
}

text(MINE, 5, height - 41);
text(nf(Math.max(initialMines - flaggedCells, 0), 3), 40, height - 40);


fill(15, 15, 15);
text(TIMER, width - 79, height - 41 );
if(newBestTime) {
  fill(255, 176, 46);
}
text(nf(timePassed, 3), width - 44, height - 40 );
textSize(cellH - 2);


}


function getNeighbors(cell) {
  return cells.filter((n) => {
    return (
      n.i >= cell.i - 1 &&
      n.i <= cell.i + 1 &&
      n.j >= cell.j  - 1 && 
      n.j <= cell.j + 1

    );
  });
}

let isFirstClick = true;
let mineReallocated = false;


function revealCell(cell) {
  if(isFirstClick) {
    startTimer();
    startTime = new Date();


    let played = parseInt(localStorage.getItem("played"));
    localStorage.setItem("played", ++played);

    if (cell.mine) {
      cell.mine = false;

      while (!mineReallocated) {
        let num = Math.floor(Math.random() * (numOfCells - 1)) + 1;
        if (!cells[num].mine) {
          cells[num].mine = true;
          mineReallocated = true;
        }
      }
    }
    isFirstClick = false;

   calculateMines();
   cells.forEach(function (c)  {
     c.draw();
   });

  }

  cell.revealed = true;
  cell.clicked = true;
  if (cell.mine) {
    cells.forEach((c) =>  {
     c.revealed = true;
    });
    noLoop();
    return;
  }


if (cell.minesAround == 0) {
   let neighbors = getNeighbors(cell);
   neighbors.forEach((c) => {
     if(!c.revealed) {
       revealCell(c);
       if(c.flagged) {
         c.flagged = false;
          flaggedCells -= 1;
       }
     }
   });
}


}



function gameWon() {
  DIGITS[0] = WON;
  cells.forEach(function (c) {
    c.revealed = true;
  });

  let won = parseInt(localStorage.getItem("won"));
  localStorage.setItem("won", ++won);

  const endTime = new Date();
  let time = endTime - startTime;
  time = time / 1000;

  let bestTime = Number(localStorage.getItem("bestTime"));
  if (bestTime === 0 ) {
    localStorage.setItem("bestTime", time);

  } else {
    if (time < bestTime) {
      DIGITS[0] = "🥳";
      newBestTime = true;
      localStorage.setItem("bestTime", time);
      localStorage.setItem("newbestTime", "true");

    }
  }
  stopTimer = true;
}


function gameLost() {
  DIGITS[0] = LOST;
  cells.forEach(function (c) {
    c.revealed = true;
  });

  const endTime = new Date();
  let time = endTime - startTime;
  time = time / 1000;
  stopTimer = true;
}


function mousePressed() {
  if (mouseButton === RIGHT) {
    let cell = cells.find((c) => {
      return (
        c.x < mouseX && 
        c.x + cellW > mouseX &&
        c.y < mouseY && 
        c.y + cellH > mouseY
      );
    });
    if(cell) {
      if(!cell.flagged && !cell.revealed) {
        flaggedCells += 1;
      } else if (!cell.revealed) {
        flaggedCells -= 1;
      }
      cell.flagged = !cell.flagged;
    }
  }

  if (mouseButton === LEFT) {
    if(!gameFinished) {
      let cell = cells.find((c) => {
        return (
          c.x < mouseX &&
          c.x + cellW > mouseX && 
          c.y < mouseY && 
          c.y + cellH > mouseY
        );
      });
      if (cell) {
        if(cell.flagged) {
          return;
        }
        revealCell(cell);
        if(cell.mine) {
          if(!gameFinished) {
            gameLost();
            gameFinished = true;
          }
        } else {
          let cellsLeft = cells.filter((c) => {
           return !c.mine && !c.revealed;
          }).length;
          if (cellsLeft == 0) {
            if(!gameFinished) {
              gameWon();
              gameFinished = true;
            }
          }

        }
      }

    }
  }
}
