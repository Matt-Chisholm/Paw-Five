import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';


export default function Example(props) {
  const [state,setState] = useState();
  useEffect(() => {
    axios.get('/api/users').then((response) => {
      setState(response.data);
    });
  }, []);
  console.log("state", state);
  return (
    <div>
      <h1>EXAMPLE COMPONENT</h1>

    </div>
    
  )
}
