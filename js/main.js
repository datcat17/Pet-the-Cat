"use strict";

// Temporary data. Reset on page reload
let tempData = {
	currentTab: "automatic"
}

// Initialize game data with default values
let gameData = {
	debugging: false,
	pets: 0,
	ppc: 1, // Pets per click
	pps: 0, // Pets per second
	objective: 0,
	upgrades: {
		u1: {name: "Robotic Hand", c: 100, a: 0, v: 1},
		u2: {name: "Upgrade 2", c: 500, a: 0, v: 5},
		u3: {name: "Upgrade 3", c: 5000, a: 0, v: 50}
	}
}

// Look for existing save data and save it to savegame
let savegame = JSON.parse(localStorage.getItem("petTheCatSave"));

// If a savegame is found, load it
if (savegame !== null) {
	if(gameData.debugging) { console.log("Found save. Loading save..."); }
	gameData = savegame;
	if(gameData.debugging) { console.log("Save Loaded."); }
}
// Else, leave default values
else {
	if(gameData.debugging) { console.log("No save found. Leaving default values."); }
}

// Scripts to be dynamically loaded
let scripts = [
	"js/game.js",
	"js/objectives.js",
	"js/upgrades.js",
	"js/store.js"
];

// Dynamically load all scripts in the above list
function loadScript(url) {
   let head = document.getElementsByTagName('head')[0];
   let script = document.createElement('script');
   script.type = 'text/javascript';
   script.src = url;

   head.appendChild(script);
}

for (const url of scripts) {
	loadScript(url);
}

// Set debugging checkbox to correct value
document.getElementById("debug").checked = gameData.debugging;

// Save game every saveTimer seconds
// let saveTimer = 3000;
window.setInterval(function() {
	localStorage.setItem("petTheCatSave", JSON.stringify(gameData));
}, 3000);

// Prevent cat from being dragged
document.getElementById("cat").ondragstart = function() { return false; };

// Hide open store button if not unlocked
if(gameData.objective < 2) {
	document.getElementById("open-store").style.display = "none";
}
