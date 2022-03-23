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

  // what defines selected? when the key equals to the selected
  //  on click => setSelected to key. if key matches to selected, then change class
  
  // crate classname if selected change dimensions
  const selectedVideo = classname('video-responsive', {'video-responsive-selected': selected === 0})
  const renderTutorials = () => {
    return tutorials.map((tut, index) => {
      const selectVideo = (index) => {
        console.log("TJ");
        setSelected(index)
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
      
  return (
    <div className='tut-container'>
        {selected}
        {renderTutorials()}
    </div>
  )
}
