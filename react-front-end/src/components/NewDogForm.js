import react, { useState } from "react";

export default function NewDogForm(props) {
  const [name, setName] = useState("");

  const handleName = (e) => {
    setName(e.target.value);
  }

  return (
    <form className='add-dog-form'>
      <span className='add-a-dog'>Add a dog form</span>
      <div className='text-field'>
        <label className='dog-name'>Dog Name</label>
        <input className='dog-name-input' onChange={handleName} />
      </div>
      <span onClick={() => props.setAddDogDisplay(false)}>Cancel</span>
    </form>
  )
}