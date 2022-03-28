import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import "./Recorder.scss";

export default function NewSession(props) {
  const [post, setPost] = useState(false);
  const [result, setResult] = useState();
  const [dogID, setDogID] = useState();

  const getDogID = () => {
    axios.get(`/api/session/${props.dog}`).then((response) => {
      setDogID(response.data[0]["id"]);
      console.log("DOG ID IS:", dogID);
    });
  };
  getDogID();

  const newSession = () => {
    axios
      .post(`/api/session/new`, {
        dog: props.dog,
        skill: props.skill,
        result: result,
        id: dogID,
      })
      .then((response) => {
        console.log(response);
        props.setShowNewSesh();
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          //do something
        } else if (error.request) {
          console.log(error.request);
          //do something else
        } else if (error.message) {
          console.log(error.message);
          //do something other than the other two
        }
      });
  };

  return (
    <div className="training-details">
      {props.dog && <div>
        <h2 className="detail-title">Started New Session:</h2>
        <h3 className="details">Dog you are training: {props.dog}</h3>
        <h3 className="details">Skill you are training: {props.skill || "Couldn't detect skill."}</h3>

        <form>
          <h3 className="details">Let us know how it goes:</h3>
          <div className="dropdown-menu">
            <select
              defaultValue="select"
              type="text"
              id="result"
              name="result"
              onChange={(event) => {
                setResult(event.target.value);
                event.preventDefault();
              }}>
              <option value="select">Select your option</option>
              <option value="Great!">Great!</option>
              <option value="Good">Good</option>
              <option value="Ok...">Ok...</option>
            </select>
          </div>
          <button
            type="submit"
            className="tut-button"
            onClick={(event) => {
              newSession();
              event.preventDefault();
              props.setNewSesh();
              props.setShowNewSesh();
            }}
          >
            Done Training
          </button>
        </form>
      </div>
      }
      {!props.dog &&
        <h3>Couldn't quite catch that! Try again!</h3>}
    </div>
  );
}
