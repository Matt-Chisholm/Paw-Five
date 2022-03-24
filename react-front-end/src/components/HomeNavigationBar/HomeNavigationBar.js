import React from "react";
import "./HomeNavigationBar.scss";
import HomeNavigationBarItem from "./HomeNavigationBarItem";

export default function HomeNavigationBar(props) {

  const HomeNavigationList = props.tabs.map((tab, index) =>{
    return <HomeNavigationBarItem 
    key={index} 
    name={tab} 
    selected={tab === props.selected}
    setSelected={props.onChange}
    />
      {/* HELLO + {tab}
    </HomeNavigationBarItem> */}
  });


  return (
    
    <nav className="homeNavigationBar">
      HOMENAVBar 
      {HomeNavigationList}
    </nav>
  );
}