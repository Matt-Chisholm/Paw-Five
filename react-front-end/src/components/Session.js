import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import './Session.scss';

export default function Session(props) {
  const { cookies } = props;

  const [sessions, setSessions] = useState({description: ""});
  useEffect(() => {
    axios.get(`/api/session/${cookies.user_id}`).then((response) => {
      setSessions(response.data);
      console.log(response.data);
    });
  }, []);
  const timeago = moment(sessions.timestamp).fromNow();
  
  return (
    <div>
      <h2>{sessions.name}</h2>
      <img className="session-image" src={sessions.avatar} alt='' />
      {sessions.description}
      {timeago}
    </div>
  )
}
