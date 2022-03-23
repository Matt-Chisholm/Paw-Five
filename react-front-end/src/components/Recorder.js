import React, { useState, useEffect } from "react";
import "./Recorder.scss";
import AudioReactRecorder, { RecordState } from "audio-react-recorder";
import axios from "axios";
import Session from "./Session";
import Tutorial from "./Tutorial";
import playbtn from "./images/play.png";
import pause from "./images/pause.png";
import NewSession from "./NewSession";
import arrow from "./images/arrow.png";

export default function Recorder(props) {
  const [recordState, setRecordState] = useState(null);
  const [audioData, setAudioData] = useState(null);
  const [witData, setWitData] = useState("nothing");
  const [viewTut, setViewTut] = useState(false);
  const [play, setPlay] = useState(false);
  const [newSesh, setNewSesh] = useState(false);
  const [selected, setSelected ] = useState( selected || "nothing")

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
    if (witString.includes("Birdie" || "birdie")) {
      console.log("dog set to birdie");
      dog = "Birdie";
      return dog;
    }
    if (witString.includes("Bailee" || "bailey" || "Bailey")) {
      console.log("dog set to bailey");
      dog = "Bailey";
      return dog;
    }
    if (witString.includes("Bolt" || "bolt" || "belt")) {
      console.log("dog set to bolt");
      dog = "Bolt";
      return dog;
    }
  };

  const skillFinder = (witString) => {
    if (witString.includes("sit" || "Sit" || "sit" || "Set")) {
      console.log("skill set to sit");
      skill = "Sit";
      return skill;
    }
    if (witString.includes("speak" || "Speak")) {
      console.log("skill set to speak");
      skill = "Speak";
      return skill;
    }
  };

  const send = (dataBlob) => {
    console.log("sendRequestToGlitch with data:");
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

  // viewport
  return (
    <div>
      <button
        className="tut-button"
        onClick={() => {
          setViewTut(!viewTut);
        }}
      >
      Tutorials
      </button>
        {viewTut === true && <Tutorial 
          onChange={setSelected}
          selected={selected}
      />}
      {viewTut === false && 
        <div>
          <div className="recorder">
            <div className="overlay">
              <AudioReactRecorder
                className="recording-view"
                state={recordState}
                onStop={onStop}
                backgroundColor={"rgb(255, 255, 255)"}
              />
              <audio
                className="audiobar"
                controls
                src={recording ? recording.url : null}
              ></audio>
              <div>
                {play === false && <img src={playbtn} onClick={() => start()} />}
                {play === true && <img src={pause} onClick={() => stop()} />}
              </div>
            </div>
          </div>
        <img src={arrow} alt='' />
        <h3 className="tap-above">Tap above to start training</h3>
        {newSesh === true && 
          <NewSession dog={dogFinder(witData)} skill={skillFinder(witData)} newSesh={newSesh} setNewSesh={()=> {setNewSesh(!newSesh)}} />
        }
        {dog.length > 2 && <Session name={dogFinder(witData)} />}
      </div>}
    </div>
  );
}
