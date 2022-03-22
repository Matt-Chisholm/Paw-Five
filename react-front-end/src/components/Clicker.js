import React from 'react';
import useSound from 'use-sound';
import audio from "../sounds/click.mp3";

export default function Clicker() {
  
  const [playClick] = useSound(
    audio
  )

  return (
    <div>
      <button onClick={() => {playClick()}}>Clicker</button>
    </div>
  )
}
