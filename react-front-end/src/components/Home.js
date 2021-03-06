import React, { useState, useEffect } from 'react';
import './Home.scss';
import axios from 'axios'
import useSound from 'use-sound';
import ring from './images/home-profile-ring.svg'
import audio from "../sounds/squeeze4.mp3"
import HomeNavigationBar from './HomeNavigationBar/HomeNavigationBar';
import Health from './HomeNavigationBar/Health';
import Memuries from './HomeNavigationBar/Memuries';
import Social from './HomeNavigationBar/Social';
import Stats from './HomeNavigationBar/Stats';




import Rainbow from './Rainbow';
import Summary from './Summary';
import Week from './Week';

export default function Home(props) {
  const [selected, setSelected] = useState("Stats");
  const [user, setUser] = useState({
    id: "",
    username: "",
    image: ""
  })
  const tabs = ["Stats", "Health", "News", "Memuries"];

  // get current user id, name, and image
  useEffect(() => {
    axios
      .get(`api/home/users/${props.user_id}`)
      .then(success => {
        // console.log("HOME COMPONENT success", success.data[0]);
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
    <div className='homeComponent'>

      <HomeNavigationBar tab={selected} tabs={tabs} onChange={setSelected} />
      {selected === "Stats" && user.id &&
        <>
          <div className='home-top' >
            <span id="username">
              Welcome, {localStorage.getItem("username")}!
            </span>
            <img className='ring' src={ring} alt="home-profile-ring" onClick={() => playClick()} />
            <img className='user-image' src={user.image} />
          </div>
          <div className='home-bottom'>
            {/* <div className='test'>
              </div> */}
            <article>
              <Rainbow />
              <Week />
            </article>
            <Summary />
          </div>
        </>
      }
      {selected === "Health" && <Health />}
      {selected === "News" && <Social isLoading={props.isLoading} setIsLoading={props.setIsLoading} />}
      {selected === "Memuries" && <Memuries />}


    </div>
  )
}