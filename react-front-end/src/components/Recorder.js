import React, { useState, useEffect } from 'react';
import './Recorder.scss';
import AudioReactRecorder, { RecordState } from 'audio-react-recorder';
import axios from 'axios'


export default function Recorder(props) {
  const [recordState, setRecordState] = useState(null)
  const [ audioData, setAudioData ] = useState(null)
  const [ witData, setWitData ] = useState("nothing")

   const start = () => {
    setRecordState(RecordState.START)
  };
  
  const pause = () => {
    setRecordState(RecordState.PAUSE)
  };
 
  const stop = () => {
    setRecordState(RecordState.STOP)
  };
 
  //audioData contains blob and blobUrl
  const onStop = (data) => {
    setAudioData(data);
    console.log('Data onStop', data);
    send(data.blob)
    // .then(()=>
    // requestWit()
    // )
  };


// const requestWit = () =>{
//   const witToken = process.env.WIT_serverAccessToken; //don't put your token inline
//   const URL = "https://api.wit.ai/utterances?limit=10";
//   const options = {headers: { Authorization: "Bearer " + witToken }};
//   const send ="";
//   return axios
//     .get("https://api.wit.ai/utterances?limit=10", options)
//     .then( results =>{
//       console.log("get witData before set", witData);
//       return setWitData(results)
//     })
//     .then( results => {
//       console.log("get witData after set", witData);
//     })
//     .catch(error => console.log("get error", error))
// }

const dogFinder = (witString) => {
  let dog = '';
  if (witString.includes("Birdie" || "birdie")) {
    dog = 'Birdie';
  }
  if (witString.includes("Bailey" || "bailey")) {
    dog = 'Bailey';
  }
  return dog;
}

const skillFinder = (witString) => {
  let skill = '';
  if (witString.includes("sit" || "Sit" || "set" || "Set")) {
    skill = 'Sit';
  }
  if (witString.includes("Speak" || "speak")) {
    skill = 'Speak';
  }
  return skill;
}


const send = (dataBlob) => {
  console.log("sendRequestToGlitch with data:");
  console.log("sending dataBlob",dataBlob);


  var buffer = dataBlob;

  const url = "https://api.wit.ai/speech";
  const witToken = process.env.REACT_APP_WIT_serverAccessToken; //don't put your token inline

  axios
    .post(url, buffer, {
      headers: {
        Authorization: "Bearer " + witToken,
        "Content-Type": "audio/wav"
      }
    })
    .then(witResponse => {
      console.log(witResponse.data, typeof witResponse.data);
      if (typeof witResponse.data === 'string') {
        setWitData(witResponse.data);
      }
    })
    .catch(error => {
      if (error.response){
        console.log(error.response)
        //do something

        }else if(error.request){
        console.log(error.request)
        //do something else

        }else if(error.message){
        console.log(error.message)
        //do something other than the other two

        }
    })
  }

  const recording = audioData;
 
    return (
      <div>
      <div className="recorder">
        <h2>Record Your Training Sessions</h2>
        <AudioReactRecorder state={recordState} onStop={onStop} backgroundColor={'rgb(255, 255, 255)'} />
        <label>Playback</label>
        <audio
        className="audiobar"
        controls
          src={recording ? recording.url : null}
        ></audio>
        <div>
          <button className="btn" id="start-btn" onClick={()=>start()}>Start Training<img alt='' id="recording-btn" src="https://www.clipartmax.com/png/middle/15-151442_big-image-video-record-button.png" /></button>
          <button className="btn" onClick={()=>pause()}>Pause </button>
          <button className="btn" onClick={()=>stop()}>Stop Training</button>
        </div>
      </div>
      <h2>Dog you are training: {dogFinder(witData)}</h2>
      <h2>Skill you are training: {skillFinder(witData)}</h2>
      </div>
    )
};