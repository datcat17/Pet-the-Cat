"use strict";

let descriptions = [
	"Pet the cat",
	"Pet the cat 10 times"
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
 			console.log("Objective " + gameData.objective + " has been completed.");
 			gameData.objective += 1;
 			changeObjective();
 		}
 		break;
 	case 1:
 		if(gameData.pets >= 10) {
 			console.log("Objective " + gameData.objective + " has been completed.");
 			gameData.objective += 1;
 			changeObjective();
 		}
 		break;
 	case 2:
 		break;
 	}
}