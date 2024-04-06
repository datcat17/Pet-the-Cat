import { useState } from 'react';
import './CatBox.css';

import catImg from '@/assets/cats/white-kitten/white-kitten7.png'
import Objective from '@/components/Objective/Objective';
import Values from '@/components/Values/Values';

const CatBox = () => {
    return <div id="CatBox" className='cat-box'>
        <Objective id="objective" />
        <Values id="values" />
        <img id="cat" src={catImg} alt="cat"></img>
    </div>
};

export default CatBox;