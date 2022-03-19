import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';


export default function Example() {
  const [state,setState] = useState();
  useEffect(() => {
    axios.get('/api/users').then((response) => {
      console.log("response", response);
      setState(response.data);
    });
  }, []);
  console.log("state", state);
  return (
    <div>example

    </div>
    
  )
}
