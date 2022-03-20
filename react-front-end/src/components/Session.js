import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import moment from 'moment';
import './Session.scss';

export default function Session(props) {
  const [cookie, setCookie, removeCookie] = useCookies(["user_id"]);

  const [sessions, setSessions] = useState({description: ""});
  useEffect(() => {
    axios.get(`/api/session/${cookie.user_id}`).then((response) => {
      setSessions(response.data);
      console.log(response.data);
    });
  }, []);
  const timeago = moment(sessions.timestamp).fromNow();
  
  return (
    <div>
      <h2>{sessions.name}</h2>
      <img class="session-image" src={sessions.avatar} alt='' />
      {sessions.description}
      {timeago}
    </div>
  )
}
