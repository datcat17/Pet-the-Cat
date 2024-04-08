import { useState, useEffect } from 'react';
import './App.css'

import CatBox from '@/components/CatBox/CatBox';
import MenuBar from '@/components/MenuBar/MenuBar';

import OpenStore from './components/OpenStore/OpenStore';
import Version from './components/Version/Version';

import loadFiles from '@/logic/loader.js';

function App() {
  useEffect(() => {
    loadFiles();
  }, [])

  return (
    <>
      <CatBox />
      <MenuBar />
      <OpenStore id="open-store" />
      <Version id="version" version={ __APP_VERSION__ }/>
    </>
  )
}

export default App
