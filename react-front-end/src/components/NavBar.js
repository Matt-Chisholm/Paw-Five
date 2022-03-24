import React from 'react';
import './NavBar.scss';
import NavBarItem from './NavBarItem';
import home from './images/home.png'

export default function NavBar(props) {

  const navBarList = props.tabs.map((tab, index) => <NavBarItem
    key={index}
    name={tab}
    selected={tab === props.tab}
    onChange={props.onChange}/>
  )
  return (
    <nav className='mainNavBar'>
      {navBarList}       
    </nav>
  )
}
