"use strict";

// Wipe the existing save
function wipeSave() {
	localStorage.removeItem('petTheCatSave');
	window.location.reload();
}

// Disable zooming on mobile browsers
let mobile = window.mobileAndTabletCheck = function() {
	let check = false;
	(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
	return check;
};
if(mobile) {
	let viewport = document.getElementById("viewport");
	viewport.setAttribute("user-scalable", 0);
}

// Temporary data. Reset on page reload
let tempData = {
	currentTab: "upgrades",
	upgradeTab: "automatic"
}

// Initialize game data with default values
let gameData = {
	version: "0.2.1-alpha",
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
	}
}

// Look for existing save data and save it to savegame
let savegame = JSON.parse(localStorage.getItem("petTheCatSave"));

// If a savegame is found, load it
if (savegame !== null) {
	if(gameData.debugging) { console.log("Found save. Loading save..."); }

	if(savegame.version != gameData.version) {
		loadScript("js/compatibility.js");
	}
	else {
		gameData = savegame;
		if(gameData.debugging) { console.log("Save Loaded."); }
		initialize();
	}

}
// Else, leave default values
else {
	if(gameData.debugging) { console.log("No save found. Leaving default values."); }
	initialize();
}

// Scripts to be dynamically loaded
let scripts = [
	"js/game.js",
	"js/format.js",
	"js/objectives.js",
	"js/upgrades.js",
	"js/store.js",
	"js/settings.js",
	"js/startgame.js"
];

// Dynamically load all scripts in the above list
function loadScript(url) {
    let head = document.getElementsByTagName('head')[0];
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    script.async = false;

    head.appendChild(script);
}

for (const url of scripts) {
	loadScript(url);
}

// Save the game to localStorage
function saveGame() {
	localStorage.setItem("petTheCatSave", JSON.stringify(gameData));
}


function initialize() {
	// Set debugging checkbox to correct value
	document.getElementById("debug").checked = gameData.debugging;

	// Save game every saveTimer seconds
	let saveTimer = 3000;
	window.setInterval(saveGame, saveTimer);

	// Prevent cat from being dragged
	document.getElementById("cat").ondragstart = function() { return false; };

	// Hide open store button if not unlocked
	if(gameData.objective < 2) {
		document.getElementById("open-store").style.display = "none";
	}

	// Hide pps if 0
	if(gameData.pps == 0) {
		document.getElementById("pps").style.display = "none";
	}

	// Set HTML version number to current version
	document.getElementById("version").innerHTML = gameData.version;

	if(gameData.debugging) { console.log("Game data initialized."); }
}
