"use strict";

import { gameData } from '@/logic/main.js';
import { wipeSave } from '@/logic/main.js';

document.getElementById("export").addEventListener("click", function() {
    let exported = btoa(JSON.stringify(gameData));
    document.getElementById("savegamebox").value = exported;
})

document.getElementById("import").addEventListener("click", function() {
    let imported = document.getElementById("savegamebox").value;
    if(imported) {
        localStorage.setItem("petTheCatSave", atob(imported));
        window.location.reload();
    }
    else {
        if(gameData.debugging) { console.log("Error. Save empty. "); }
    }
})

document.getElementById("wipe").addEventListener("click", wipeSave);

// Toggle debug
document.getElementById("debug").onchange = function() {
    if(document.getElementById("debug").checked) { gameData.debugging = true; }
	else { gameData.debugging = false; }
	
	if(gameData.debugging) { console.log("Debugging enabled."); }
};

if(gameData.debugging) { console.log("settings.js loaded.") };