import axios from "axios";
import react, { useState } from "react";
import "./SignUp.scss";

export default function SignUp(props) {

  // States for registration
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  // Handling the name change
  const handleName = (e) => {
    setName(e.target.value);
    // setSubmitted(false);
  };

  // Handling the email change
  const handleEmail = (e) => {
    setEmail(e.target.value);
    // setSubmitted(false);
  };

  // Handling the password change
  const handlePassword = (e) => {
    setPassword(e.target.value);
    // setSubmitted(false);
  };

  // Handling the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.length < 8 || email.length < 8 || !email.includes("@") || password.length < 8) {
      setError(true);
    } else {
      setSubmitted(true);
      setError(false);
      axios.post("/api/userProcessing/register/", {
        username: name,
        email: email,
        password: password
      })
    }
  };

  // Showing success message
  const successMessage = () => {
    return (
      <div
        className="message success">
        <h1>User {name} is successfully registered!!</h1>
      </div>
    );
  };

  // Showing error message if error is true
  const errorMessage = () => {
    return (
      <div
        className="message error">
        <h1>Please enter all the fields</h1>
      </div>
    );
  };

  return (
    <div className="form">
      <div className="user-registration">
        <h1>User Registration</h1>
      </div>

      <div className="messages-container">

        {error &&
          <div className="messages" onClick={() => setError(false)}>
            {errorMessage()}
          </div>
        }
        {submitted &&
          <div className="messages" onClick={() => setError(false)}>
            {successMessage()}
          </div>
        }
      </div>

      <form>
        {/* Labels and inputs for form data */}
        <div className="text-field">
          <label className="label">Username</label>
          <input onChange={handleName} className="input"
            value={name} type="text" />
        </div>

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
            Submit
          </button>
        </div>

      </form >
    </div >
  );
}