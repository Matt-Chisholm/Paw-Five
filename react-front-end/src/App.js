import React from 'react';
import './App.css';
import Example from './components/example';
import Recorder from './components/Recorder';
import NavBar from './components/NavBar';

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


