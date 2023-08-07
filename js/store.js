function toggleStore(action) {
	let mq = window.matchMedia( "(max-width: 767px)" );
	let store = document.getElementById("store");

	if(action == "close") {
		store.style.display = "flex";
		store.classList.add("open-store");

		setTimeout(function() {
			if(mq.matches == true) { store.style.height = "50%"; }
			else { store.style.width = "50%"; }
			store.classList.remove("open-store");
		}, 200);
	}
	else {
		store.classList.add("close-store");

		setTimeout(function() {
			if(mq.matches == true) { store.style.height = "0%"; }
			else { store.style.width = "0%"; }
			store.style.display = "none";
			store.classList.remove("close-store");
		}, 200);
	}
}

// Changes the store tab
function changeTab(newTab) {
    document.getElementById(tempData.currentTab).style.display = "none";
    document.getElementById(newTab).style.display = "block";
	tempData.currentTab = newTab;
}


// Event Listeners
document.getElementById("store-collapse").addEventListener("click", function() {
	toggleStore("open");
});

document.getElementById("open-store").addEventListener("click", function() {
	toggleStore("close");
});

// Settings tab
document.getElementById("settings-trigger").addEventListener("click", function() {
	changeTab("settings");
});

// Upgrades tab
document.getElementById("upgrades-trigger").addEventListener("click", function() {
	changeTab("upgrades");
});

if(gameData.debugging) { console.log("store.js loaded.") };