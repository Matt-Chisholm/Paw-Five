import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import './App.css';
import Example from './components/example';
import NavBar from './components/NavBar';
import Profile from './components/Profile';
import Recorder from './components/Recorder';


export default function App(props) {
  
  const tabs = ["Home", "Training", "Profile"];
  const [tab, setTab] = useState("Home");
  const [cookie, setCookie, removeCookie] = useCookies(["user_id"]);


  return (
    <div className="App">
        <button className='log_in_btn' onClick={() => {setCookie("user_id", 1)}}>Log In</button>
        <h1>Paw Five</h1>
        <Example />
        {tab==="Training" && <Recorder />}

        {tab==="Profile" && <Profile />}
        <NavBar 
          tab={tab}
          tabs={tabs}
          onChange={setTab}
        />

      </div>
  )
}


