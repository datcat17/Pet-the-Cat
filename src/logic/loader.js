// Scripts to be dynamically loaded
let scripts = [
    "src/logic/main.js",
	"src/logic/game.js",
	"src/logic/format.js",
	"src/logic/objectives.js",
	"src/logic/upgrades.js",
	"src/logic/store.js",
	"src/logic/settings.js",
	"src/logic/startgame.js"
];

// Dynamically load all scripts in the above list
function loadScript(url) {
    let head = document.getElementsByTagName('head')[0];
    let script = document.createElement('script');
    // script.type = 'text/javascript';
	script.type = 'module';
    script.src = url;
    script.async = false;

    head.appendChild(script);
}

scripts.map((script) => {
    loadScript(script);
});