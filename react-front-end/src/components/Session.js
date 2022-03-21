import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import './Session.scss';

export default function Session(props) {

  const [sessions, setSessions] = useState({description: ""});
  useEffect(() => {
    axios.get(`/api/session/${props.name}`).then((response) => {
      setSessions(response.data);
      console.log(response.data);
    });
  }, [props.name]);
  const timeago = moment(sessions.timestamp).fromNow();
  
  return (
    <div className="session-container">
      
      <img className="session-image" src={sessions.avatar} alt='' />
      <h2>{sessions.name}</h2>
      <h3>Skill trained: {sessions.description}</h3>
      <h3>Session created: {timeago}</h3>
    </div>
  )
}
