import React from 'react';
import './NavBar.scss';
import classNames from "classnames";


export default function NavBarItem(props) {
  let tabClass = classNames('tab__item', {
    'tab__item--selected': props.selected
  });

  return (
    <li className={tabClass}
      onClick={() => props.onChange(props.name)}>{props.name}</li>
  )
}
