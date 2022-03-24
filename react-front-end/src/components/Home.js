import React, { useState, useEffect } from 'react';
import './Home.scss';
import axios from 'axios'
import useSound from 'use-sound';
import ring from './images/home-profile-ring.svg'
import audio from "../sounds/squeeze4.mp3"
import Rainbow from './Rainbow';
import HomeNavigationBar from './HomeNavigationBar/HomeNavigationBar';


export default function Home (props) {
  const [selected, setSelected] = useState("Stats");
  const [ user, setUser ] = useState({
    id: "",
    username: "",
    image: ""
  }) 
  const tabs = ["Stats", "Health", "Social", "News", "Memuries"];
  
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

  

  // VIEW
  return (
    <div>
      <HomeNavigationBar tab={tab} tabs={tabs} onChange={setTab}/>
      {tab === "Stats" && <Stats />}
      {tab === "Health" && <Health />}
      {tab === "Social" && <Social />}
      {tab === "News" && <News />}
      {tab === "Memuries" && <Memuries />}

      <div className='home-top' >
        <img className='ring' src={ring} alt="home-profile-ring" onClick={() => playClick()}/>
        <img className='user-image' src={user.image} />
      </div>
      <div className='home-bottom'>
        <article>
          <Rainbow />
        </article>
      </div>
    </div>
    )
}