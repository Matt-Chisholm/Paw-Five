import axios from "axios";
import react, { useState } from "react";

export default function LogIn(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // States for checking the errors
  const [error, setError] = useState("ok");

  // Handling the email change
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setError("ok");
  };

  // Handling the password change
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setError("ok");
  };

  // Handling the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.length < 8 || !email.includes("@") || password.length < 8) {
      setError("input-error");
    } else {
      axios.post("/api/userProcessing/login/", {
        email: email,
        password: password
      }).then((response) => {
        if (Number(response.data.id) === -1) {
          setError("wrong-data");
        } else {
          localStorage.setItem("username", response.data.username);
          props.setCookie("user_id", Number(response.data.id));
        }
      })
    }
  };

  // Showing error message if error is true
  const errorMessage = (message) => {
    return (
      <div
        className="message error">
        <h1>{message}</h1>
      </div>
    );
  };

  const handleBack = () => {
    props.setView("landing");
    props.setCover(false);
  }

  return (
    <div className="form">
      <button className="back-button" onClick={handleBack}>
        Go Back
      </button>
      <div className="user-registration">
        <h1>Login Page</h1>
      </div>

      <div className="messages-container">

        {error !== "ok" &&
          <div className="messages" onClick={() => setError("ok")}>
            {(error === "input-error") ?
              errorMessage("Please enter all the fields") : errorMessage("User doesn't exist or data is incorrect")
            }
          </div>
        }
      </div>

      <form>

        <div className="text-field">
          <label className="label">Email</label>
          <input onChange={handleEmail} className="input"
            value={email} type="email" />
        </div >

        <div className="text-field">
          <label className="label">Password</label>
          <input onChange={handlePassword} className="input"
            value={password} type="password" />
        </div >

        <div id="submit">
          <button onClick={handleSubmit} className="btn" type="submit">
            Log In
          </button>
        </div>

      </form >
    </div >
  );
}