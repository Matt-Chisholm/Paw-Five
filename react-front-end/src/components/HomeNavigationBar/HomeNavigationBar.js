import React from "react";
import "./HomeNavigationBar.scss";
import HomeNavigationBarItem from "./HomeNavigationBarItem";

export default function HomeNavigationBar(props) {

  const HomeNavigationList = props.tabs.map((tab, index) =>{
    return <HomeNavigationBarItem 
    key={index} 
    name={tab} 
    selected={tab === props.tab}
    setSelected={props.onChange}
    />
  });


  return (
    
    <nav className="homeNavigationBar">
      {HomeNavigationList}
    </nav>
  );
}