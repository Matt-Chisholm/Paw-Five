import React from 'react';
import { useState } from 'react';
import axios from 'axios';

export default function NewMemury(props) {
  const [dogName, setDogName] = useState();
  const [image, setImage] = useState();
  const postMemury = () => {
    axios
      .post(`/api/home/memuries/new`, {
        dogName: dogName,
        image: image,
      })
      .then((response) => {
        console.log(response);
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
  return (
    <div className="new-memury">
        <h1>Post new memury!</h1>
        <form>
<<<<<<< HEAD
          <label for="userId">Pup's Name  </label>
=======
          <label htmlFor="userId">Pup's Name : </label>
>>>>>>> master
          <input
            type="text"
            value={dogName}
            onChange={(e) => setDogName(e.target.value)}
          />
<<<<<<< HEAD
          <br />
          <label for="userId">Image URL  </label>
=======
          <label htmlFor="userId">Image URL : </label>
>>>>>>> master
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <br />
          <button className='mem-button' type="submit" onClick={(e) => {postMemury(); e.preventDefault(); }}>Create</button>
        </form>
      </div>
  )
}
