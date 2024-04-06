import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <App />,
)

// Dynamically load all scripts in the above list
function loadScript(url) {
  let head = document.getElementsByTagName('head')[0];
  let script = document.createElement('script');
  script.type = 'module';
  script.src = url;
  script.defer = true;

  head.appendChild(script);
}

loadScript("src/logic/loader.js");