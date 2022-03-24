import react, { useState } from "react";
import "./LogIn.scss"
import footprint from './images/footprint.png'
import classNames from "classnames";

export default function LogIn(props) {
  const [cover, setCover] = useState(true);

  const footprintClass = classNames('footprint', {'cover': cover}, {'uncover': !cover});
  const logInClass = classNames('log_in_btn', {'uncovered': !cover});
  const logoClass = classNames('logo', {'uncovered': !cover});

  return (
    <div className="login-page" onClick={() => setCover(!cover)}>
      <div className={logoClass}>
        PAWFIVE
      </div>

      <img id='foot_1' className={footprintClass} src={footprint} />
      <img id='foot_2' className={footprintClass} src={footprint} />
      <img id='foot_3' className={footprintClass} src={footprint} />
      <img id='foot_4' className={footprintClass} src={footprint} />
      <img id='foot_5' className={footprintClass} src={footprint} />

      <button className={logInClass} onClick={() => {props.setCookie("user_id", 1);}}>
        LOG IN
      </button>
    </div>
  )
}