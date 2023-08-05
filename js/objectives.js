"use strict";

let descriptions = [
	"Pet the cat",
	"Pet the cat 10 times",
	"Open the store tab",
	"Buy an upgrade"
];

function changeObjective() {
	document.getElementById("objective").style.backgroundColor="lightgreen";
	document.getElementById("objective").classList.add("objective-anim");

	setTimeout(function() {
		document.getElementById("objective").style.backgroundColor="lightgray";
		document.getElementById("objective").lastChild.previousSibling.innerHTML = descriptions[gameData.objective];
	}, 1000);

	setTimeout(function() {
		document.getElementById("objective").classList.remove("objective-anim");
	}, 2000)
	
}

function checkObjective() {
 	switch(gameData.objective) {
 	case 0:
 		if(gameData.pets > 0) {
 			gameData.objective += 1;
 			changeObjective();
 		}
 		break;
 	case 1:
 		if(gameData.pets >= 10) {
 			gameData.objective += 1;
			document.getElementById("open-store").style.display = "block";
 			changeObjective();
 		}
 		break;
 	case 2:
		obj3();
 		break;
	case 3:
		obj4();
		break;
	case 4:
		break;
 	}
}

function obj3() {
	if(document.getElementById("store").classList.contains("open-store")) {
		gameData.objective += 1;
 		changeObjective();
	}
}

function obj4() {
	if(gameData.pps != 0) {
		gameData.objective += 1;
		document.getElementById("pps").style.display = "inline-block";
 		changeObjective();
	}
}