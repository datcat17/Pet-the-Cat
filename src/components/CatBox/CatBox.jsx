import { useState } from 'react';
import './CatBox.css';

import catImg from '@/assets/cats/white-kitten/white-kitten7.png'
import Objective from '@/components/Objective/Objective';
import Values from '@/components/Values/Values';

import mainLogic from '@/logic/main.js';

const gameData = mainLogic.gameData;

// When the cat is clicked
const catClick = (event) => {
    gameData.pets += gameData.ppc;

	event.target.classList.remove("cat-anim");
	event.target.classList.add("cat-anim");
	setTimeout(function() {
		event.target.classList.remove("cat-anim");
	}, 100);


	let number = document.createElement("p");
	number.innerHTML = gameData.ppc;
	number.style.fontSize = "6vh";
	number.style.animation = "floating-number 0.5s linear 0s";
	number.style.pointerEvents = "none";
	number.style.margin = "0";
	number.style.padding = "0";

	number.style.position = "absolute";
	number.style.top = `${((event.pageY / document.getElementsByTagName("body")[0].offsetHeight) * 100) - 11}%`;
	number.style.left = `${(event.pageX / document.getElementsByTagName("body")[0].offsetWidth) * 100}%`;

	document.getElementsByTagName("body")[0].appendChild(number);

	setTimeout(_ => {
		document.getElementsByTagName("body")[0].removeChild(number);
	}, 500);
}

const CatBox = () => {
    return <div id="CatBox" className='cat-box'>
        <Objective id="objective" />
        <Values id="values" />
        <div className="container">
			<img id="cat" onClick={catClick} src={catImg} alt="cat" />
		</div>
    </div>
};

export default CatBox;
