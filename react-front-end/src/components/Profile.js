import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import './Profile.scss';
import Skill from './Skill';


export default function Profile(props) {
  const [dog, setDog] = useState();
  const [skills, setSkills] = useState();
  useEffect(() => {
    axios.get(`/api/profile/dog/${props.user_id}`).then((response) => {
      const dog = response.data;
      setDog(dog);

      axios.get(`/api/profile/skills/${dog.id}`).then((res) => {
        setSkills(res.data);
      });
    });
  }, []);

    // const skillsList = [];

    // if (skills) {
    //   skillsList = skills.map((skill, index) => <Skill
    //     key={index}
    //     name={skill.name}
    //     description={skill.description} />)
    // }

  return (
    <div>
      <div className='dog_details'>
        {dog && <img className='avatar' src={dog.avatar} />}
        <div className='dog_info'>
          {dog && <h4 className='dog_name'>{dog.name}</h4>}
          {dog && <h4 className='dog_breed'>{dog.breed}</h4>}
        </div>
      </div>

      <div className='skills'>
        <ul>
          {skills && skills.map((skill, index) => <Skill
            key={index}
            name={skill.name}
            description={skill.description} />)}
        </ul>
      </div>
    </div>
  )
}
