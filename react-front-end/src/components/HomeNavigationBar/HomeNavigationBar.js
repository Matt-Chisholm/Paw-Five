import React, { useState } from "react";
import "./HomeNavigationBar.scss";
import HomeNavigationBarItem from "./HomeNavigationBarItem"

export default function HomeNavigationBar(props) {

  const generateHomeNavItems = props.tabs.map((tab, index) =>{
    return <HomeNavigationBarItem key={index} name={tab} selected={tab === props.tab}>
      HELLO + {tab}
    </HomeNavigationBarItem>
  });


  return (
    <div className="homeNavigationBar">
      {generateHomeNavItems}
    </div>
  );
}