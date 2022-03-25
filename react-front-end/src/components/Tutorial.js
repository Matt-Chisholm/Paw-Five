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

  
  {/* name, level, description, icon, video */}
  const renderTutorials = () => {
    return tutorials.map((tut) => {
      return (
            <TutorialItem 
              tutorial_id={tut.id} 
              name={tut.name} 
              level={tut.level}
              icon={tut.icon}
              onChange={setSelectedTutorial} 
            /> 
			);
    });
  }

  // VIEW
  return (
      <div className='tut-container'>

        {selectedTutorial ? <TutorialDetails tutorial_id={selectedTutorial} onChange={() => setSelectedTutorial(null)} /> : renderTutorials()}
      </div>
  )
}

/* <button type='reset' onClick={()=>props.onChange("nothing")} >Reset</button> */