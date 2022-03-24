import React, { useState } from "react";
import "./HomeNavigation.scss";



export default function HomeNavigation(props) {
  const tabs = ["Stats", "Health", "Social", "News", "Memuries"];
  const [tab, setTab] = useState("Stats");


  return (
    <div className="App">
      {tab === "Stats" && <Stats />}
      {tab === "Health" && <Health />}
      {tab === "Social" && <Social />}
      {tab === "News" && <News />}
      {tab === "Memuries" && <Memuries />}
    </div>
  );
}