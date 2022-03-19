import React, { useState } from 'react';
import './Home.css';

export default function Home () {




  return (
    <div>
      <div className="header">
        <h2>Welcome User!</h2>
        <div>
          <img
            className="user-logo"
            src="images/face.png"
          />
        </div>
      </div>
      <div className='home-body'>
        <div>
          <p>Last training</p>
        </div>
        <div>
          <h3>Summary</h3>
          <div>
            <p>stats1</p>
            <p>stats2</p>
            <p>stats3</p>
            <p>stats4</p>
          </div>
        </div>
        <div>
          <p>Tipbar</p>
        </div>
      </div>
    </div>
    )
}