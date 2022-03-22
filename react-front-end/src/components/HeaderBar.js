import React from 'react';
import './HeaderBar.scss';
import setting from './images/setting.svg'

export default function HeaderBar() {

  return (
    <header>
      <div className="logo">
        PAWFIVE
      </div>
      <img className="setting" src={setting} />
    </header>
  )
}
