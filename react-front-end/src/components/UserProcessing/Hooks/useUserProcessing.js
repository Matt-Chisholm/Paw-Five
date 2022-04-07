import axios from "axios";
import { useState } from "react";

export default function useUserProcessing(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // States for checking the errors
  const [error, setError] = useState("ok");
  const [labelError, setLabelError] = useState([]);


  // Handling the name change
  const handleName = (e) => {
    setName(e.target.value);
    setError("ok");
  };

  // Handling the email change
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setError("ok");
    if (e.target.value.length >= 8 && e.target.value.includes("@")) {
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
    if (e.target.value.length >= 8) {
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


  return {error, setError, name, email, password, labelError, setLabelError, handleName, handleEmail, handlePassword, handleBack, handleSubmit, errorMessage};
}