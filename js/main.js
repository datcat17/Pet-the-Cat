"use strict";

// Initialize game data
let gameData = {
	pets: 0,
	ppc: 1, // Pets per click
	pps: 0, // Pets per second
	objective: 0
}

document.getElementById("cat").ondragstart = function() { return false; };

// Scripts to be dynamically loaded
let scripts = [
	"js/game.js",
	"js/objectives.js"
];

function loadScript(url) {
   var head = document.getElementsByTagName('head')[0];
   var script = document.createElement('script');
   script.type = 'text/javascript';
   script.src = url;

   head.appendChild(script);
}

for (const url of scripts) {
	loadScript(url);
}