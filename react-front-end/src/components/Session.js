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
    }).catch(error => { console.log("error in Session.js Component useEf1:", error); });
  }, [props.name]);

  useEffect(() => {
    if (props.name !== undefined && dogID !== undefined) {
      axios.get(`/api/session/${props.name}/${dogID}`).then((response) => {
        setSessions(response.data);
        console.log("SESSIONS", response.data);
      });
    }
  }, [dogID]);

  const renderSessions = (sessions) => {

    return sessions.reverse().map((sesh, index) => {
      const timeago = moment(sesh.timestamp).fromNow();
      return (
        <div key={index} className="session-container">
          <span>From: {timeago}</span>
          <span>Skill trained: {sesh.skill_name}</span>
          <span>How it went: {sesh.result}</span>
        </div>
      );
    });
  };

  return (
    <div id="session-component">
      <h2 className="sesh-title">Previous sessions:</h2>
      {sessions[0] && <div className="dog-details">
        <img className="session-image" src={sessions[0].avatar} alt="" />
        <span>{sessions[0].dog_name}</span>
      </div>
      }
      <div className="session-containers-list">
        {renderSessions(sessions)}
      </div>
    </div>
  );
}
