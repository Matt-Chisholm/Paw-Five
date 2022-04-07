import axios from "axios";
import react, { useState } from "react";

export default function LogIn(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // States for checking the errors
  const [error, setError] = useState("ok");
  const [labelError, setLabelError] = useState([]);

  // Handling the email change
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setError("ok");
    if (email.length >= 8 && email.includes("@")) {
      const index = labelError.indexOf("email-error");
      // deleting email-error from errors array
      if (index !== -1) {
        const copyErrors = [...labelError];
        copyErrors.splice(index, 1);
        setLabelError(copyErrors);
      }
    }
  };
  
  // Handling the password change
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setError("ok");
    if (password.length > 7) {
      const index = labelError.indexOf("password-error");
      // deleting pasword-error from errors array
      if (index !== -1) {
        const copyErrors = [...labelError];
        copyErrors.splice(index, 1);
        setLabelError(copyErrors);
      }
    }
  };

  // Handling the form submission
  const handleSubmit = (e) => {
    setLabelError([]);
    let noErrors = true;
    e.preventDefault();
    if (email.length < 8 || !email.includes("@")) {
      setLabelError(prev => [...prev, "email-error"]);
      noErrors = false;
    }
    if (password.length < 8) {
      setLabelError(prev => [...prev, "password-error"]);
      noErrors = false;
    }
    if (noErrors) {
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
            {(error === "wrong-data") && errorMessage("User doesn't exist or data is incorrect")}
          </div>
        }
      </div>

      <form>

        <div className="text-field">
          <label className="label">Email</label>
          <input onChange={handleEmail} className="input"
            value={email} type="email" />
          {(labelError.includes("email-error")) && <label className="label-error">Email should contain '@' sign and at least 8 characters</label>}
        </div >

        <div className="text-field">
          <label className="label">Password</label>
          <input onChange={handlePassword} className="input"
            value={password} type="password" />
          {(labelError.includes("password-error")) && <label className="label-error">Password should contain at least 8 characters</label>}
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