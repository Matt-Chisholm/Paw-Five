import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Sessions.scss"
import classNames from 'classnames';
import moment from "moment";

export default function Sessions(props) {
  // const [sessions, setSessions] = useState([]);
  const {setIsDetailsLoading, sessions} = props;

  // useEffect(() => {
  //   setIsDetailsLoading(true);
  //   axios.get(`/api/profile/sessions/${props.dog_id}`).then((response) => {
  //     const sessions = response.data;
  //     setSessions(sessions);
  //     setIsDetailsLoading(false);
  //   });
  // }, []);


  let sessionRows = () => {
    const temp = sessions.map((session, index) => {
      const okClass = classNames('result', {'selected': session.result.toLowerCase() === 'ok...'});
      const goodClass = classNames('result', {'selected': session.result.toLowerCase() === 'good'});
      const greatClass = classNames('result', {'selected': session.result.toLowerCase() === 'great!'});
      const timeago = moment(session.timestamp).fromNow();
      return <li key={index} className='session_row'>
        <div className='timestamp_component'>
          <span>{timeago}</span>
        </div>
        <div className='results_component'>
          <div className={okClass}>
            ok...
          </div>
          <div className={goodClass}>
            good
          </div>
          <div className={greatClass}>
            great!
          </div>
        </div>
      </li>
    });
    return temp.reverse();
  }
  
  return (
    <div className='sessions'>
      <div id='sessions_license'>
        <h2>Sessions</h2>
        {sessions.length > 3 && <span className='scroll_down_text'>Scroll down to see more</span>}
        {sessions.length > 3 &&  <div className="arrow">
                    <span></span>
                    <span></span>
                    <span></span>
          </div>
        }
      </div>
      <ul className='sessions_list'>
      {sessions.length > 0 ? sessionRows() : <span className='scroll_down_text'>No sessions yet...</span>}
      </ul>
    </div>
  )
}
