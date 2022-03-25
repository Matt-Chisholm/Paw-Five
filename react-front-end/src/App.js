import React, { useState } from "react";
import { useCookies } from "react-cookie";
import "./App.scss";
import NavBar from "./components/NavBar";
import Profile from "./components/Profile";
import Recorder from "./components/Recorder";
// import Session from './components/Session';
import HeaderBar from "./components/HeaderBar";
import Tutorial from "./components/Tutorial";
import Clicker from "./components/Clicker";
import Squeaker from "./components/Squeaker";
import LogIn from "./components/LogIn";

import Home from "./components/Home";

export default function App(props) {
  const tabs = ["Home", "Training", "Profile"];
  const [tab, setTab] = useState("Home");
  const [cookies, setCookie, removeCookie] = useCookies(["user_id"]);
  const [isLoading, setIsLoading] = useState(false);


  return (
    <>
      {cookies["user_id"] ?
        <div className="App">
          <HeaderBar />
          {tab === "Home" && <Home user_id={cookies["user_id"]}/>}
          {tab === "Training" && <Recorder />}

          {tab === "Profile" && <Profile user_id={cookies["user_id"]} isLoading={isLoading} setIsLoading={(p) => setIsLoading(p)}/>}
          <NavBar tab={tab} tabs={tabs} onChange={setTab} />
        </div> : <LogIn setCookie={setCookie} />
      }
    </>
  );
}
