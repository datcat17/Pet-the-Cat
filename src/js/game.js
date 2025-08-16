"use strict";

import { formatNumber } from "./format";

export function updatePets(secondsPassed) {
	let buffer = gameData.pps * secondsPassed;
	gameData.pets += buffer;
	document.getElementById("pets").innerHTML = `${formatNumber(Math.floor(gameData.pets))}`;
	document.getElementById("pps").innerHTML = ` + ${formatNumber(gameData.pps)} / s`;
}

function petClick(event) {
	gameData.pets += gameData.ppc;

	event.target.classList.remove("cat-anim");
	event.target.classList.add("cat-anim");
	setTimeout(function() {
		event.target.classList.remove("cat-anim");
	}, 100);


	let number = document.createElement("p");
	number.innerHTML = gameData.ppc;
	number.style.fontSize = "6vh";
	number.style.animation = "floating-number 0.5s linear 0s";
	number.style.pointerEvents = "none";
	number.style.margin = "0";
	number.style.padding = "0";

	number.style.position = "absolute";
	number.style.top = `${((event.pageY / document.getElementsByTagName("body")[0].offsetHeight) * 100) - 11}%`;
	number.style.left = `${(event.pageX / document.getElementsByTagName("body")[0].offsetWidth) * 100}%`;

	document.getElementsByTagName("body")[0].appendChild(number);

	setTimeout(_ => {
		document.getElementsByTagName("body")[0].removeChild(number);
	}, 500);
}

// Event Listeners
document.getElementById("cat").addEventListener("click", petClick);

if(gameData.debugging) { console.log("game.js loaded.") };
