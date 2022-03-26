import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import './Tutorial.scss';
import classname from 'classnames'
import TutorialItem from './TutorialItem';
import TutorialDetails from './TutorialDetails';

export default function Tutorial(props) {
  const [tutorials, setTutorials] = useState([]);
  const { selectedTutorial, setSelectedTutorial } = props;

  useEffect(() => {
    axios.get(`/api/tutorials`).then((response) => {
      setTutorials(response.data);
    })
      .catch(error => {
        console.log("error from Tutorial.js component useEffect: ", error);
      })
      ;
  }, []);

  const renderTutorials = () => {
    return tutorials.map((tut, index) => {
      return (
        <TutorialItem
          key={index}
          tutorial_id={tut.id}
          name={tut.name}
          level={tut.level}
          logo={tut.logo}
          onClick={() => { setSelectedTutorial(tut.id) }}
          changeBackButtonAction={() => {
            props.setViewTut("tutorial-details")
          }}
          changeBackButtonText={props.changeBackButtonText}
        />
      );
    });
  }


  // VIEW
  return (
    <div className='tut-container'>

      {selectedTutorial ? <TutorialDetails
        tutorial_id={selectedTutorial}
      /> : renderTutorials()}
      {/* {props.viewTut === "tutorial-details" && <TutorialDetails
        tutorial_id={selectedTutorial}
        />} */}
    </div>
  )
}

/* <button type='reset' onClick={()=>props.onChange("nothing")} >Reset</button> */