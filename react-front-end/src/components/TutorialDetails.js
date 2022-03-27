import { useState, useEffect } from "react";
import axios from "axios";
import "./TutorialDetails.scss";
import sit from "./images/sit.svg";
import bark from "./images/bark.svg";
import down from "./images/down.svg";
import come from "./images/come.svg";
import sing from "./images/sing.svg";
import paw from "./images/paw.svg";


export default function TutorialDetails(props) {
  const [tutorial, setTutorial] = useState({});

  useEffect(() => {
    axios.get(`/api/tutorial/details/${props.tutorial_id}`).then((response) => {
      setTutorial(response.data[0]);
    })
      .catch(error => {
        console.log("error from TutorialDetails.js component useEffect: ", error);
      });
  }, []);

  const renderedSteps = () => tutorial.description.map((step, index) => {
    return <p key={index} className="tutorial-step">
      <span>{index + 1}.</span> {step}
    </p>
  });
  const logos = {
    sit,
    bark,
    sing,
    paw,
    come,
    down
  }

  return (
    <>
      {tutorial.description &&
        <div className="tutorial-details">
          <div
            className={`tutorial-item ${tutorial.level}`}
          >
            <div className="icon">
              {tutorial.name === 'Sitting' && 
                <img src={sit} />
              }
              {tutorial.name === 'Bark' && 
                <img src={bark} />  
              }
              {tutorial.name === 'Sing' && 
                <img src={sing} />  
              }
              {tutorial.name === 'Give A Pow' &&
                <img src={paw} />
              }
              {tutorial.name === 'Come' && 
                <img src={come} /> 
              }
              {tutorial.name === 'Lie Down' && 
                <img src={down} />    
              }
            </div>
            <div className="right-side">
              <div className="title">
                {tutorial.name}
              </div>
              <div className="level">
                <p>Level: {tutorial.level}</p>
              </div>
            </div >
          </div>
          <div className="tutorial-steps">
            {renderedSteps()}
            <br/>
            {tutorial.name === "Sitting" && 
              <video width="320" height="240" controls>
              <source src="https://cdn.discordapp.com/attachments/952978925259206699/957438863981285446/efc8183f-993f-43a6-bd37-6ad3ef6a2a26.mov" type="video/mp4" />
              Your browser does not support the video tag.
              </video>
              }
          </div>
          <h3 className="footer">You did it. Pawfive!</h3>
        </div>
      }
    </>
  )
}