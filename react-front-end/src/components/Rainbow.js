import { useEffect, useState } from 'react'
import { RadialBarChart, RadialBar, Tooltip, Label, LabelList, ResponsiveContainer } from "recharts";
import './Rainbow.scss'
import axios from 'axios'

import pawteam from './images/pawteam.png';

export default function Rainbow (){
  const [days, setDays] = useState([]); // days, with an 's'
  // days example: [{id: 1, name: 'monday', uv: 100, pv: 2000, fill: '#8884d8', ...]
  const [ day, setDay ] = useState("");
 
  const [ viewPort, setViewPort ] = useState(null);
  const [ mobileView, setMobileView ] = useState("true");
  const [ rainbowWidth, setRainbowWidth ] = useState(420);
  
  
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

  useEffect(()=> {
    if (window.innerWidth > 775) {
      return setRainbowWidth(900);
    };
  }, [])

// manipulate the database using buttons to show off colors adding to rainbow: make an axios request to update uv to 0
const handleDemoButton = () => {
  axios
    .post('api/home/session/demo')
    .then(success => {
      console.log("Success handleDemoButton", success);
    })
    .catch(error => {
      console.log("Error handleDemoButton", error);
    })
};


  // VIEW
  return (
    <>
    <img className='rainbow-pawteam' src={pawteam} />
    <div className='rainbow-div'>
    {/* <ResponsiveContainer width={'99%'} height={345}> */}
  
      <RadialBarChart
        className="radialBarChart"
        // viewBox={{x: "100%", y: "100%"}}
        width={rainbowWidth}
        height={300}
        // height={270}
        // cx={150}
        cy={-30}
        innerRadius={60}
        outerRadius={350}
        barSize={80}
        data={days}
        startAngle={180}
        endAngle={360}
      >

      <RadialBar
        // minAngle={23}
        label={{ 
          position: "inside",
          offset: 1, 
          fill: `#0DA4C5`, 
          dataKey: "",
          fontFamily: "Futura",
          fontSize: "1.5em",
        }}
        background
        clockWise
        dataKey="uv"
      >
      </RadialBar>
    </RadialBarChart>
    <div>

    </div>
    {/* </ResponsiveContainer> */}
    </div>
    </>

  );

};

/*
NOTE
a. Any charts from RECHARTS, like RadialBarChart, library are very dependant on 
in-line styling and mostly will not accept stylesheets


*/