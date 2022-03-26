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
      <section>
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
      <section>
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
      <section>
        <h1>
          <p>
            Empty
          </p>
          <p>
          </p>
        </h1>
        <h4>
        </h4>
      </section>
    </div>
  );
};