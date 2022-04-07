import useUserProcessing from "./Hooks/useUserProcessing";

export default function LogIn(props) {
  const {
    error,
    setError,
    email,
    password,
    labelError,
    errorMessage,
    handleBack,
    handleEmail,
    handlePassword,
    handleSubmit
  } = useUserProcessing(props);

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