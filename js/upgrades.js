"use strict";

function updatePPS() {
    let buffer = 0;
    let multiplier = 1;
    for (let id in gameData.upgrades.automatic) {
        buffer += gameData.upgrades.automatic[id].a * gameData.upgrades.automatic[id].v;
    }

    for (let id in gameData.upgrades.multiplier) {
        multiplier += gameData.upgrades.multiplier[id].a * gameData.upgrades.multiplier[id].v;
    }

    console.log(multiplier);
    gameData.pps = buffer * multiplier;
}

function updatePPC() {
    let buffer = 0;
    for (let id in gameData.upgrades.manual) {
        buffer += gameData.upgrades.manual[id].a * gameData.upgrades.manual[id].v;
    }

    gameData.ppc = buffer + 1;
}

function buyUpgrade(event) {
    let type = event.target.id;
    let upgrade;
    if(type.charAt(0) == "a") {
        upgrade = gameData.upgrades.automatic[event.target.id];
        if(gameData.debugging) { console.log("Automatic upgrade bought."); }
    }
    else if(type.charAt(0) == "m") {
        upgrade = gameData.upgrades.manual[event.target.id];
        if(gameData.debugging) { console.log("Manual upgrade bought."); }
    }
    else if(type.charAt(0) == "x") {
        upgrade = gameData.upgrades.multiplier[event.target.id];
        if(gameData.debugging) { console.log("Multiplier upgrade bought."); }
    }
    

    if(gameData.pets >= Math.floor(upgrade.c)) {
        gameData.pets -= Math.floor(upgrade.c);
        upgrade.a += 1;

        upgrade.c = upgrade.b * upgrade.s ** (upgrade.a + 1);
        event.target.innerHTML = `<h2>${upgrade.name}</h2><h3>${Math.floor(upgrade.c)} pets</h3>`;
        updatePPS();
        updatePPC();
    }
}

// Changes the upopgrade tab
function changeUpgradeTab(newTab) {
    document.getElementById(tempData.upgradeTab).style.display = "none";
    document.getElementById(newTab).style.display = "flex";
	tempData.upgradeTab = newTab;
}

// Add automatic upgrades
for (let id in gameData.upgrades.automatic) {
	let upgrade = gameData.upgrades.automatic[id];
	let upgrade_container = document.getElementById("automatic");
	let new_element = document.createElement("li");

	new_element.innerHTML = `<h2>${upgrade.name}</h2><h3>${Math.floor(upgrade.c)} pets</h3>`;
	new_element.id = id;

	new_element.addEventListener("click", buyUpgrade);
	upgrade_container.appendChild(new_element);
}

// Add manual upgrades
for (let id in gameData.upgrades.manual) {
	let upgrade = gameData.upgrades.manual[id];
	let upgrade_container = document.getElementById("manual");
	let new_element = document.createElement("li");

	new_element.innerHTML = `<h2>${upgrade.name}</h2><h3>${Math.floor(upgrade.c)} pets</h3>`;
	new_element.id = id;

	new_element.addEventListener("click", buyUpgrade);
	upgrade_container.appendChild(new_element);
}

// Add multiplier upgrades
for (let id in gameData.upgrades.multiplier) {
	let upgrade = gameData.upgrades.multiplier[id];
	let upgrade_container = document.getElementById("multiplier");
	let new_element = document.createElement("li");

	new_element.innerHTML = `<h2>${upgrade.name}</h2><h3>${Math.floor(upgrade.c)} pets</h3>`;
	new_element.id = id;

	new_element.addEventListener("click", buyUpgrade);
	upgrade_container.appendChild(new_element);
}

document.getElementById("automatic-trigger").addEventListener("click", function() {
    changeUpgradeTab("automatic");
});

document.getElementById("manual-trigger").addEventListener("click", function() {
    changeUpgradeTab("manual");
});

document.getElementById("multiplier-trigger").addEventListener("click", function() {
    changeUpgradeTab("multiplier");
});

if(gameData.debugging) { console.log("upgrades.js loaded.") };