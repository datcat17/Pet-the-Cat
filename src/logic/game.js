"use strict";

import mainLogic from '@/logic/main.js';
import { formatNumber } from '@/logic/format.js';
import { checkObjective } from '@/logic/objectives.js';

const gameData = mainLogic.gameData;

const startGame = () => {
	// Event Listeners
	// document.getElementById("cat").addEventListener("click", petClick);

	if(gameData.debugging) { console.log("game.js loaded.") };
}

export default startGame;

function updatePets(secondsPassed) {
	let buffer = gameData.pps * secondsPassed;

	// No idea why, but the first two iterations are NaN
	if(isNaN(buffer)) {
		console.log("Buffer is NaN");
		return;
	}
	gameData.pets += buffer;
	document.getElementById("pets").innerHTML = `${formatNumber(Math.floor(gameData.pets))}`;
	document.getElementById("pps").innerHTML = ` + ${formatNumber(gameData.pps)} / s`;
}

// function petClick(event) {
// 	gameData.pets += gameData.ppc;

// 	event.target.classList.remove("cat-anim");
// 	event.target.classList.add("cat-anim");
// 	setTimeout(function() {
// 		event.target.classList.remove("cat-anim");
// 	}, 100);


// 	let number = document.createElement("p");
// 	number.innerHTML = gameData.ppc;
// 	number.style.fontSize = "6vh";
// 	number.style.animation = "floating-number 0.5s linear 0s";
// 	number.style.pointerEvents = "none";
// 	number.style.margin = "0";
// 	number.style.padding = "0";

// 	number.style.position = "absolute";
// 	number.style.top = `${((event.pageY / document.getElementsByTagName("body")[0].offsetHeight) * 100) - 11}%`;
// 	number.style.left = `${(event.pageX / document.getElementsByTagName("body")[0].offsetWidth) * 100}%`;

// 	document.getElementsByTagName("body")[0].appendChild(number);

// 	setTimeout(_ => {
// 		document.getElementsByTagName("body")[0].removeChild(number);
// 	}, 500);
// }

// Game loop
let oldTimeStamp = 0;
let secondsPassed = 0;
export const gameLoop = (timeStamp) => {
	secondsPassed = (timeStamp - oldTimeStamp) / 1000;
	oldTimeStamp = timeStamp;
	updatePets(secondsPassed);
	checkObjective();

    window.requestAnimationFrame(gameLoop);
}
