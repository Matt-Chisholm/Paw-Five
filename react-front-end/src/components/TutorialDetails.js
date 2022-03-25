import react from "react";


export default function TutorialDetails(props) {

  return (
    <div className="tutorial-details" onClick={props.onChange}>
      {props.tutorial_id}
    </div>
  )
}