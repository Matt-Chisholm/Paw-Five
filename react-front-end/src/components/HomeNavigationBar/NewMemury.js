import React from 'react';
import { useState } from 'react';
import axios from 'axios';

export default function NewMemury(props) {
  const [dogName, setDogName] = useState();
  const [image, setImage] = useState();

  // FOR VALIDATING FORM SUBMISSION
  const [ submit, setSubmit ] = useState("");



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
        setSubmit("");
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


  const handleChange = (event) => {
    console.log("typing into the form you get: ", submit);
    setSubmit(event.target.value);
  };
  const handleSubmit = (event) => {
    console.log("TJTJ");
    event.preventDefault();
    if (submit.length === 0) {
      alert("cannot be empty");
      return;
    }
  };


  // VIEW
  return (
        <form className='memuries-form'>
          <h2>Paws & Save</h2>
          <h4>training memuries</h4>
          <input
            placeholder="Doggo's name here"
            type="text"
            value={dogName}
            onChange={(e) => {
              setDogName(e.target.value);
              handleChange(e)
            }}
            />
          <input
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
