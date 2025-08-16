import "./js/main";
import { updatePets } from "./js/game";
import { checkObjective } from "./js/objectives";
import "./js/upgrades";
import "./js/store";
import "./js/settings";

class Engine {
    timeStamp: number;
    oldTimeStamp: number;

    constructor() {
        this.timeStamp = 0;
        this.oldTimeStamp = 0;
    }

    start() {
        window.requestAnimationFrame(this.mainLoop);
    }

    mainLoop = () => {
	    const secondsPassed = (this.timeStamp - this.oldTimeStamp) / 1000;
	    this.oldTimeStamp = this.timeStamp;
	    updatePets(secondsPassed);
	    checkObjective();

        window.requestAnimationFrame(this.mainLoop);
    }
};

const engine = new Engine();
engine.start()
