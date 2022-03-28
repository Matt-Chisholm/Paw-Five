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

  
  const renderDays = daysOfTheWeekAbbr.map(day => {
  
    return 
  })
  return (
    <div className="week">
      WEEEK
    </div>
  )
};