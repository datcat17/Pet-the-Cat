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

function toggleStore(action) {
	console.log("Toggling store");
	let store = document.getElementById("store");
	if(action == "close") {
		store.classList.add("open-store");

		setTimeout(function() {
			store.style.width = "50%";
			store.classList.remove("open-store");
		}, 200);
	}
	else {
		store.classList.add("close-store");

		setTimeout(function() {
			store.style.width = "0%";
			store.classList.remove("close-store");
		}, 200);
	}
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
document.getElementById("store-collapse").addEventListener("click", function() {
	toggleStore("open");
});
document.getElementById("open-store").addEventListener("click", function() {
	toggleStore("close");
});