import { formatNumber } from "./js/format";
import { Store } from "./store";

export function initUI(
    numberStore: Store<number>,
    stringStore: Store<string>,
): void {
    initPetsCounter(numberStore);
    initPpsCounter(numberStore);
};

function initPetsCounter(numberStore: Store<number>) {
    const petsCounter = document.getElementById("pets");

    if (petsCounter === null) {
        throw new Error("HTML initialization error");
    }

    numberStore.subscribe("pets", (value: number) => {
        petsCounter.innerHTML = `${formatNumber(Math.floor(value))}`;
    });
};

function initPpsCounter(numberStore: Store<number>) {
    const ppsCounter = document.getElementById("pps");

    if (ppsCounter === null) {
        throw new Error("HTML initialization error");
    }

    numberStore.subscribe("pps", (value: number) => {
        ppsCounter.innerHTML = ` + ${formatNumber(value)} / s`;
    });
};
