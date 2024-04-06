"use strict";

import { gameData } from '@/logic/main.js';
import { formatNumber } from '@/logic/format.js';

function updatePPS() {
    let buffer = 0;
    let multiplier = 0;
    for (let id in gameData.upgrades.automatic) {
        buffer += gameData.upgrades.automatic[id].a * gameData.upgrades.automatic[id].v;
    }

    for (let id in gameData.upgrades.multiplier) {
        multiplier += gameData.upgrades.multiplier[id].a * gameData.upgrades.multiplier[id].v;
    }

    if(multiplier == 0) {
        multiplier = 1;
    }

    console.log(multiplier);
    gameData.pps = buffer * multiplier;
}

function updatePPC() {
    let buffer = 0;
    let multiplier = 0;
    for (let id in gameData.upgrades.manual) {
        buffer += gameData.upgrades.manual[id].a * gameData.upgrades.manual[id].v;
    }

    for (let id in gameData.upgrades.multiplier) {
        multiplier += gameData.upgrades.multiplier[id].a * gameData.upgrades.multiplier[id].v;
    }

    if(multiplier == 0) {
        multiplier = 1;
    }

    if (buffer == 0) {
        buffer = 1;
    }

    gameData.ppc = buffer * multiplier;
}

function buyUpgrade(event) {
    let type = event.target.id;
    let upgrade;

    if(type.charAt(0) == "a") {
        upgrade = gameData.upgrades.automatic[event.target.id];
        type = "Automatic";
    }
    else if(type.charAt(0) == "m") {
        upgrade = gameData.upgrades.manual[event.target.id];
        type = "Manual";
    }
    else if(type.charAt(0) == "x") {
        upgrade = gameData.upgrades.multiplier[event.target.id];
        type = "Multiplier";
    }

    if(upgrade.c > gameData.pets) { return; }

    gameData.pets -= upgrade.c;
    
    if(gameData.debugging) { console.log(`${type} upgrade bought.`); }

    upgrade.a += 1;
    upgrade.c = upgrade.b * upgrade.s ** (upgrade.a + 1);
    event.target.getElementsByTagName("h3")[1].innerHTML = formatNumber(Math.floor(upgrade.c));
    event.target.getElementsByTagName("h3")[0].innerHTML = formatNumber(upgrade.a);
    updatePPS();
    updatePPC();
}

// Changes the open upgrade tab
function changeUpgradeTab(newTab) {
    document.getElementById(tempData.upgradeTab).style.display = "none";
    document.getElementById(newTab).style.display = "flex";
	tempData.upgradeTab = newTab;
}

// Dynamically add upgrades
for (let type in gameData.upgrades) {
    for (let id in gameData.upgrades[type]) {
        let upgrade = gameData.upgrades[type][id];
        let upgrade_container = document.getElementById(type);
        let new_element = document.createElement("li");
    
        new_element.innerHTML = `<h3>${upgrade.a}</h3><div class="spacer"></div><div><h2>${upgrade.name}</h2><h3>${formatNumber(Math.floor(upgrade.c))} pets</h3></div><h3>+${upgrade.v} pps</h3>`;
        new_element.id = id;
    
        new_element.addEventListener("click", buyUpgrade);
        upgrade_container.appendChild(new_element);
    }
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