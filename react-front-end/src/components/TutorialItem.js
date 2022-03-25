import react from "react";

export default function TutorialItem(props) {

  return (
    <div className="tutorial-item" onClick={() => props.onChange(props.tutorial_id)}>
      {props.tutorial_id}
    </div>
  )
}