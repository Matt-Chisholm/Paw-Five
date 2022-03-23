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
      console.log("HERE", typeof sessions)
      console.log(response.data);
      console.log(response);
    });
  }, [props.name]);

  const renderSessions = (sessions) => {
    
    return sessions.map((sesh, index) => {
      const timeago = moment(sesh.timestamp).fromNow();
      return (
        <div>
          <h2 className="sesh-title">Previous sessions:</h2>
          <div className="session-container">
            <img className="session-image" src={sesh.avatar} alt="" />
            <h2 className="sesh-title">Session</h2>
            <h3>From: {timeago}</h3>
            <h3>{sesh.name}</h3>
            <h3>Skill trained: {sesh.skill_name}</h3>
          </div>
        </div>
      );
    });
  };

  return (
    <div>
    {renderSessions(sessions)}
    </div>
  );
}
