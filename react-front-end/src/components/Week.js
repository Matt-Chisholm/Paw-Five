import axios from "axios";
import { useEffect } from 'react';
import './Week.scss';
import arrow from './images/arrow.png';

export default function Week () {

  // return days of the week
  const daysOfTheWeekAbbr = ["Mon", "Tue", "Wed", "Thr", "Fri", "Sat", "Sun"];
  
  useEffect(() =>{

    axios
      .get('api/home/days')
        .then(days => {
          console.log("TJ", days.data)
        })
        .catch(err => {
          console.log("TJ error", err);
        })

  }, [])

  // if the id of the day matches with the abbr day, AND the data uv value is > 0, then render
  const renderDays = daysOfTheWeekAbbr.map( (day, index) => { 
    return <div key={index +1} className="day-abbr">
      {day}
    </div>
  })


// VIEW
  return (
    <>
      <img src={arrow} className="arrow"/>
      <h2 className="week-heading rainbow"> Train <span>e</span>very<span>day</span>. Much colors</h2>
      <h2 className="week-heading">Consistency is <span className="key">Key</span>. One day at a time:</h2>
      <br/>
      <div className="week">
        {renderDays}
      </div>
      <br/>
    </>
  )
};