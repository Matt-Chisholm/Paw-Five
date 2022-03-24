import React from 'react';
import useSound from 'use-sound';
import audio from "../sounds/click.mp3";

export default function Squeaker() {
  
  const [playClick] = useSound(
    audio
  )

  return (
    <div>
      <button onClick={() => {playClick()}}>Sueaker</button>
    </div>
  )
}
