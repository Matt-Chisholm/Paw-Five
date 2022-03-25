import react, { useState, useEffect } from "react";
import axios from "axios";
import "./TutorialDetails.scss";
import sit from "./images/sit.svg";


export default function TutorialDetails(props) {
  const [tutorial, setTutorial] = useState({});

  useEffect(() => {
    axios.get(`/api/tutorial/details/${props.tutorial_id}`).then((response) => {
      setTutorial(response.data[0]);
    })
      .catch(error => {
        console.log("error from Tutorial.js component useEffect: ", error);
      });
  }, []);

  const renderedSteps = () => tutorial.description.map((step, index) => {
    return <p key={index} className="tutorial-step">
      {index + 1}. {step}
    </p>
  });

  return (
    <>
      {tutorial.description &&
        <div className="tutorial-details">
          <div
            className={`tutorial-item ${tutorial.level}`}
          >
            <div className="icon">
              {/* {tutorial.icon} */}
              <img className="img-icon" src={sit} />
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
          </div>
        </div>
      }
    </>
  )
}