"use strict";

// Initialize game data
let gameData = {
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

document.getElementById("cat").ondragstart = function() { return false; };

// Scripts to be dynamically loaded
let scripts = [
	"js/game.js",
	"js/objectives.js",
	"js/upgrades.js"
];

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
