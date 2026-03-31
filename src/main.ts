import { gameData } from "./js/main";
import { updatePets } from "./js/game";
import { checkObjective } from "./js/objectives";
import "./js/upgrades";
import "./js/store";
import "./js/settings";

import { initUI } from "./init";
import { Store } from "./store";

class Engine {
    timeStamp: number;
    oldTimeStamp: number;

    numberStore: Store<number>;
    stringStore: Store<string>;

    constructor() {
        this.timeStamp = 0;
        this.oldTimeStamp = 0;

        this.numberStore = new Store();
        this.stringStore = new Store();
    }

    start() {
        // Start stores
        this.numberStore.startTicking(1/30*1000);
        this.stringStore.startTicking(1/30*1000);

        this.numberStore.createItem("pets", gameData.pets);
        this.numberStore.createItem("pps", gameData.pps);

        initUI(this.numberStore, this.stringStore);

        window.requestAnimationFrame(this.mainLoop);
    }

    mainLoop = (time: number) => {
        this.timeStamp = time;
        const secondsPassed = (this.timeStamp - this.oldTimeStamp) / 1000;
        this.oldTimeStamp = this.timeStamp;
        updatePets(secondsPassed);
        checkObjective();

        this.numberStore.setItem("pets", gameData.pets);
        this.numberStore.setItem("pps", gameData.pps);

        window.requestAnimationFrame(this.mainLoop);
    }
};

const engine = new Engine();
engine.start()
