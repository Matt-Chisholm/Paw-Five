import axios from "axios";
import { useEffect, useState } from 'react';
import './Week.scss';
import arrow from './images/blue-arrow.svg';
import squirrel from './images/squirrel.svg';

export default function Week () {
  const [ daysData, setDaysData ] = useState();
  //  example data: [0] id: 2 name: "tuesday" pv: 2000 uv: 0 fill: "#83a6ed", [1]...



  const daysOfTheWeekAbbr = ["Mon", "Tue", "Wed", "Thr", "Fri", "Sat", "Sun"];
   // if the id of the day matches with the abbr day, AND the data uv value is > 0, then render
   const renderDays = daysOfTheWeekAbbr.map( (day, index) => { 
    return <div key={index +1} className="day-abbr">
      {day}
    </div>
  });
  

  useEffect(() =>{  
    axios
      .get('api/home/days')
      .then(days => {
        // is there a way to sort this by id?
        setDaysData(days.data);
        // console.log("TJ", daysData);
        })
        .catch(err => {
          console.log("TJ error", err);
        })

        return () => {setDaysData()}
  }, [])

  const renderTrainedDays = (data) => {
    return data.map((datum, index) => { 
      return  <div key={index +1} className="trainedDay">
        <img src={squirrel} />
        {/* <p className={datum.id}> hell</p> */}
        </div>
    })
  }


// VIEW
  return (
    <>
      <img src={arrow} className="arrow"/>
      <h2 className="week-heading rainbow"> Train <span>e</span>very<span>day</span>. Much colors</h2>
      <br/>
      <div className="week top">
        {renderDays}
      </div>
        <div className="week bottom">
           {daysData && renderTrainedDays(daysData)}
          </div>
      <br/>
      <h2 className="week-heading">Consistency is <span className="key">Key</span>. One day at a time:</h2>
      <br/>

    </>
  )
};