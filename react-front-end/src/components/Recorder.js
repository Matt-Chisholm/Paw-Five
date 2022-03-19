import React, { useState } from 'react'
 
import AudioReactRecorder, { RecordState } from 'audio-react-recorder'
 

export default function Recorder(props) {
  const [recordState, setRecordState] = useState(null)
  const [ audioData, setAudioData ] = useState(null)

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
  };

  const recording = audioData;
 
    return (
      <div>
        <AudioReactRecorder state={recordState} onStop={onStop} />
        <audio
        controls
          src={recording ? recording.url : null}
        ></audio>
        <div>
          <button onClick={()=>start()}>Start</button>
          <button onClick={()=>pause()}>Pause</button>
          <button onClick={()=>stop()}>Stop</button>
        </div>
      </div>
    )
};