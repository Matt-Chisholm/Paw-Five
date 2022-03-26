import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Skills.scss"

export default function Skills(props) {
  const {setIsDetailsLoading, skills} = props;


  let skillRows = () => {
    return skills.map((skill, index) => {
      return <div key={index} className='skills_rows'>
        <div className='skill_details'>
          <label className='skill_label'>{skill.name}</label>
          <div className='progress_container'>
            <div className='progress_bar' style={{width: `${skill.rating * 5 > 20 ? skill.rating * 5 : 20}%`}}>
              <span className='percent_completed'>{`${skill.rating * 5 > 20 ? skill.rating * 5 : 20}%`}</span>
            </div>
          </div>
          {skill.rating * 5 === 100 && <span className='skill_star'>🏅</span>}
        </div>
      </div>
    });
  }
  
  return (
    <div className='skills'>
      <div id='skills_license'>
        <h2>SKILLS</h2>
        {skills.length > 4 && <span className='scroll_down_text'>Scroll down to see more</span>}
        {skills.length > 4 &&  <div className="arrow">
                    <span></span>
                    <span></span>
                    <span></span>
          </div>
        }
      </div>
      {skills.length > 0 ? skillRows() : <span className='no_skills scroll_down_text'>No Skills achieved yet...</span>}
    </div>
  )
}
