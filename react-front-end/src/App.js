import React from 'react';
import './App.css';
import Example from './components/example';
import NavBar from './components/NavBar';
import Recorder from './components/Recorder';
export default function App(props) {


  return (
    <div className="App">
        <h1>Paw Five</h1>
        <Example />
        <Recorder />
        <NavBar />
      </div>
  )
}


