import react, { useState } from "react";
import "./Landing.scss"
import footprint from './images/footprint.png'
import classNames from "classnames";
import SignUp from './UserProcessing/SignUp';
import LogIn from './UserProcessing/LogIn';

export default function Landing(props) {
  const [cover, setCover] = useState(true);
  const [view, setView] = useState("landing");

  const footprintClass = classNames('footprint', { 'cover': cover }, { 'uncover': !cover });
  const landingClass = classNames('landing__paws', { 'landing__paws covered': cover }, { 'landing__paws uncovered': !cover });
  const logInClass = classNames('log_in_btn', { 'uncovered': !cover });
  const logoClass = classNames('logo', { 'uncovered shake-chunk shake-chunk--hover': !cover });

  return (
    <>
      {view === "signup" && <SignUp setCookie={props.setCookie} />}
      {view === "login" && <LogIn />}
      {view === "landing" &&
        <div className="login-page" >

          <div className={landingClass} onClick={() => setCover(!cover)}>
          <img id='foot_1' className={footprintClass} src={footprint} />
          <img id='foot_2' className={footprintClass} src={footprint} />
          <img id='foot_3' className={footprintClass} src={footprint} />
          <img id='foot_4' className={footprintClass} src={footprint} />
          <img id='foot_5' className={footprintClass} src={footprint} />
          </div>

          <div className={logoClass}>
            PAWFIVE
          </div>


          <button className={logInClass} onClick={() => {
            setView("login");
            props.setCookie("user_id", 1);
          }}>
            LOG IN
          </button>
          
          <button className={logInClass} onClick={() => {
            setView("signup");
          }}>
            SIGN UP
          </button>
        </div>
      }
    </>
  )
}