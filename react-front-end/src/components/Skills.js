import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Skills.scss"

export default function Skills(props) {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    axios.get(`/api/profile/skills/${props.dog_id}`).then((response) => {
      console.log('props', props.dog_id);
      const percents = response.data;
      console.log(percents);
      setSkills(percents);
    });
  }, []);

  // const completed = 80;

  let skillRows = () => {
    return skills.map((skill, index) => {
      return <div key={index} className='skills_rows'>
        <div className='skill_details'>
          <label className='skill_label'>{skill.name}</label>
          <div className='progress_container'>
            <div className='progress_bar' style={{width: `${skill.rating}%`}}>
              <span className='percent_completed'>{`${skill.rating}%`}</span>
            </div>
          </div>
          {skill.rating === 100 && <span className='skill_star'>🏅</span>}
        </div>
      </div>
    });
  }
  
  return (
    <div className='skills'>
      <h2>SKILLS</h2>
      {skills.length > 0 && skillRows()}
    </div>
  )
}
