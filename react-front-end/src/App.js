import React, { useState } from 'react';
import './App.css';
import Example from './components/example';
import NavBar from './components/NavBar';
import Recorder from './components/Recorder';
export default function App(props) {

  const tabs = ["Home", "Training", "Switch Dog", "Profile"];
  const [tab, setTab] = useState("Home");


  return (
    <div className="App">
        <h1>Paw Five</h1>
        <Example />
        <Recorder />
        <NavBar 
          tab={tab}
          tabs={tabs}
          onChange={setTab}
        />

      </div>
  )
}


