import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import "./Recorder.scss";

export default function NewSession(props) {
  const [post, setPost] = useState(false);
  const [result, setResult] = useState();

  const newSession = () => {
    axios.post(`/api/session/new`, 
    {dog:props.dog,
    skill:props.skill,
    result: result
     })
      .then((response) => {
        console.log(response);
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
    }

  

  return (
    <div className="training-details">
          <h2 className="detail-title">Started New Session:</h2>
          <h3 className="details">
            Dog you are training: {props.dog}
          </h3>
          <h3 className="details">
            Skill you are training: {props.skill}
          </h3>
          <form>
            <h3 className='details'>Let us know how it goes:</h3>
            <input type="text" id="result" name="result" onChange={(event) => {
              setResult(event.target.value);
              event.preventDefault();
            }} />
            <button type="submit" className='tut-button' onClick={(event)=>{newSession(); event.preventDefault(); props.setNewSesh();}}>Done Training</button>
          </form>
          
        </div>
  )
}
