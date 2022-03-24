import { useEffect, useState } from 'react'
import { RadialBarChart, RadialBar, Legend, Tooltip } from "recharts";
import './Rainbow.scss'
import axios from 'axios'

export default function Rainbow (){
  const [days, setDays] = useState([]);
  const [ day, setDay ] = useState("");
 
  // CONSTANTS
  const now = new Date();
  const daysOfTheWeek = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const todaysDate = `${now.getFullYear()}-${(now.getMonth() + 1) < 10 && 0}${now.getMonth() + 1}-${now.getDate()}`

  // GETS DATABASE FOR DAY*S* STATE (dep: RadialBarChart)
  useEffect(()=>{
    axios
      .get('api/home/days')
      .then(success => setDays(success.data))
      .catch(error => console.log("error in Rainbow Comp useE1: ", error));
      return () => setDays([]);
  }, [])
  
  // 1. SETS TODAY DAY OF THE WEEK, e.g. 'monday'
  // 2. GETS SESSIONS FOR DAY*S* STATE (dep: RadialBarChart)
  useEffect(() => {
    setDay(daysOfTheWeek[now.getDay()].toLowerCase())
    if (day) {
      axios
        .get(`api/home/session/${todaysDate}`)
        .then((didTrainToday) => {
          if (!didTrainToday) return;
        })
        // 3. UPDATES DB: DAY TABLE, (dep: RadialBarChart values)
        .then(() => {
          axios
            .post(`api/home/session/${day}`)
            .then(success => {return;})
            .catch(error => {return;})
        })
        .catch(error => {
        console.log("error in Rainbow Component useEffect2: ", error);
      });
    }
  }, [day]);



  // VIEW
  return (
    <div>
      {/* <p> HELLO {day}</p> */}
      <RadialBarChart
        className="radialBarChart"
        width={375}
        height={400}
        // height={270}
        // cx={150}
        cy={-30}
        innerRadius={60}
        outerRadius={350}
        barSize={80}
        data={days}
        startAngle={0}
        endAngle={360}
      >
      <RadialBar
        minAngle={23}
        label={{ position: "insideStart", fill: `#${days.fill}` }}
        background
        clockWise
        dataKey="uv"
      />
      <Legend
        iconSize={50}
        width={150}
        height={100}
        layout="horizontal"
        verticalAlign="top"
        // wrapperStyle={style}
      />
      <Tooltip/>
      </RadialBarChart>
    </div>
  )

}

/*
NOTE
a. Any charts from RECHARTS, like RadialBarChart, library are very dependant on 
in-line styling and mostly will not accept stylesheets


*/