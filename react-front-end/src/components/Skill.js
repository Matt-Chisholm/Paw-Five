import React from 'react';


export default function Skill(props) {
  
  return (
    <li className='skill_details'>
      <span className='skill_name'>{props.name}</span>
      <br />
      <span className='skill_desctiption'>{props.description}</span>
    </li>    
  )
}
