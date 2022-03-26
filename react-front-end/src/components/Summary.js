import react, { useState, useEffect } from 'react';
import axios from 'axios';


export default function Summary () {
const [ sessionCount, setSessionCount ] = useState(0)
const [ skillCount, setSkillCount ] = useState(0)
const [ memuryCount, setMemuryCount ] = useState(0)

// can try to combine state later
const [ summaryTotal, setSummaryTotal ] = useState({
  sessions: 0,
  skills: 0,
  memuries: 0,
});





// request for total sessions
// request for total skills
// request for total memuries. will have to make db for that

// Promise.all(promises)
useEffect(() => {
  const getSessionsTotalURL = axios.get('/api/home/summary/sessions');
  const getSkillsTotalURL = axios.get('/api/home/summary/skills');
  const getMemuriesTotalURL = axios.get('api/home/summary/memuries');
  
  const promises = [ 
    getSessionsTotalURL,
    getSkillsTotalURL, 
    getMemuriesTotalURL 
  ];

Promise.all(promises)
    .then(all => {
      setSummaryTotal(prev => {
        const sessions = all[0].data[0].count;
        const skills = all[1].data[0].count;
        const memuries = all[2].data[0].count;
        return {
          ...prev,
          sessions,
          skills,
          memuries
        };
      });
      // console.log("success for Promise.all summary component", all[0].data[0])
      // console.log("success for Promise.all summary component", all[1].data[0])
      // console.log("success for Promise.all summary component", all[2].data[0])
    })
    .catch(error => {
      console.log("Summary component Promise.all error ", error);
    });  
}, []);
  // once figured out which data is which set the state
  // setSessionCount();
  // setSkillCount();
  // setMemuryCount();
  

  return (
    <div className='summary'>
      Sessions: {summaryTotal.sessions} 
      Skills: {summaryTotal.skills} 
      Memuries: {summaryTotal.memuries}
    </div>
  );
};