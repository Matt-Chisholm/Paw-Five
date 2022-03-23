import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Skills.scss"

export default function Skills(props) {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    axios.get(`/api/profile/skills/${props.dog_id}`).then((response) => {
      const percents = response.data;
      setSkills(percents);
    });
  }, []);


  let skillRows = () => {
    return skills.map((skill, index) => {
      return <div key={index} className='skills_rows'>
        <div className='skill_details'>
          <label className='skill_label'>{skill.name}</label>
          <div className='progress_container'>
            <div className='progress_bar' style={{width: `${skill.rating > 20 ? skill.rating : 20}%`}}>
              <span className='percent_completed'>{`${skill.rating > 20 ? skill.rating : 20}%`}</span>
            </div>
          </div>
          {skill.rating === 100 && <span className='skill_star'>🏅</span>}
        </div>
      </div>
    });
  }
  
  return (
    <div className='skills'>
      <div id='skills_license'>
        <h2>SKILLS</h2>
        {skills.length > 5 && <span className='scroll_down_text'>Scroll down to see more</span>}
        {skills.length > 5 &&  <div className="arrow">
                    <span></span>
                    <span></span>
                    <span></span>
          </div>
        }
      </div>
      {skills.length > 0 && skillRows()}
    </div>
  )
}
