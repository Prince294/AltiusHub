import React, { useState } from "react";
import http from "../../services/utility";
import { login } from "../../redux/reducer/LoginReducer";
import { useDispatch } from "react-redux";
import { openSuccessTicker } from "../../redux/reducer/SuccessTickerReducer";

export default function Login() {
  const dispatch = useDispatch();

  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const onInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async () => {
    let errorFound = true;
    if (formData.username.length < 3) {
      setError("Username Should contain more than 3 characters");
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      setError("Incorrect Email!");
    } else if (formData.password.length < 8) {
      setError("Password Should contain more than 8 characters");
    } else {
      setError("");
      errorFound = false;
    }

    if (!errorFound) {
      // await http
      //   .post("/login", formData)
      //   .then((res) => {
      localStorage.setItem("loggedIn", true);
      localStorage.setItem("loggedInTime", new Date());

      dispatch(
        openSuccessTicker({
          title: "Success",
          body: "Successfully Logged in ",
        })
      );
      dispatch(login());
      // })
      // .catch((err) => {
      //   setError(err);
      // });
    }
  };

  return (
    <div className="login">
      <h3>Log In</h3>
      <div className="login__content">
        {error.length > 0 && <span className="errors">{error}</span>}

        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={(e) => onInputChange(e)}
          value={formData.username}
        />
        <input
          type="text"
          name="email"
          placeholder="Email"
          onChange={(e) => onInputChange(e)}
          value={formData.email}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={(e) => onInputChange(e)}
          value={formData.password}
        />

        <button onClick={handleSubmit}>Login</button>
      </div>
    </div>
  );
}
