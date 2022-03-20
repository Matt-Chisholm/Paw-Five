import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import './App.css';
import NavBar from './components/NavBar';
import Profile from './components/Profile';
import Recorder from './components/Recorder';
import Session from './components/Session';

import Home from './components/home';

export default function App(props) {
  
  const tabs = ["Home", "Training", "Profile"];
  const [tab, setTab] = useState("Home");
  const [cookies, setCookie, removeCookie] = useCookies(["user_id"]);


  return (
    <div className="App">
        <button className='log_in_btn' onClick={() => {setCookie("user_id", 1)}}>Log In</button>
        
        {tab==="Home" && <Home />}

        {tab==="Training" && <Recorder />}
        {tab==="Training" && <Session />}

        {tab==="Profile" && <Profile user_id={cookies["user_id"]}/>}
        <NavBar 
          tab={tab}
          tabs={tabs}
          onChange={setTab}
        />

      </div>
  )
}


