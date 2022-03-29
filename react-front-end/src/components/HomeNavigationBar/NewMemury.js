import React from 'react';
import { useState } from 'react';
import axios from 'axios';

export default function NewMemury(props) {
  const [dogName, setDogName] = useState();
  const [image, setImage] = useState();

  // FOR VALIDATING FORM SUBMISSION
  const [ submitName, setSubmitName ] = useState("");
  const [ submitURL, setSubmitURL ] = useState("");
  const [ error, setError ] = useState("false");


  const postMemury = (event) => {
    handleSubmit(event)

    axios
      .post(`/api/home/memuries/new`, {
        dogName: dogName,
        image: image,
      })
      .then((response) => {
        // console.log(response);
        setDogName('');
        setImage('');
        props.setRender();
        setSubmitName("");
        setSubmitURL("");
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


  // work in progress: goal is to prevent symbols in name.
  const handleChange = (event) => {
    console.log("typing into the form you get: ", event.target.name);
    const inputName = event.target.name;
    const inputGeneral = event.target.value;

    inputName === "name" && setSubmitName(inputGeneral);
    inputName === "url"  && setSubmitURL(inputGeneral);
    
    const pattern = "?!";

  
    if (inputName === "name" && inputGeneral.length > 0 ) {

      inputGeneral.forEach(char => {
        if (pattern.includes(char)) {
          return setError("true")
        } 
      });
      return setError("false")
    } 
  };

  const handleSubmit = (event) => {
    // console.log("TJTJ", event.target);
    event.preventDefault();
    if (submitName.length === 0) {
      alert("Name cannot be empty");
      return;
    }
    if (submitURL.length === 0) {
      alert("Photo URL cannot be empty");
      return;
    }
  };


  const handleBlur = (event) => {
    // just trying out both options on handling blur with inline pattern attribute, and function
    event.target.validity.patternMismatch ? setError("true") : setError("true");
  };

  function style(error) {
    if (error === "true") {
      return {
        backgroundColor: "rgba(255, 0, 0, 0.5)"
      }
    }
  }
  // VIEW
  return (
        <form className='memuries-form'>
          <h2>Paws & Save</h2>
          <h4>training memuries</h4>
          <input
            name="name"
            placeholder="Doggo's name here"
            type="text"
            // pattern='[a-z]?'
            // onBlur={handleBlur}
            style={style(error)}
            value={dogName}
            onChange={(e) => {
              setDogName(e.target.value);
              handleChange(e)
            }}
            />
          <input
            name="url"
            placeholder="Photo URL goes here"
            type="text"
            value={image}
            onChange={(e) => {
              setImage(e.target.value)
              handleChange(e)
            }}
          />
          <button type="submit" value="Submit" onClick={(e) => {
            // handleSubmit(e);
            postMemury(e);
            e.preventDefault(); 
          }}>Create</button>
        </form>
  )
}
