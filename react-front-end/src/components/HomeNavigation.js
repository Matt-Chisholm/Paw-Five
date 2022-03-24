import React, { useState } from "react";
import "./HomeNavigation.scss";



export default function HomeNavigation(props) {
  const tabs = ["Stats", "Health", "Pawstory", "Memuries"];
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