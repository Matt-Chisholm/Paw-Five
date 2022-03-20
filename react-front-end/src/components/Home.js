import React, { useState } from 'react';
import './Home.scss';

export default function Home () {




  return (
    <div>
      <div className="header">
        <div className="app-logo">
          <img src="https://github.com/Matt-Chisholm/Paw-Five/blob/master/Planning/logo.png?raw=true" alt='' />
        </div>
        <div className="user-logo">
          <img src="images/face.png"/>
        </div>
      </div>
      <div className='home-body'>
        <div>
          <p>Last training</p>
        </div>
        <div className='home-summary'>
          <h3>Summary</h3>
          <div className='home-stats'>
            <span>stats1</span>
            <span>stats2</span>
            <span>stats3</span>
            <span>stats4</span>
          </div>
        </div>
        <div>
          <p>Tipbar</p>
        </div>
      </div>
    </div>
    )
}