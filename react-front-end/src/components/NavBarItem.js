import React from 'react';
import './NavBar.scss';
import classNames from "classnames";
import home from './images/home.png'
import training from './images/training.png'
import profile from './images/profile.png'


export default function NavBarItem(props) {
  let tabClass = classNames('tab__item', {
    'tab__item--selected floater': props.selected
  });

  return (
    <span className={tabClass} onClick={() => props.onChange(props.name)}>
      {props.name === "Home" && <img src={home} alt={props.name}/>}
      {props.name === "Training" && <img src={training} alt={props.name}/>}
      {props.name === "Profile" && <img src={profile} alt={props.name}/>}
    </span>
  )
}
