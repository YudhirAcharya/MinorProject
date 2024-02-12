import React from "react";
// import { useEffect } from "react";
// import axios from "axios";
import { NavLink } from "react-router-dom";

import { useNavigate } from "react-router-dom";
function SignInForm() {
  const [state, setState] = React.useState({
    email: "",
    password: "",
    role: "",
  });
  const handleChange = (evt) => {
    evt.preventDefault();
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  };
  const navigate = useNavigate();
  // axios.defaults.withCredentials = true;

  const handleOnSubmit = async (evt) => {
    evt.preventDefault();
    for (const key in state) {
      setState({
        ...state,
        [key]: "",
      });
    }
    try {
      const response = await fetch(
        "http://127.0.0.1:3001/users/register",
        {
          method: "POST",
          body: JSON.stringify(state),
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        throw new Error(
          `Network response was not ok: ${response.status}`
        );
      }

      const data = await response.json();

      if (data.success) {
        navigate(getRedirectPath(state.role));
      } else {
        alert(data.Error); // Or handle errors more gracefully
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const getRedirectPath = (role) => {
    switch (role) {
      case "chef":
        return "/chef-home";
      case "user":
        return "/user-home";
      case "delivery":
        return "/delivery-home";
      default:
        return "/";
    }
  };
  // useEffect(() => {
  //   // Assuming `state` contains the registration data
  //   fetch("http://127.0.0.1:3001/users/register", {
  //     method: "POST",
  //     body: JSON.stringify(state),
  //     headers: { "Content-Type": "application/json" },
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         switch (response.status) {
  //           case 400:
  //             break;
  //           case 401:
  //             break;
  //           case 404:
  //             break;
  //           case 500:
  //             break;
  //         }
  //       }
  //       return response.json();
  //     })
  //     .then((res) => {
  //       if (res.success) {
  //         navigate("/success");
  //       } else {
  //         res.message || "Registration failed, please check your details.";
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  // }, [state, navigate]);

  return (
    <div className="form-container sign-in-container">
      <form onSubmit={handleOnSubmit}>
        <h1 className="form-login-title">Sign in</h1>

        <div className="input-box2">
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={state.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={state.password}
            onChange={handleChange}
          />
          <div className="">
            <h2>You will sign in as:</h2>
            <select
              name="role"
              value={state.role}
              onChange={handleChange}
              className="selects"
            >
              <option value="chef" className="options">
                Chef
              </option>
              <option value="user" className="options">
                User
              </option>
              <option value="delivery" className="options">
                Delivery
              </option>
            </select>
            <div className="m-1">
              <button
                type="button"
                className={`main-button ${state.role === "chef" ? "active" : ""}`}
                onClick={() =>
                  setState({ ...state, role: "chef" })
                }
              >
                <NavLink
                  to="/chef-home"
                  className={`main-button ${state.role === "chef" ? "active" : ""}`}
                  onClick={() =>
                    setState({ ...state, role: "chef" })
                  }
                >
                  Chef
                </NavLink>
              </button>
              <button
                type="button"
                className={`main-button ${state.role === "user" ? "active" : ""}`}
                onClick={() =>
                  setState({ ...state, role: "user" })
                }
              >
                <NavLink
                  to="/user-home"
                  className={`main-button ${state.role === "user" ? "active" : ""}`}
                  onClick={() =>
                    setState({ ...state, role: "user" })
                  }
                >
                  User
                </NavLink>
              </button>
              <button
                type="button"
                className={`main-button ${state.role === "chef" ? "active" : ""}`}
                onClick={() =>
                  setState({ ...state, role: "delivery" })
                }
              >
                <NavLink
                  to="/delivery-home"
                  className={`main-button ${state.role === "delivery" ? "active" : ""}`}
                  onClick={() =>
                    setState({ ...state, role: "delivery" })
                  }
                >
                  Delivery
                </NavLink>
              </button>
            </div>
          </div>
        </div>
        <div className=" flex flex-col mt-16">
          <a href="#">Forgot your password?</a>
          <button className="main-button">Sign In</button>
        </div>
      </form>
    </div>
  );
}

export default SignInForm;
