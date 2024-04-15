import mainLogic from "./main.js";
import startGame, { gameLoop } from './game.js';
// Objectives gets loaded by game.js
import loadSettings from './settings.js';

const loadFiles = () => {
    console.log("loading files");

    mainLogic.startMain();
    startGame();

    gameLoop();
}

export default loadFiles;
