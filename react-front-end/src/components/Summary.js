import react, { useState, useEffect } from 'react';
import axios from 'axios';


export default function Summary () {
const [ sessionCount, setSessionCount ] = useState(0)
const [ skillCount, setSkillCount ] = useState(0)
const [ memuryCount, setMemuryCount ] = useState(0)

  // request for total skills
  // request for total memuries. will have to make db for that
  
  
// request for total sessions
// update on first load and everytime a session is created
useEffect(() => {

  const getSessionsTotalURL = axios.get('/api/home/sessions-total');
  const getSkillsTotalURL = axios.get('/api/home/skills-total');
  const getMemuriesTotalURL = axios.get('api/home/memuries-total');

  const promises = [ getSessionsTotalURL, getSkillsTotalURL, getMemuriesTotalURL ];

  Promise.all(promises)
    .then(all => {

      // once figured out which data is which set the state
      // setSessionCount();
      // setSkillCount();
      // setMemuryCount();
      console.log("success for all summary component", all)
    })
    .catch(error => {
      console.log("Summary component error ", error.data);
    });

}, [])


  return (
    <div className='summary'>
      {/* {sessionCount} */}
      {/* {skillCount} */}
      {/* {memuryCount} */}
      <p>HELLO SUMMARY</p>
    </div>
  );
};