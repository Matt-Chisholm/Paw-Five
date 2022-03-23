import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import "./Session.scss";

export default function Session(props) {
  const [sessions, setSessions] = useState([]);
  useEffect(() => {
    axios.get(`/api/session/${props.name}`).then((response) => {
      setSessions(response.data);
      console.log("SESSIONS", response.data);
    });
  }, [props.name]);

  const renderSessions = (sessions) => {
    
    return sessions.reverse().map((sesh, index) => {
      const timeago = moment(sesh.timestamp).fromNow();
      return (
        <div>
          
          <div className="session-container" key={sesh.name}>
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
