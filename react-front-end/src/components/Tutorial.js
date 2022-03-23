import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import './Tutorial.scss';
import classname from 'classnames'

export default function Tutorial() {
  const [tutorials, setTutorials] = useState([]);
  const [ selected, setSelected ] = useState( selected || "nothing") 
  
  useEffect(() => {
    axios.get(`/api/tutorials`).then((response) => {
      console.log(response.data);
      setTutorials(response.data);
    });
  }, []);

  
  const renderTutorials = () => {
    return tutorials.map((tut, index) => {
      const selectedVideo = classname('video-responsive', {'video-responsive-selected': selected === index})
      const selectVideo = (index) => {
        if (selected !== index) {
          return setSelected(index)
        }
        setSelected("nothing")
      }
      return (
				<>
					<div key={index} className={selectedVideo} onClick={()=>selectVideo(index)}>
						<iframe
							src={tut.video_path}
							frameBorder='0'
							allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
							allowFullScreen
							title='tutorial'
							poster=''
              />
              <h3>{tut.description}</h3>
					</div>
				</>
			);
    });
  }
      
  const resetSelected = () => {setSelected("nothing")};

  return (
    <div className='tut-container' 
    >
        {selected}
        {renderTutorials()}
    </div>
  )
}
