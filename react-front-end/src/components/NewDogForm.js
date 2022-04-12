import react from "react";

export default function NewDogForm(props) {

  return (
    <div className='add-dog-form' onClick={() => setAddDogDisplay(false)}>
      <div className='text-field'>
        <label className=''></label>
      </div>
      <span className='add-a-dog'>Add a dog form</span>
    </div>
  )
}