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
                <input className='dog_name' defaultValue={dog.name} />
                <div className='dog_details'>
                  <img className='avatar' src={dog.avatar} />
                  <div className='dog_breed_and_stats'>
                    <span className='dog_breed'>{dog.breed}</span>
                    <div className='dog_stats'>
                      <div className='stats_bubble'>
                        <span className='bubble_data'>{dogsStats[index].data.sessions}</span>
                        <label className='bubble_label'>sessions</label>
                      </div>
                      <div className='stats_bubble'>
                        <span className='bubble_data'>{dogsStats[index].data.skills}</span>
                        <label className='bubble_label'>skills</label>
                      </div>
                      <div className='stats_bubble'>
                        <span className='bubble_data'>78</span>
                        <label className='bubble_label'>memories</label>
                      </div>
                    </div>
                  </div>
                </div>
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
