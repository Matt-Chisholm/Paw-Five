import react, { useEffect, useState } from 'react'
import { RadialBarChart, RadialBar, Legend, Tooltip, ResponsiveContainer } from "recharts";
import './Rainbow.scss'
import axios from 'axios'

/*
1. get chart working
2. make data for week
    - id, name, status
3. make a route
4. connect route to request here
5. make a state containing the days
6. create function to match today's date to the day

- if today's date matches, time stamp of session, update the db. how to select which row?
- get the date now and match the 
*/

export default function Rainbow (){
 const [days, setDays] = useState([]);
 const [ day, setDay ] = useState("");


  // get database of days for rainbow chart
  useEffect(()=>{
    axios
      .get('api/home/days')
      .then(success => {
        setDays(success.data);
      })
      .catch(error => {
        console.log("error in Rainbow Component useEffect: ", error);
      });

      return () => {
        setDays([]);
      };
  },[])
  
  // setting state: the day of the week
  const now = new Date();
  const daysOfTheWeek = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const todayDate = `${now.getFullYear()}-${(now.getMonth() + 1) < 10 && 0}${now.getMonth() + 1}-${now.getDate()}`
  useEffect(() => {
    setDay(daysOfTheWeek[now.getDay()].toLowerCase());    
    console.log("TJ day of the week", todayDate)
  }, []);

  // getting the sessions of today, if any
  useEffect(() => {
    axios
      .get(`api/home/session/${todayDate}`)
      .then((success) => {
        console.log("TJ success Rainbow Component useEffect2", success);
      })
      .catch(error => {
        console.log("error in Rainbow Component useEffect2: ", error);
      });
  }, []);



  // view
  return (
    <div>
      <p>
        HELLO{day}
        </p>
      <RadialBarChart
      className="radialBarChart"
      width={730}
      height={470}
      // height={270}
      // cx={150}
      cy={100}
      innerRadius={150}
      outerRadius={350}
      barSize={70}
      data={days}
      startAngle={180}
      endAngle={360}
    >
      <RadialBar
        minAngle={15}
        label={{ position: "insideStart", fill: `#${days.fill}` }}
        background
        clockWise
        dataKey="uv"
      />
      <Legend
        iconSize={10}
        width={120}
        height={140}
        layout="vertical"
        verticalAlign="middle"
        // wrapperStyle={style}
      />
      <Tooltip/>
      </RadialBarChart>
    </div>
  )

}
