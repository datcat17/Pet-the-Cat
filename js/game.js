"use strict";

function updatePets(secondsPassed) {
	let buffer = gameData.pps * secondsPassed;
	gameData.pets += buffer;
	document.getElementById("pets").innerHTML = Math.floor(gameData.pets);
}

function petClick(event) {
	gameData.pets += gameData.ppc;

	event.target.classList.remove("cat-anim");
	event.target.classList.add("cat-anim");
	setTimeout(function() {
		event.target.classList.remove("cat-anim");
	}, 100);
}


// Start loop
window.requestAnimationFrame(gameLoop);

// Game loop

let oldTimeStamp = 0;
let secondsPassed = 0;
function gameLoop(timeStamp) {
	secondsPassed = (timeStamp - oldTimeStamp) / 1000;
	oldTimeStamp = timeStamp;
	updatePets(secondsPassed);
	checkObjective();

    window.requestAnimationFrame(gameLoop);
}

// Event Listeners
document.getElementById("cat").addEventListener("click", petClick);