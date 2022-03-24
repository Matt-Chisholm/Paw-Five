import React, { useState, useEffect } from 'react';
import './Home.scss';
import axios from 'axios'
import useSound from 'use-sound';
import ring from './images/home-profile-ring.svg'
import audio from "../sounds/squeeze4.mp3"
import Rainbow from './Rainbow';
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
          console.log("Home Component error, check if cookies are set", error);
        }); 
  }, []);

  // For squaker sound on user image
  const [playClick] = useSound(
    audio
  )

  

  // view
  return (
    <div>
      <div className='home-top' >
        <img className='ring' src={ring} alt="home-profile-ring" onClick={() => playClick()}/>
        <img className='user-image' src={user.image} />
      </div>
      <div className='home-bottom'>
        <Rainbow />
      </div>
    </div>
    )
}