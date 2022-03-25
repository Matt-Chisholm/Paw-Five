// DEPENDANCIES
import React, { useState, useEffect } from "react";
import AudioReactRecorder, { RecordState } from "audio-react-recorder";
import axios from "axios";
// STYLESHEETS
import "./Recorder.scss";
// COMPONENTS
import Session from "./Session";
import Tutorial from "./Tutorial";
import CreatedSession from "./CreatedSession";
// MEDIA
import playbtn from "./images/play.png";
import pause from "./images/pause.png";
import NewSession from "./NewSession";
import arrow from "./images/arrow.png";
import pawTeam from "./images/pawteam.png"

export default function Recorder(props) {
  const [recordState, setRecordState] = useState(null);
  const [audioData, setAudioData] = useState(null);
  const [witData, setWitData] = useState("nothing");
  const [viewTut, setViewTut] = useState("recorder");
  const [play, setPlay] = useState(false);
  const [newSesh, setNewSesh] = useState(false);
  const [showNewSesh, setShowNewSesh] = useState(false);
  const [selected, setSelected ] = useState( selected || "nothing")
  const [dogID, setDogID] = useState();
  const [tutorialsButtonText, setTutorialsButtonText] = useState("Tutorials");
  const [selectedTutorial, setSelectedTutorial] = useState();

  const start = () => {
    setRecordState(RecordState.START);
    setPlay(true);
  };

  const stop = () => {
    setRecordState(RecordState.STOP);
    setPlay(false);
  };

  //audioData contains blob and blobUrl
  const onStop = (data) => {
    setAudioData(data);
    console.log("Data onStop", data);
    send(data.blob);
  };

  let dog = "";
  let skill = "";
  const dogFinder = (witString) => {
    if (witString.includes("Birdie") || witString.includes("birdie")) {
      console.log("dog set to birdie");
      dog = "Birdie";
      return dog;
    }
    if (witString.includes("Bailee") || witString.includes("bailee") || witString.includes("Bailey") || witString.includes("bailey")) {
      console.log("dog set to bailey");
      dog = "Bailey";
      return dog;
    }
    if (witString.includes("Bolt") || witString.includes("bolt")) {
      console.log("dog set to bolt");
      dog = "Bolt";
      return dog;
    }
  };

  const skillFinder = (witString) => {
    if (witString.includes("sit") || witString.includes("set") || witString.includes("Sit") || witString.includes("Set")) {
      console.log("skill set to sit");
      skill = "Sit";
      return skill;
    }
    if (witString.includes("bark") || witString.includes("Bark")) {
      console.log("skill set to bark");
      skill = "Bark";
      return skill;
    }
  };

  const send = (dataBlob) => {
    console.log("sending dataBlob", dataBlob);
    var buffer = dataBlob;

    const url = "https://api.wit.ai/speech";
    const witToken = process.env.REACT_APP_WIT_serverAccessToken; //don't put your token inline

    axios
      .post(url, buffer, {
        headers: {
          Authorization: "Bearer " + witToken,
          Accept: "application/json",
          "Content-Type": "audio/wav",
        },
      })
      .then((witResponse) => {
        console.log(witResponse.data, typeof witResponse.data);
        if (typeof witResponse.data === "string") {
          setWitData(witResponse.data);
          setNewSesh(true);
        }
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          //do something
        } else if (error.request) {
          console.log(error.request);
          //do something else
        } else if (error.message) {
          console.log(error.message);
          //do something other than the other two
        }
      });
  };

  const recording = audioData;

  useEffect(() => {
    axios.get(`/api/session/${dog}`).then((response) => {
      setDogID(response.data[0]['id']);
      console.log("Dog id", response.data[0]['id'],'dogID:', dogID);
    });
  }, [dog]);

  const changeTutorialsButton = (currentText) => {
    switch (currentText) {
      case "tutorials":
        setViewTut("recorder");
        setTutorialsButtonText("Tutorials");
        break;
      case "recorder":
        setTutorialsButtonText("Back to Training");
        setSelectedTutorial(null);
        setViewTut("tutorials")
        break;
      case "tutorial-details":
        setViewTut("tutorials")
        setTutorialsButtonText("Back to Training");
        setSelectedTutorial(null);
        break;
    }
  };

  // VIEW
  return (
    <div className="training-page">
      <button
        className="tut-button"
        onClick={() => {
          changeTutorialsButton(viewTut);
        }}
      >
      {tutorialsButtonText}
      </button>

      {viewTut === "tutorials" && 
      <Tutorial
        selectedTutorial={selectedTutorial}
        setSelectedTutorial={setSelectedTutorial}
        setViewTut={setViewTut}
        viewTut={viewTut}
        onChange={setSelected}
        selected={selected}
        changeBackButtonText={setTutorialsButtonText}
      />}
      {viewTut === "tutorial-details" && 
      <Tutorial
        selectedTutorial={selectedTutorial}
        setSelectedTutorial={setSelectedTutorial}
        setViewTut={setViewTut}
        viewTut={viewTut}
        onChange={setSelected}
        selected={selected}
        changeBackButtonText={setTutorialsButtonText}
      />}
      {viewTut === "recorder" && 
      <div>
        <div className="recorder">
          <div className="overlay">
            <audio
              className="audiobar"
              controls
              src={recording ? recording.url : null}
            ></audio>
            <AudioReactRecorder
              className="recording-view"
              state={recordState}
              onStop={onStop}
              backgroundColor={"rgb(255, 255, 255)"}
            />
            <div>
              {play === false && <img className="record-button" src={playbtn} onClick={() => start()} />}
              {play === true && <img className="record-button" src={pause} onClick={() => stop()} />}
            </div>
          </div>
        </div>
        <img src={arrow} alt='' />
        <h3 className="tap-above">Tap above to start training!</h3>
        <h3 className="tap-above">Please tell us your dog's name and the skill you are training.</h3>
        {newSesh === true && dog.length > 2 &&
          <NewSession dog={dogFinder(witData)} skill={skillFinder(witData)} id={dogID} newSesh={newSesh} setNewSesh={()=> {setNewSesh(!newSesh)}} showNewSesh={showNewSesh} setShowNewSesh={()=>{setShowNewSesh(true)}} />
        }
        {showNewSesh === true && <CreatedSession />}
        {dog.length > 2 && <Session name={dogFinder(witData)} />}
      </div>}

    </div>
  );

}
