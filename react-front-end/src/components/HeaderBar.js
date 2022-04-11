import React from 'react';
import './HeaderBar.scss';
import setting from './images/setting.svg'
import menu from './images/hamburger-menu.svg';

export default function HeaderBar(props) {

  return (
    <header>
      <img className="header-menu" src={menu} />
      <div className="logo">
        PAWFIVE
      </div>
      <img className="setting" src={setting} onClick={props.showLogOutMenu} />
    </header>
  )
}
