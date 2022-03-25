import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import './Tutorial.scss';
import classname from 'classnames'
import TutorialItem from './TutorialItem';
import TutorialDetails from './TutorialDetails';

export default function Tutorial(props) {
  const [tutorials, setTutorials] = useState([]);
  const {selectedTutorial, setSelectedTutorial} = props;

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


  const renderTutorials = () => {
    return tutorials.map((tut, index) => {
      return (
        <TutorialItem
          key={index}
          tutorial_id={tut.id}
          name={tut.name}
          level={tut.level}
          icon={tut.icon}
          onClick={() => {setSelectedTutorial(tut.id); console.log('tut.id', tut.id) }}
          changeBackButtonAction={() => {
            props.setViewTut("tutorial-details")
          }}
          changeBackButtonText={props.changeBackButtonText}
        />
      );
    });
  }

  console.log("sel", selectedTutorial);

  // VIEW
  return (
    <div className='tut-container'>

      {selectedTutorial ? <TutorialDetails
        tutorial_id={selectedTutorial}
        /> : renderTutorials()}
    </div>
  )
}

/* <button type='reset' onClick={()=>props.onChange("nothing")} >Reset</button> */