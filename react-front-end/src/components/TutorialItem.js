import react from "react";

export default function TutorialItem(props) {
console.log("tutorialitems props", props);
  return (
    <div className="tutorial-item" onClick={() => props.onChange(props.tutorial_id)}>
      <div className="icon">
        {/* {props.icon} */}
      </div>
      <div className="right-side">
        <div className="title">
          {props.name}
        </div>
        <div className="level">
          <p>Level: {props.level}</p>
        </div>
      </div >
    </div>
  )
}

