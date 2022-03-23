import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import './Tutorial.scss';

export default function Tutorial() {
  const [tutorials, setTutorials] = useState([]);
  useEffect(() => {
    axios.get(`/api/tutorials`).then((response) => {
      console.log(response.data);
      setTutorials(response.data);
    });
  }, []);


  const renderTutorials = () => {
    return tutorials.map((tut, index) => {
      return  <div className='tut-container' key={index}>
                <h2>{tut.description}</h2>
                <div>
                  <div className="video-responsive">
                < iframe
                  width="853"
                  height="480"
                  src={tut.video_path}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="tutorial"
                />
             </div>
            </div>
              </div>
    });
  }
      
  return (
    <div><h1>Tutorials:</h1>
      {renderTutorials()}
    </div>



  )
}
