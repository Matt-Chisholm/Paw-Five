import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import './Profile.scss';
import Skills from './Skills';
import Sessions from './Sessions';
import LoadingSpinner from './LoadingSpinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/fontawesome-free-solid';

export default function Profile(props) {
  const [dogs, setDogs] = useState([]);
  const [dogsStats, setDogStats] = useState([]);
  const [detailsDisplay, setDetailsDisplay] = useState(false);
  const [isDetailsLoading, setIsDetailsLoading] = useState(false);
  const [skills, setSkills] = useState([]);
  const [sessions, setSessions] = useState([]);



  useEffect(() => {
    props.setIsLoading(true);
    axios.get(`/api/profile/dog/${props.user_id}`).then((response) => {
      const dogs = response.data;
      setDogs(dogs);
      props.setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    props.setIsLoading(true);
    let promiseArray = [];
    dogs
      .map(dog => {
        let p = axios.get(`/api/profile/dog/stats/${dog.id}`)
        promiseArray.push(p);
      })

    Promise.all(promiseArray)
      .then((res) => {
        setDogStats([...res]);
        props.setIsLoading(false);
      })
  }, [dogs]);

  useEffect(() => {
    if (detailsDisplay) {
      setIsDetailsLoading(true);
      axios.get(`/api/profile/skills/${dogs[0].id}`).then((response) => {
        const percents = response.data;
        setSkills(percents);
        setIsDetailsLoading(false);
      });
    }
  }, [detailsDisplay]);

  useEffect(() => {
    if (detailsDisplay) {
      setIsDetailsLoading(true);
      axios.get(`/api/profile/sessions/${dogs[0].id}`).then((response) => {
        const sessions = response.data;
        setSessions(sessions);
        setIsDetailsLoading(false);
      });
    }
  }, [detailsDisplay]);



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
                <span className='bubble_data'>{dogsStats[index] ? dogsStats[index].data.memuries : 0}</span>
                <label className='bubble_label'>memuries</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    });
  }

  const renderDogLicense = (dog) => {
    if (dogs.length === 1) {
      props.setIsLoading(true);
      axios.get(`/api/profile/dog/${props.user_id}`).then((response) => {
        props.setIsLoading(false);
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
    <>
      {props.isLoading ? <div className='loading_spinner'><LoadingSpinner /></div> :
        <div>
          <div id='profile'>
            {(dogs.length > 0 && dogsStats.length > 0) && dogsLicenses(dogs)}
          </div>
          {isDetailsLoading ? <div className='loading_spinner'><LoadingSpinner /></div> :
            <>
              {dogs.length === 0 && <div className='add-dog-button'><FontAwesomeIcon icon={faPlus} className="fa-7x" /><span>Add a dog</span></div>}
              <div>
                {detailsDisplay && <Skills dog_id={dogs[0].id} setIsDetailsLoading={(p) => setIsDetailsLoading(p)} skills={skills} />}
                {detailsDisplay && <Sessions dog_id={dogs[0].id} setIsDetailsLoading={(p) => setIsDetailsLoading(p)} sessions={sessions} />}
                {detailsDisplay && <button className='exit-button' onClick={() => {
                  renderDogLicense(dogs[0])
                }}>EXIT</button>}
              </div>
            </>
          }
        </div>
      }
    </>
  )
}
