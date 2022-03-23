import React, { useState, useEffect } from 'react';
import './Home.scss';
import ring from './images/home-profile-ring.svg'

export default function Home () {
  const [ user, setUser ] = useState("") 
  

  // // eventually get all the data. for now get all users.
  // useEffect(() =>{
  //   Axios
  //     .get(`api/routes/home/users/${props.user_id}`)
  //       .then(success => {
  //         console.log("HOME useEff", success);
  //         // setUser()
  //       })
  //       .catch(); 
  // }, []);





  return (
    <div>
      <div className='home-top'>
        
        <span className='home-avatar'>
          <span className='placeholder-circle'></span> 
          {/* <span className='ring'>
            <img src={ring} alt="home-profile-ring"/>
          </span> */}
        </span>
      
      </div>
      
      <div className='home-bottom'>

      </div>
    </div>
    )
}