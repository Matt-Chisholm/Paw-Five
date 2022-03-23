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
import Home from "./components/Home";

export default function App(props) {
  const tabs = ["Home", "Training", "Profile"];
  const [tab, setTab] = useState("Home");
  const [cookies, setCookie, removeCookie] = useCookies(["user_id"]);
  const [isLoading, setIsLoading] = useState(false);


  return (
    <div className="App">
      <HeaderBar />
      <button className="log_in_btn" onClick={() => {setCookie("user_id", 1);}}>
        Log In
      </button>

      {tab === "Home" && <Home user_id={cookies["user_id"]}/>}
      {tab === "Training" && <Recorder />}

      {tab === "Profile" && <Profile user_id={cookies["user_id"]} isLoading={isLoading} setIsLoading={(p) => setIsLoading(p)}/>}
      <NavBar tab={tab} tabs={tabs} onChange={setTab} />
      </div>
  );
}
