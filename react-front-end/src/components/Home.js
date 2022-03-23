import React, { useState, useEffect } from 'react';
import './Home.scss';
import axios from 'axios'
import ring from './images/home-profile-ring.svg'

export default function Home (props) {
  const [ user, setUser ] = useState({
    id: "",
    username: "",
    image: ""
  }) 
  
  // get current user id, name, and image
  useEffect(() =>{
    axios
      .get(`api/home/users/${props.user_id}`)
        .then(success => {
          console.log("HOME COMPONENT success", success.data[0]);
          const currentUser = success.data[0];
          // exclude sensitive info like password and email
          setUser({
            id: currentUser.id,
            username: currentUser.username,
            image: currentUser.image
          });
        })
        .catch(error => {
          console.log("Home Component error", error);
        }); 
  }, []);





  return (
    <div>
      <div className='home-top'>
        <span className='home-avatar'>
          <img src={user.image} />
          {/* <span className='placeholder-circle'></span>  */}
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