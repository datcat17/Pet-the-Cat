"use strict";

class MainLogic {
	constructor() {
		if(MainLogic.instance) {
			return MainLogic.instance;
		}
		MainLogic.instance = this;
		this.gameData = {
			version: __APP_VERSION__,
			debugging: true,
			pets: 0,
			ppc: 1, // Pets per click
			pps: 0, // Pets per second
			objective: 0,
			upgrades: {
				// (b)ase cost, (c)ost, (a)mount, (v)alue, cost (s)cale
				automatic: {
					a1: {name: "Robotic Hand", b: 100, c: 100, a: 0, v: 1, s: 1.15},
					a2: {name: "Upgrade 2", b: 500, c: 500, a: 0, v: 5, s: 1.15},
					a3: {name: "Upgrade 3", b: 5000, c: 5000, a: 0, v: 50, s: 1.15}
				},
				manual: {
					m1: {name: "Cat Brush", b: 100, c: 100, a: 0, v: 1, s: 1.15},
				},
				multiplier: {
					x1: {name: "Catnip", b: 10000, c: 10000, a: 0, v: 2, s: 1.15},
				}
			},
			theme: {
				state: 0,
				themes: {
					coffee: ["#e2dbce", "d8ccb6"]
				}
			}
		}
	}

	wipeSave = () => {
		localStorage.removeItem('petTheCatSave');
		window.location.reload();
	}

	saveGame = () => {
		localStorage.setItem("petTheCatSave", JSON.stringify(this.gameData));
	}

	startMain = () => {
		console.log("Starting game engine...");
		console.log("Game version: " + this.gameData.version);
	
		// Look for existing save data and save it to savegame
		let savegame = JSON.parse(localStorage.getItem("petTheCatSave"));
	
		// If a savegame is found, load it
		if (savegame !== null) {
			if(this.gameData.debugging) { console.log("Found save. Loading save..."); }
	
			if(savegame.version != this.gameData.version) {
				// loadScript("js/compatibility.js");
			}
			else {
				this.gameData = savegame;
				if(this.gameData.debugging) { console.log("Save Loaded."); }
				this.initialize();
			}
	
		}
		// Else, leave default values
		else {
			if(this.gameData.debugging) { console.log("No save found. Leaving default values."); }
			this.initialize();
		}
	}

	// TODO Proper function description
	initialize = () => {
		// Set debugging checkbox to correct value
		document.getElementById("debug").checked = this.gameData.debugging;

		// Save game every saveTimer seconds
		let saveTimer = 3000;
		window.setInterval(this.saveGame, saveTimer);

		// Prevent cat from being dragged
		document.getElementById("cat").ondragstart = function() { return false; };

		// Hide open store button if not unlocked
		if(this.gameData.objective < 2) {
			document.getElementById("open-store").style.display = "none";
		}

		// Hide pps if 0
		if(this.gameData.pps == 0) {
			document.getElementById("pps").style.display = "none";
		}

		// Set HTML version number to current version
		// document.getElementById("version").innerHTML = gameData.version;

		if(this.gameData.debugging) { console.log("Game data initialized."); }
	}
}

const instance = new MainLogic();
export default instance;
