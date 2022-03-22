import React from 'react';
import './NavBar.scss';
import classNames from "classnames";
import home from './images/home.png'


export default function NavBarItem(props) {
  let tabClass = classNames('tab__item', {
    'tab__item--selected': props.selected
  });

  return (
    <span className={tabClass} onClick={() => props.onChange(props.name)}>
      {props.name === "Home" && <img src={home} />}
      {props.name === "Training" && <img src={home} />}
      {props.name === "Profile" && <img src={home} />}
    </span>
  )
}
