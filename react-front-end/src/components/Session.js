import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import "./Session.scss";

export default function Session(props) {
  const [sessions, setSessions] = useState([]);
  const [dogID, setDogID] = useState();
  useEffect(() => {
    axios.get(`/api/session/${props.name}`).then((response) => {
      setDogID(response.data[0].id);
      console.log("Dog id", response.data);
    }).catch(error => {console.log("error in Session.js Component useEf1:", error);});
  }, [props.name]);
  useEffect(() => {
    axios.get(`/api/session/${props.name}/${dogID}`).then((response) => {
      setSessions(response.data);
      console.log("SESSIONS", response.data);
    });
  }, [dogID]);

  const renderSessions = (sessions) => {
    
    return sessions.reverse().map((sesh, index) => {
      const timeago = moment(sesh.timestamp).fromNow();
      return (
        <div key={sesh.name}>
          
          <div className="session-container">
            <img className="session-image" src={sesh.avatar} alt="" />
            <h2 className="sesh-title">Session</h2>
            <h3>Dog Name: {sesh.dog_name}</h3>
            <h3>From: {timeago}</h3>
            <h3>{sesh.name}</h3>
            <h3>Skill trained: {sesh.skill_name}</h3>
            <h3>How it went: {sesh.result}</h3>
          </div>
        </div>
      );
    });
  };

  return (
    <div>
      <h2 className="sesh-title">Previous sessions:</h2>
    {renderSessions(sessions)}
    </div>
  );
}
