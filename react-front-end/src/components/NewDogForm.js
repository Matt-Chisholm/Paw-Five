import axios from "axios";
import react, { useState } from "react";
import "./NewDogForm.scss";

export default function NewDogForm(props) {
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [photo, setPhoto] = useState("");
  const [labelError, setLabelError] = useState([]);

  const handleName = (e) => {
    setName(e.target.value);
    if (e.target.value.length >= 1) {
      const index = labelError.indexOf("name-error");
      // deleting name-error from errors array
      if (index !== -1) {
        const copyErrors = [...labelError];
        copyErrors.splice(index, 1);
        setLabelError(copyErrors);
      }
    }
  }

  const handleBreed = (e) => {
    setBreed(e.target.value);
    if (e.target.value.length >= 4) {
      const index = labelError.indexOf("breed-error");
      // deleting breed-error from errors array
      if (index !== -1) {
        const copyErrors = [...labelError];
        copyErrors.splice(index, 1);
        setLabelError(copyErrors);
      }
    }
  }

  const handlePhoto = (e) => {
    setPhoto(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLabelError([]);
    let noErrors = true;
    if (name.length < 1) {
      setLabelError(prev => [...prev, "name-error"]);
      noErrors = false;
    }
    if (breed.length < 4) {
      setLabelError(prev => [...prev, "breed-error"]);
      noErrors = false;
    }
    if (noErrors) {
      axios.post("/api/profile/add-dog", {
        name: name,
        breed: breed,
        photo: photo,
        user_id: props.user_id
      }).then((response) => {
        props.setTab("");
        props.setTab("Profile");
      })
    }

  }

  return (
    <form className='add-dog-form'>
      <span className='add-dog'>Add a dog form</span>
      <div className='text-field'>
        <label className='dog-name'>Dog Name</label>
        <input className='dog-name-input' value={name} type="text" onChange={handleName} />
        {(labelError.includes("name-error")) && <label className="label-error">Name should contain at least 1 character</label>}
      </div>
      <div className='text-field'>
        <label className='dog-breed'>Breed</label>
        <input className='dog-breed-input' value={breed} type="text" onChange={handleBreed} />
        {(labelError.includes("breed-error")) && <label className="label-error">Breed should contain at least 4 characters</label>}
      </div>
      <div className='text-field'>
        <label className='dog-photo'>Photo</label>
        <input className='dog-photo-input' value={photo} type="text" onChange={handlePhoto} />
      </div>
      <button className="dog-form-submit" onClick={handleSubmit}>Submit</button>
      <button className="dog-form-cancel" onClick={() => props.setAddDogDisplay(false)}>Cancel</button>
    </form>
  )
}