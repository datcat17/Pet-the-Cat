"use strict";

import mainLogic from '@/logic/main.js';

const gameData = mainLogic.gameData;

const startObjectives = () => {
	// Initialize objective
	document.getElementById("objective").lastChild.previousSibling.innerHTML = descriptions[gameData.objective];

	if(gameData.debugging) { console.log("objectives.js loaded.") };
}

let descriptions = [
	"Pet the cat",
	"Pet the cat 10 times",
	"Open the store tab",
	"Buy an upgrade"
];

// Changes the current objective
function changeObjective() {
	document.getElementById("objective").style.backgroundColor="lightgreen";
	document.getElementById("objective").classList.add("objective-anim");

	setTimeout(function() {
		document.getElementById("objective").style.backgroundColor="#d8ccb6";
		document.getElementById("objective").lastChild.previousSibling.innerHTML = descriptions[gameData.objective];
	}, 1000);

	setTimeout(function() {
		document.getElementById("objective").classList.remove("objective-anim");
	}, 2000)
	
}

// Checks to see if the current objective has been completed. If so, change the objective
export const checkObjective = () => {
 	switch(gameData.objective) {
 	case 0:
 		obj1();
 		break;
 	case 1:
		obj2();
 		break;
 	case 2:
		obj3();
 		break;
	case 3:
		// obj4();
		break;
	case 4:
		break;
 	}
}

function obj1() {
	if(gameData.pets > 0) {
		gameData.objective += 1;
		changeObjective();
	}
}

function obj2() {
	if(gameData.pets >= 10) {
		gameData.objective += 1;
	   document.getElementById("open-store").style.display = "block";
		changeObjective();
	}
}

function obj3() {
	if(document.getElementById("MenuBar").classList.contains("open-store")) {
		gameData.objective += 1;
 		changeObjective();
	}
}

export function objective4() {
	if(gameData.objective == 3) {
		gameData.objective += 1;
		document.getElementById("pps").style.display = "inline-block";
		changeObjective();
	}
}
