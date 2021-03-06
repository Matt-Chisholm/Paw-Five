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
import LoadingSpinner from "./LoadingSpinner";
// MEDIA
import playbtn from "./images/play.png";
import pause from "./images/pause.png";
import NewSession from "./NewSession";
import arrow from "./images/arrow.png";
import pawTeam from "./images/pawteam.png";

import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'


export default function Recorder(props) {
  const [recordState, setRecordState] = useState(null);
  const [audioData, setAudioData] = useState(null);
  const [witData, setWitData] = useState("nothing");
  const [viewTut, setViewTut] = useState("recorder");
  const [play, setPlay] = useState(false);
  const [newSesh, setNewSesh] = useState(false);
  const [showNewSesh, setShowNewSesh] = useState(false);
  const [selected, setSelected] = useState(selected || "nothing");
  const [dogID, setDogID] = useState();
  const [tutorialsButtonText, setTutorialsButtonText] = useState("Tutorials");
  const [selectedTutorial, setSelectedTutorial] = useState();
  const [recorderError, setRecorderError] = useState(false);

const [message, setMessage] = useState('empry');
const [ skills, setSkills ] = useState({sit: 0});

const [ transcription, setTranscription ] = useState("nothing");


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
    setAudioData(data.blob);
    console.log("Data onStop", data);
    console.log("HERE IS SIZE", data.blob.size);
    if (data.blob.size > 1000) {
      setRecorderError(false);
      send(data.blob);
    }
    if (data.blob.size < 1000) {
      setRecorderError(true);
    }
  };

  let dog = "";
  let skill = "";
  const dogFinder = (witString) => {
    if (witString.includes("Birdie") || witString.includes("birdie")) {
      console.log("dog set to birdie");
      dog = "Birdie";
      return dog;
    }
    if (
      witString.includes("Bailee") ||
      witString.includes("bailee") ||
      witString.includes("Bailey") ||
      witString.includes("bailey")
    ) {
      console.log("dog set to bailey");
      dog = "Bailey";
      return dog;
    }
    if (witString.includes("Bolt") || witString.includes("bolt")) {
      console.log("dog set to bolt");
      dog = "Bolt";
      return dog;
    }
    dog = "No dog detected";
    return dog;
  };

  const skillFinder = (witString) => {
    if (
      witString.includes("sit") ||
      witString.includes("set") ||
      witString.includes("Sit") ||
      witString.includes("Set")
    ) {
      console.log("skill set to sit");
      skill = "Sit";
      return skill;
    }
    if (witString.includes("bark") || witString.includes("Bark")) {
      console.log("skill set to bark");
      skill = "Bark";
      return skill;
    }
    if (witString.includes("shake") || witString.includes("Shake")) {
      console.log("skill set to shake");
      skill = "Shake";
      return skill;
    }
    if (witString.includes("roll over") || witString.includes("rollover")) {
      console.log("skill set to Roll over");
      skill = "Roll over";
      return skill;
    }
    if (witString.includes("sing") || witString.includes("Sing")) {
      console.log("skill set to Sing");
      skill = "Sing";
      return skill;
    }
    if (witString.includes("lie") || witString.includes("down")) {
      console.log("skill set to Lie down");
      skill = "Lie Down";
      return skill;
    }
    skill = "No skill detected";
    return skill;
  };

  const send = (dataBlob) => {
    props.setIsLoading(true);
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
        props.setIsLoading(false);
        if (typeof witResponse.data === "string") {
          setWitData(witResponse.data);
          setNewSesh(true);
        }
      })
      .catch((error) => {
        props.setIsLoading(true);
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
    if (dog !== "") {
      props.setIsLoading(true);
      axios.get(`/api/session/${dog}`).then((response) => {
        props.setIsLoading(false);
        setDogID(response.data[0]["id"]);
        console.log("Dog id", response.data[0]["id"], "dogID:", dogID);
      });
    }
  }, [dog]);

  const changeTutorialsButton = (currentText) => {
    switch (currentText) {
      case "tutorials":
        setViewTut("recorder");
        setTutorialsButtonText("Tutorials");
        break;
      case "recorder":
        setTutorialsButtonText("Return to Training");
        setSelectedTutorial(null);
        setViewTut("tutorials");
        break;
      case "tutorial-details":
        setViewTut("tutorials");
        setTutorialsButtonText("Return to Training");
        setSelectedTutorial(null);
        break;
    }
  };


  // todo

  const handlePress = ()=> {
    console.log("HandlePress");
    axios
      .get('/api/recorder/test')
      .then(success => {
        console.log("transcribe success", success);
        setTranscription(success)
        console.log("transcribe transcription", transcription);
      })
      .then(error => {
        console.log("transcribe error", error);
      })
  }


  const commands = [
    {
      command: "sit",
      callback: () => setSkills(
        
      )
    },
    {
      command: 'I would like to order *',
      callback: (food) => setMessage(`Your order is for: ${food}`)
    },
    {
      command: 'The weather is :condition today',
      callback: (condition) => setMessage(`Today, the weather is ${condition}`)
    },
    {
      command: 'My top sports are * and *',
      callback: (sport1, sport2) => setMessage(`#1: ${sport1}, #2: ${sport2}`)
    },
    {
      command: 'Pass the salt (please)',
      callback: () => setMessage('My pleasure')
    },
    {
      command: ['Hello', 'Hi'],
      callback: ({ command }) => setMessage(`Hi there! You said: "${command}"`),
      matchInterim: true
    },
    {
      command: 'Beijing',
      callback: (command, spokenPhrase, similarityRatio) => setMessage(`${command} and ${spokenPhrase} are ${similarityRatio * 100}% similar`),
      // If the spokenPhrase is "Benji", the message would be "Beijing and Benji are 40% similar"
      isFuzzyMatch: true,
      fuzzyMatchingThreshold: 0.2
    },
    {
      command: ['eat', 'sleep', 'leave'],
      callback: (command) => setMessage(`Best matching command: ${command}`),
      isFuzzyMatch: true,
      fuzzyMatchingThreshold: 0.2,
      bestMatchOnly: true
    },
    {
      command: 'clear',
      callback: ({ resetTranscript }) => resetTranscript()
    }
  ]
  const {
  transcript,
  listening,
  resetTranscript,
  browserSupportsSpeechRecognition,
  isMicrophoneAvailable
} = useSpeechRecognition({ commands });

if (!browserSupportsSpeechRecognition) {
  return <span>Browser doesn't support speech recognition.</span>;
}

if (!isMicrophoneAvailable) {
  alert("Microphone not detected. Please give permission for the recording feature to work, or check your settings.")
}

// test commands


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
        {/* <button onClick={()=> handlePress()}>
          Test for Transcribing to wit.ai
        </button>
          {transcription} */}
      {/* <div>
    <p>Microphone: {listening ? 'on' : 'off'}</p>
    <button onClick={SpeechRecognition.startListening}>Start</button>
    <button onClick={SpeechRecognition.stopListening}>Stop</button>
    <button onClick={resetTranscript}>Reset</button>
    <p>{skills.sit}</p>
    <p>{message}</p>
    <p>{transcript}</p>
  </div> */}

      {viewTut.includes("tutorial") && (
        <Tutorial
          selectedTutorial={selectedTutorial}
          setSelectedTutorial={setSelectedTutorial}
          setViewTut={setViewTut}
          viewTut={viewTut}
          onChange={setSelected}
          selected={selected}
          changeBackButtonText={setTutorialsButtonText}
        />
      )}
      {viewTut === "recorder" && (
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
                {play === false && (
                  <img
                    className="record-button"
                    src={playbtn}
                    onClick={() => start()}
                  />
                )}
                {play === true && (
                  <img
                    className="record-button"
                    src={pause}
                    onClick={() => stop()}
                  />
                )}
              </div>
            </div>
          </div>
          {props.isLoading ? (
            <>
              <h3 className="loading-text">
                Session is loading, take time to hug your dog!
              </h3>
              <div className="recorder-spinner">
                <LoadingSpinner />
              </div>
            </>
          ) : (
            <>
              {recorderError === true && <h1 className="record-error">Whoops, the AI had a hiccup! Please try again!</h1>}
              <img src={arrow} alt="" />
              <h1 className="tap-prompt">Tap above to start training!</h1>
              <h3 className="tap-above">
                Please tell us your dog's name and the skill you are training.
              </h3>
              {newSesh === true && (
                <NewSession
                  dog={dogFinder(witData)}
                  skill={skillFinder(witData)}
                  id={dogID}
                  newSesh={newSesh}
                  setNewSesh={() => {
                    setNewSesh(!newSesh);
                  }}
                  showNewSesh={showNewSesh}
                  setShowNewSesh={() => {
                    setShowNewSesh(true);
                  }}
                  witData={witData}
                />
              )}
              {showNewSesh === true && <CreatedSession />}
              {dog.length > 2 && <Session name={dogFinder(witData)} />}
            </>
          )}
        </div>
      )}
    </div>
  );
}
