import React, { useEffect, useState } from "react";
import axios from "axios";

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
    <div>
      {typeof displayedSesh === 'object' && 
      <div className="session-container">
      <h2 className="sesh-title">Created Session!</h2>
        <img className="session-image" src={displayedSesh.avatar} alt="" />
        <h3>Dog Name: {displayedSesh.dog_name}</h3>
        <h3>{displayedSesh.name}</h3>
        <h3>Skill trained: {displayedSesh.skill_name}</h3>
        <h3>How it went: {displayedSesh.result}</h3>
      </div>}
    </div>
  );
}
