import React, { useState, useEffect } from 'react';
import './Recorder.scss';
import AudioReactRecorder, { RecordState } from 'audio-react-recorder';


export default function Recorder(props) {
  const [recordState, setRecordState] = useState(null)
  const [ audioData, setAudioData ] = useState(null)
  const [ witData, setWitData ] = useState(null)

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
    console.log('Data', data);
    send(data.blob);
  };
  
  // TJ is testing out getting responses from fetch
  const random = Math.floor(Math.random() * 101)
  useEffect(() =>{
    // Get request using fetch inside useEffect React hook
    fetch("https://type.fit/api/quotes")
      .then( response => {
        return response.json();
      })
      .then( data =>{
        const quote = data[random]
        console.log("TJ quotes -----", data.indexOf(quote), quote);
        setWitData(data);
      })
  }, []);



  const send = (dataBlob) => {
    console.log("sendRequestToGlitch with data:");
    console.log(dataBlob);
  
    var formData = new FormData();
    formData.append("myfile", dataBlob);
    //formData.append("sanity", "i am crazy?");
    console.log("formData:", formData);
  
    const url = "http://localhost:8080/upload";
    const params = {
      method: "POST",
      body: formData,
      mode: 'no-cors'
    };
    return fetch(url, params)
      .then(response => response.text())
      .then(data => console.log(data))
      .catch((err) => {console.log(err)});
    }

  const recording = audioData;
 
    return (
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
    )
};