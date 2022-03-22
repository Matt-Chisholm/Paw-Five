import React from 'react';
import './NavBar.scss';
import NavBarItem from './NavBarItem';
// import img from '../../public/images/setting.png'

export default function NavBar(props) {

  const navBarList = props.tabs.map((tab, index) => <NavBarItem
    key={index}
    name={tab}
    selected={tab === props.tab}
    onChange={props.onChange}/>
  )
  return (
    <nav>
        {/* <img src={img}></img> */}

      {navBarList}       
    </nav>
  )
}
