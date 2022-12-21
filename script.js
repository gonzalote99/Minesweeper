document.title = `Minesweeper Emoji`;


let played = window.localStorage.getItem("played");
if (played === null) {
  window.localStorage.setItem("played", "0");
}


let won = window.localStorage.getItem("won");
if(won === null) {
  window.localStorage.setItem("won", "0");
}

let winPercentage = window.localStorage.getItem("winPercentage");
if (winPercentage === null) {
  window.localStorage.setItem("winPercentage", "");
}


let bestTime = window.localStorage.getItem("bestTime");
if (bestTime === null) {
  window.localStorage.setItem("bestTime", "");
}


const header = document.createElement('div');

header.className = `header`;

header.innerHTML = `
<span style="--i:1">M</span>
<span style="--i:2">i</span>
<span style="--i:3">n</span>
<span style="--i:4">e</span>
<span style="--i:5">s</span>
<span style="--i:6">w</span>
<span style="--i:7">e</span>
<span style="--i:8">e</span>
<span style="--i:9">p</span>
<span style="--i:10">e</span>
<span style="--i:11">r</span>
<span style="--i:12">&nbsp;</span>
<span style="--i:13">E</span>
<span style="--i:14">m</span>
<span style="--i:15">o</span>
<span style="--i:16">j</span>
<span style="--i:17">i</span>
`;


document.body.appendChild(header);


const board = document.createElement("div");
board.setAttribute("id", "board");
document.body.appendChild(board);


const newGame = document.createElement("button");
newGame.setAttribute("id", "reload");
newGame.innerHTML = `New Game`;
document.body.appendChild(newGame);



const statsButton = document.createElement("button");
statsButton.setAttribute("id", "stats-button");
statsButton.innerHTML = `Stats`;
document.body.appendChild(statsButton);



const statsPanel = document.createElement("div");
statsPanel.setAttribute("id", "stats-panel");
statsPanel.innerHTML += `<p class="label">Played</p>`;
if (played) {
  statsPanel.innerHTML += `<p class="value">${played}</p>`;
} else {
  statsPanel.innerHTML += `<p class="value">0</p>`;
}
statsPanel.innerHTML += `<p class="label">won</p>`;
if(won) {
  statsPanel.innerHTML += `<p class="value">${won}</p>`;
} else {
  statsPanel.innerHTML += `<p class="value">0</p>`;
}
statsPanel.innerHTML +=  `<p class="label">win %</p>`;
if(winPercentage) {
  statsPanel.innerHTML += `<p class="vale">${(winPercentage * 100).toFixed(2)}`
} else {
  statsPanel.innerHTML += `<p class="value">N/A</p>`;
}

statsPanel.innerHTML +=  `<p class="label">best-time</p>`;
if (bestTime) {
  statsPanel.innerHTML += `<p class="value">${bestTime}</p>`;
} else {
  statsPanel.innerHTML += `<p class="value">N/A</p>`;
}

document.body.appendChild(statsPanel);



const footer = document.createElement("footer");
footer.innerHTML = `<a href="https://github.com/gonzalote99" target="_blank" rel="noopener"><img src="https://raw.githubusercontent.com/michaelkolesidis/minesweeper-emoji/1ed2fa7742386bb51a2320942073cb3b8dc57f09/assets/m.svg"/></a>`;
document.body.appendChild(footer);


function reload() {
  const reload = document.querySelector("#reload");
  reload.addEventListener("click", () => {
    window.location.reload();
  });
}

reload();


let statsPanelOpen = false;

statsButton.addEventListener("click", () => {
if (statsPanelOpen) {
  statsPanel.style.opacity = 0;
  statsPanelOpen = false;
} else if (!statsPanelOpen){
   statsPanel.style.opacity = 1;
   statsPanelOpen = true;
}
});

