if(gameData.debugging) { console.log("Save file different than current version. Attempting to convert..."); }

function checkCompatibility(version) {
    let status;
    switch(version) {
        case "0.1.1-alpha":
            status = v01x();
            break;
        default:
            if(gameData.debugging) { console.log("This is not a known game version. Perhaps the save is newer than the current game version?") };
    }

    if(status == false) {
        if(gameData.debugging) { console.log("Using default values.") };
        return false;
    }
    return true;
}

// v0.1.X-alpha
function v01x() {
    if(gameData.debugging) { console.log("v0.1.x-alpha is not supported. If you believe this to be an error, please file a bug report."); }
}

if(gameData.debugging) { console.log("compatibility.js loaded.") };