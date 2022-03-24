import React from 'react';
import './HomeNavigationBar.scss';
import classNames from "classnames";

export default function HomeNavigationBarItem(props) {
  let tabClass = classNames('tab__item', {
    'tab__item--selected': props.selected
  });

  return (
    <span className={tabClass} onClick={() => props.setSelected(props.name)}>
      <div>
        <h3>{props.name}</h3>
      </div>
    </span>
  )
}
