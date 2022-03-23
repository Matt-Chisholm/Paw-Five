import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import './Tutorial.scss';
import classname from 'classnames'

export default function Tutorial(props) {
  const [tutorials, setTutorials] = useState([]);
  
  useEffect(() => {
    axios.get(`/api/tutorials`).then((response) => {
      console.log(response.data);
      setTutorials(response.data);
    });
  }, []);

  
  const renderTutorials = () => {
    return tutorials.map((tut, index) => {
      const selectedVideo = classname('video-responsive', {'video-responsive-selected': props.selected === index})
      return (
				<>
					<div key={index} className={selectedVideo} onClick={()=>props.onChange(index)}>
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
    <div>
      <button type='reset' onClick={()=>props.onChange("nothing")} >Reset</button>
      <div className='tut-container' >
          {/* {props.selected} */}
          {renderTutorials()}
      </div>
    </div>
  )
}
