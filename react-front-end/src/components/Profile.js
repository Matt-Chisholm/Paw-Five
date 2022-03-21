import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import './Profile.scss';


export default function Profile(props) {
  const [dogs, setDogs] = useState([]);
  const [dogsStats, setDogStats] = useState([]);


  // selected dog
  // const [dog, setDog] = useState();

  useEffect(() => {
    axios.get(`/api/profile/dog/${props.user_id}`).then((response) => {
      const dogs = response.data;
      setDogs(dogs);
    });
  }, []);

  useEffect(() => {

    let promiseArray = [];
    dogs
    .map(dog => {
      let p = axios.get(`/api/profile/dog/stats/${dog.id}`)
      promiseArray.push(p);
      // axios.get(`/api/profile/dog/stats/${dog.id}`).then((res) => {
        //   setDogStats([...dogsStats, res.data]);
        // })
      })
      
      Promise.all(promiseArray)
      .then((res) => {
        setDogStats([...res]);
      })
  }, [dogs]);

  const dogsLicenses = () => {
    return dogs.map((dog, index) => {
      return  <div className='license' key={index}>
                <span className='dog_name'>{dog.name}</span>
                <img className='avatar' src={dog.avatar} />
                <span className='dog_breed'>{dog.breed}</span>
                <label>Sessions:</label>
                <span className='sessions'>{dogsStats[index].data.sessions}</span>
                <label>Skills:</label>
                <span className='skills'>{dogsStats[index].data.skills}</span>
                <label>Memories:</label>
                <span className='memories'>78</span>
              </div>
    });
  }
      
  

  return (
    <div>
      <div id='profile'>
        {(dogs.length > 0 && dogsStats.length > 0) && dogsLicenses()}
      </div>
    </div>
  )
}
