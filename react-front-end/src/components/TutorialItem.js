import react from "react";
import sit from "./images/sit.svg";
import bark from "./images/bark.svg";
import down from "./images/down.svg";
import come from "./images/come.svg";
import sing from "./images/sing.svg";
import paw from "./images/paw.svg";


export default function TutorialItem(props) {
  return (
    <div
      className={`tutorial-item ${props.level}`}
      onClick={() => {
        props.onClick();
        props.changeBackButtonAction();
        props.changeBackButtonText("Back to Tutorials");
      }}
    >
      <div className={`icon __${props.name}`}>
             {props.name === 'Sitting' && 
                <img src={sit} />
              }
              {props.name === 'Bark' && 
                <img src={bark} />  
              }
              {props.name === 'Sing' && 
                <img src={sing} />  
              }
              {props.name === 'Give A Pow' &&
                <img src={paw} />
              }
              {props.name === 'Come' && 
                <img src={come} /> 
              }
              {props.name === 'Lie Down' && 
                <img src={down} />    
              }
      </div>
      <div className="right-side">
        <div className="title">
          {props.name}
        </div>
        <div className="level">
          <p>Level: {props.level}</p>
        </div>
      </div>
    </div>
  )
}

