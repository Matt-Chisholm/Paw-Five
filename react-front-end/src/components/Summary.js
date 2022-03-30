import react, { useState, useEffect } from 'react';
import './Summary.scss'
import axios from 'axios';

import whistle from './images/stat-whistle.svg';
import graduate from './images/stat-graduate.svg';
import heart from './images/stat-heart.svg';



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
    <div>
    <div className='summary'>
      <section className='stats__sessions'>
        <h1>
          {summaryTotal.sessions}
        </h1>
        <h4>
          <p>
            Sessions 
          </p>
          <p>
            completed
          </p>
        </h4>
      </section>
      <section className='stats__skills'>
        <h1>
          {summaryTotal.skills} 
        </h1>
        <h4>
          <p>
            Skills 
          </p>
          <p>
            mastered
          </p>
        </h4>
      </section>
      <section className='stats__memuries'>
        <h1>
          {summaryTotal.memuries}
        </h1>
        <h4>
          <p>
            Memuries 
          </p>
          <p>
            created
          </p>
        </h4>
      </section>
      <section className='stats__poops'>
        <h1>
            0
        </h1>
        <h4>
          <p>
            Poops
          </p>
          <p>
            taken
          </p>
        </h4>
      </section>
    </div>

    </div>

  );
};