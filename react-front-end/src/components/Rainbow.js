import react, { useEffect, useState } from 'react'
import { RadialBarChart, RadialBar, Legend, Tooltip, ResponsiveContainer } from "recharts";
import './Rainbow.scss'
import axios from 'axios'

// temporary data
const daata = [
  {
    id: 1,
    name: "Monday",
    uv: 31.47,
    pv: 2400,
    fill: "#8884d8"
  },
  {
    name: "25-29",
    uv: 26.69,
    pv: 4567,
    fill: "#83a6ed"
  },
  {
    name: "30-34",
    uv: 15.69,
    pv: 1398,
    fill: "#8dd1e1"
  },
  {
    name: "35-39",
    uv: 8.22,
    pv: 9800,
    fill: "#82ca9d"
  },
  {
    name: "40-49",
    uv: 8.63,
    pv: 3908,
    fill: "#a4de6c"
  },
  {
    name: "50+",
    uv: 2.63,
    pv: 4800,
    fill: "#d0ed57"
  },
  {
    name: "unknow",
    uv: 6.67,
    pv: 4800,
    fill: "#ffc658"
  }
];
/*
1. get chart working
2. make data for week
    - id, name, status
3. make a route
4. connect route to request here
5. make a state containing the days
6. create function to match today's date to the day

*/

export default function Rainbow (){
 const [days, setDays] = useState([]);

  const data = [];
  useEffect(()=>{
    axios
      .get('api/home/days')
      .then(success => {
        console.log("TJ success", success);
        setDays(success.data);
        console.log("TJ success data pushed?", data);
      })
      .catch(error => {
        console.log("error in Rainbow Component useEffect: ", error);
      });

      return () => {
        setDays([]);
      };
  },[])

  
// const getDaysofWeek = {

// }
const test = 'fff';
  return (
    <div>
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
