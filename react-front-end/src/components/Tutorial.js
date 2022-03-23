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
      return  <div key={index}>
                <div>
                <h2>{tut.description}</h2>
                  <div className="video-responsive">
                < iframe
                  src={tut.video_path}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="tutorial"
                  poster=""
                />
             </div>
            </div>
              </div>
    });
  }
      
  return (
    <div className='tut-container'>
      <div><h1>Tutorials:</h1>
        {renderTutorials()}
      </div>
    </div>
  )
}
