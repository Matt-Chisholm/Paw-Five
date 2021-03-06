import React, { useEffect, useState } from "react";
import axios from "axios";
import lvlup from "./images/lvlup.png";
import './CreatedSession.scss';

export default function CreatedSession(props) {
  const [displayedSesh, setDisplayedSesh] = useState();
  useEffect(() => {
    axios.get(`/latest`).then((response) => {
      setDisplayedSesh(response.data);
      console.log("NEWEST SESH RESPONSE", response.data);
      console.log("DISPLAYED", displayedSesh);
    });
  }, []);
  return (
    <div className="created">
      {typeof displayedSesh === "object" && (
        <div className="created-container">
          <h2 className="sesh-title">Created Session!</h2>
          <img className="created-img" src={displayedSesh.avatar} alt="" />
          <h3 className="sesh-text">Well Done!</h3>
          <h3 className="sesh-text">
            {displayedSesh.dog_name}'s {displayedSesh.skill_name} skill has
            leveled up!
          </h3>
          <img className="lvlup" src={lvlup} alt="" />
        </div>
      )}
    </div>
  );
}
