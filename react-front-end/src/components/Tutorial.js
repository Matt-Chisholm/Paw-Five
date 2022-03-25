import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import './Tutorial.scss';
import classname from 'classnames'
import TutorialItem from './TutorialItem';
import TutorialDetails from './TutorialDetails';

export default function Tutorial(props) {
  const [tutorials, setTutorials] = useState([]);
  const [selectedTutorial, setSelectedTutorial] = useState();
  
  useEffect(() => {
    axios.get(`/api/tutorials`).then((response) => {
      console.log("success from Tutorial.js component useEffect:", response.data);
      setTutorials(response.data);
    })
    .catch(error => {
      console.log("error from Tutorial.js component useEffect: ", error);
    })
    ;
  }, []);

  
  // const renderTutorials = () => {
  //   return tutorials.map((tut, index) => {
  //     const selectedVideo = classname('video-responsive', {'video-responsive-selected': props.selected === index})
  //     return (
	// 			<>
	// 				<div key={index} className={selectedVideo} onClick={()=>props.onChange(index)}>
	// 					<iframe
	// 						src={tut.video_path}
	// 						frameBorder='0'
	// 						allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
	// 						allowFullScreen
	// 						title='tutorial'
	// 						poster=''
  //             />
  //             <h3>{tut.description}</h3>
	// 				</div>
	// 			</>
	// 		);
  //   });
  // }

  const renderTutorials = () => {
    return tutorials.map((tut, index) => {
      return (
					<div key={index} className="tutorial">
            <TutorialItem tutorial_id={tut.id} onChange={setSelectedTutorial} /> {/* name, level, description, icon, video */}
					</div>
			);
    });
  }

  // VIEW
  return (
    <div>
      {/* <button type='reset' onClick={()=>props.onChange("nothing")} >Reset</button> */}
      <div className='tut-container' >
        
          {/* {props.selected} */}
          {selectedTutorial ? <TutorialDetails tutorial_id={selectedTutorial} onChange={() => setSelectedTutorial(null)} /> : renderTutorials()}
      </div>
    </div>
  )
}
