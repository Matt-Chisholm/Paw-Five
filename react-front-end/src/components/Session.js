import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';

export default function Session(props) {
  const [cookie, setCookie, removeCookie] = useCookies(["user_id"]);

  const [state, setState] = useState();
  useEffect(() => {
    axios.get('/api/sessions').then((response) => {
      setState(response.data);
    });
  }, []);

  console.log(state);
  return (
    <div>
    
    </div>
  )
}
