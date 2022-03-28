import axios from "axios";
import { useEffect } from 'react';

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
    <div className="week">
      {renderDays}
    </div>
  )
};