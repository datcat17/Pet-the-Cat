"use strict";

function updatePPS() {
    let buffer = 0;
    for (let id in gameData.upgrades) {
        buffer += gameData.upgrades[id].a * gameData.upgrades[id].v;
    }

    gameData.pps = buffer;
}

function buyUpgrade(event) {
    let upgrade = gameData.upgrades[event.target.id];

    if(gameData.pets >= upgrade.c) {
        gameData.pets -= upgrade.c;
        upgrade.a += 1;

        updatePPS();
    }
}

// document.getElementById("u1").addEventListener("click", buyUpgrade);
// Add store items
for (let id in gameData.upgrades) {
	let upgrade = gameData.upgrades[id];
	let upgrade_container = document.getElementById("upgrade_container");
	let new_element = document.createElement("li");

	new_element.innerHTML = `<h2>${upgrade.name}</h2><h3>${upgrade.c} pets</h3>`;
	new_element.id = id;

	new_element.addEventListener("click", buyUpgrade);
	upgrade_container.appendChild(new_element);
}