import { useState } from 'react';
import './App.css'

import CatBox from '@/components/CatBox/CatBox';
import MenuBar from '@/components/MenuBar/MenuBar';

import OpenStore from './components/OpenStore/OpenStore';
import Version from './components/Version/Version';

function App() {
  return (
    <>
      <CatBox />
      <MenuBar />
      <OpenStore id="open-store" />
      <Version id="version" version={ import.meta.env.VITE_APP_VERSION }/>
    </>
  )
}

export default App
