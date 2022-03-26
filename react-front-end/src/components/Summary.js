import react, { useState, useEffect } from 'react';
import './Summary.scss'
import axios from 'axios';


export default function Summary () {
const [ summaryTotal, setSummaryTotal ] = useState({
  sessions: 0,
  skills: 0,
  memuries: 0,
});

// retrieves statistics
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
    })
    .catch(error => {
      console.log("Summary component Promise.all error ", error);
    });  
}, []);

  return (
    <div className='summary'>
      <section>
        Sessions: {summaryTotal.sessions} 
      </section>
      <section>
        Skills: {summaryTotal.skills} 
      </section>
      <section>
        Memuries: {summaryTotal.memuries}
      </section>
      <section>
        Empty
      </section>
    </div>
  );
};