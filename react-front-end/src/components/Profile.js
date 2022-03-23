import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import './Profile.scss';
import Skills from './Skills';
import Sessions from './Sessions';


export default function Profile(props) {
  const [dogs, setDogs] = useState([]);
  const [dogsStats, setDogStats] = useState([]);
  const [detailsDisplay, setDetailsDisplay] = useState(false);



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
      })

    Promise.all(promiseArray)
      .then((res) => {
        setDogStats([...res]);
      })
  }, [dogs]);



  let dogsLicenses = (dogs) => {
    return dogs.map((dog, index) => {
      return <div className='license' key={index} onClick={() => renderDogLicense(dog)}>
        <div className='dog_name'>{dog.name}</div>
        <div className='dog_details'>
          <img className='avatar' src={dog.avatar} />
          <div className='dog_breed_and_stats'>
            <span className='dog_breed'>{dog.breed}</span>
            <div className='dog_stats'>
              <div className='stats_bubble'>
                <span className='bubble_data'>{dogsStats[index] ? dogsStats[index].data.sessions : 0}</span>
                <label className='bubble_label'>sessions</label>
              </div>
              <div className='stats_bubble'>
                <span className='bubble_data'>{dogsStats[index] ? dogsStats[index].data.skills : 0}</span>
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

  const renderDogLicense = (dog) => {
    if (dogs.length === 1) {
      axios.get(`/api/profile/dog/${props.user_id}`).then((response) => {
        const dogs = response.data;
        setDogs(dogs);
      });
      setDetailsDisplay(false);
    } else {
      setDogs([dog]);
      setDetailsDisplay(true);
    }
  }



  return (
    <div>
      <div id='profile'>
        {(dogs.length > 0 && dogsStats.length > 0) && dogsLicenses(dogs)}
      </div>
        {detailsDisplay && <Skills dog_id={dogs[0].id}/>}
        {detailsDisplay && <Sessions dog_id={dogs[0].id}/>}
    </div>
  )
}
