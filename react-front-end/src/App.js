import React, { useState } from "react";
import { useCookies } from "react-cookie";
import "./App.scss";
import NavBar from "./components/NavBar";
import Profile from "./components/Profile";
import Recorder from "./components/Recorder";
import HeaderBar from "./components/HeaderBar";
import Landing from "./components/Landing";

import './csshake.scss';
import './wickedcss.min.css'
import Home from "./components/Home";

export default function App(props) {
  const tabs = ["Home", "Training", "Profile"];
  const [tab, setTab] = useState("Home");
  const [cookies, setCookie, removeCookie] = useCookies(["user_id"]);
  const [isLoading, setIsLoading] = useState(true);
  const [logOutMenu, setLogOutMenu] = useState(false);

  return (
    <>
      {cookies["user_id"] ?
        <>
          {logOutMenu &&
            <>
              <div className="covering-container">
              </div>
              <div id="logOut-menu">
                <span className="logOut-confirm-text">
                  Are you sure you want to Log Out?
                </span>
                <button className="logOut-button" onClick={() => { removeCookie("user_id"); setLogOutMenu(false) }}>Log Out</button>
                <button className="logOut-cancel" onClick={() => setLogOutMenu(false)}>Cancel</button>
              </div>
            </>
          }
          <div className="App">
            <HeaderBar showLogOutMenu={() => setLogOutMenu(true)} />
            {tab === "Home" && <Home user_id={cookies["user_id"]} isLoading={isLoading} setIsLoading={setIsLoading} />}
            {tab === "Training" && <Recorder isLoading={isLoading} setIsLoading={setIsLoading} />}
            {tab === "Profile" && <Profile user_id={cookies["user_id"]} isLoading={isLoading} setIsLoading={setIsLoading} setTab={setTab} />}
            <NavBar tab={tab} tabs={tabs} onChange={setTab} />
          </div>
        </> : <Landing setCookie={setCookie} />
      }
    </>
  );
}
