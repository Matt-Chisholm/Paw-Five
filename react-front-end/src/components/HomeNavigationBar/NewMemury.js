import React from 'react';
import { useState } from 'react';
import axios from 'axios';

export default function NewMemury(props) {
  const [dogName, setDogName] = useState();
  const [image, setImage] = useState();

  const [ submit, setSubmit ] = useState();

  const postMemury = () => {
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
    console.log("TJhandleChange", submit);
    setSubmit(event.target.value);
  }
  const handleSubmit = (event) => {
    console.log("TJhandlesubmit", event.target.value);
    alert(`Yummah ${submit}`);
    event.preventDefault();
  }
  // VIEW
  return (
    // <div className="new-memury">
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
          <button type="submit" value="Submit" onClick={(e) => {postMemury(); e.preventDefault(); handleSubmit(e)}}>Create</button>
        </form>
      // </div>
  )
}
