// if(gameData.debugging) { console.log("Save file different than current version. Attempting to convert..."); }

let popup = document.createElement("div");
popup.innerHTML = `<h2>WARNING</h2><h3>The save version does not match the game version. \
This is most likely due to an update. We will attempt to convert your save to the game version, \
however we strongly recomend you copy your save data. If you encounter any issues, please file a bug report.</h3> \
<button onclick='navigator.clipboard.writeText(btoa(JSON.stringify(gameData)))'>Copy Save</button> \
<button style='padding: 5%;' onclick='checkCompatibility(savegame.version);'>Continue</button>`;
popup.style.display = "flex";
popup.style.flexDirection = "column";
popup.style.justifyContent = "center";
popup.style.alignItems = "center";
popup.style.width = "40vh";
popup.style.height = "40vh";
popup.style.backgroundColor = "white";
popup.style.borderRadius = "18px";
popup.style.padding = "5vh";

let bPopup = document.createElement("div");
bPopup.style.position = "absolute";
bPopup.style.display = "flex";
bPopup.style.justifyContent = "center";
bPopup.style.alignItems = "center";
bPopup.style.width = "100%";
bPopup.style.height = "100%";
bPopup.style.backgroundColor = "rgba(0, 0, 0, 0.45)";

bPopup.appendChild(popup);

document.getElementsByTagName("body")[0].appendChild(bPopup);

function checkCompatibility(version) {
    let status = 0;
    switch(version) {
        case "0.1.1-alpha":
            status = v01x();
            break;
        case "0.2.0-alpha":
            status = v02x();
            break;
        default:
            if(gameData.debugging) { console.log("This is not a known game version. Perhaps the save is newer than the current game version?") };
            status = 2;
    }

    if(status == 0) {
        if(gameData.debugging) { console.log("Using default values.") };
        popup.innerHTML = "<h2>FALIURE</h2><h3>Error Code E1527</h3>";
        return;
    }
    else if (status == 2) {
        popup.innerHTML = "<h2>FALIURE</h2><h3>Error Code E1528</h3>";
        return;
    }

    document.getElementsByTagName("body")[0].removeChild(bPopup);
    if(gameData.debugging) { console.log("Conversion successful. Initializing data..."); }
    initialize();
}

// v0.1.X-alpha
function v01x() {
    if(gameData.debugging) { console.log("v0.1.x-alpha is not supported. If you believe this to be an error, please file a bug report."); }
    return 0;
}

// v0.2.x-alpha
function v02x() {
    savegame.version = gameData.version;
    gameData = savegame;
    return 1;
}

if(gameData.debugging) { console.log("compatibility.js loaded.") };

