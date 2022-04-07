import axios from "axios";
import useUserProcessing from "./Hooks/useUserProcessing";
import "./SignUp.scss";

export default function SignUp(props) { 

  const {
    error,
    setError,
    name,
    email,
    password,
    labelError,
    setLabelError,
    errorMessage,
    handleName,
    handleBack,
    handleEmail,
    handlePassword
  } = useUserProcessing(props);

  // Handling the form submission
  const handleSubmit = (e) => {
    setLabelError([]);
    let noErrors = true;
    e.preventDefault();
    if (name.length < 8) {
      setLabelError(prev => [...prev, "name-error"]);
      noErrors = false;
    }
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

  return (
    <div className="form">
      <button className="back-button" onClick={handleBack}>
        Go Back
      </button>
      <div className="user-registration">
        <h1>Signup Page</h1>
      </div>

      <div className="messages-container">

        {error !== "ok" &&
          <div className="messages" onClick={() => setError("ok")}>
            {(error === "existing-user") && errorMessage("User already exists")}
          </div>
        }
      </div>

      <form>
        {/* Labels and inputs for form data */}
        <div className="text-field">
          <label className="label">Username</label>
          <input onChange={handleName} className="input"
            value={name} type="text" />
          {(labelError.includes("name-error")) && <label className="label-error">Name should contain at least 8 characters</label>}
        </div>

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
            Submit
          </button>
        </div>

      </form >
    </div >
  );
}