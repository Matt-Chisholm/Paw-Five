import react from "react";
import sit from "./images/sit.svg";


export default function TutorialItem(props) {
  return (
    <div 
    className={`tutorial-item ${props.level}`}
    onClick={() => props.onChange(props.tutorial_id)}
    >
      <div className="icon">
        {/* {props.icon} */}
        <img className="img-icon" src={sit}/>
      </div>
      <div className="right-side">
        <div className="title">
          {props.name}
        </div>
        <div className="level">
          <p>Level: {props.level}</p>
        </div>
      </div >
    </div>
  )
}

