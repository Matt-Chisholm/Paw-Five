import { useEffect, useState } from 'react'
import { RadialBarChart, RadialBar, Legend, Tooltip, Label, LabelList } from "recharts";
import './Rainbow.scss'
import axios from 'axios'

export default function Rainbow (){
  const [days, setDays] = useState([]); // days, with an 's'
  // days example: [{id: 1, name: 'monday', uv: 100, pv: 2000, fill: '#8884d8', ...]
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
      <RadialBarChart
        className="radialBarChart"
        width={380}
        height={400}
        // height={270}
        // cx={150}
        cy={-30}
        innerRadius={60}
        outerRadius={350}
        barSize={80}
        data={days}
        startAngle={200}
        endAngle={340}
      >
      <RadialBar
        // minAngle={23}
        label={{ 
          position: "insideBottom", 
          fill: `#FFD873`, 
          dataKey: "name",
          fontFamily: "Futura",
          fontSize: "1.5em",
        }}
        background
        clockWise
        dataKey="uv"
      >
      </RadialBar>
      <Tooltip
      
      />
    </RadialBarChart>
    </div>
  );

};

/*
NOTE
a. Any charts from RECHARTS, like RadialBarChart, library are very dependant on 
in-line styling and mostly will not accept stylesheets


*/