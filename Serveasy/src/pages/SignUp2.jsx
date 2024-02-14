import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

function SignUpForm() {
  const [state, setState] = useState({
    user_id: "",
    user_name: "",
    full_name: "",
    email: "",
    password: "",
    phone_number: "",
    role: "user",
  });

  const navigate = useNavigate();

  const handleChange = (evt) => {
    const value = evt.target.value;
    setState((prevState) => ({
      ...prevState,
      user_id: prevState.user_id || `u_${uuidv4()}`,
      [evt.target.name]: value,
    }));
  };

  const handleOnSubmit = async (evt) => {
    evt.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:3001/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(state),
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        navigate(getRedirectPath(state.role));
      } else {
        console.error("Error:", data.error);
        alert("Registration failed. Please check your details.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Registration failed. Please try again later.");
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

  return (
    <div className="form-container sign-up-container">
      <form onSubmit={handleOnSubmit}>
        <h1 className="form-title">Create Account</h1>

        <div className="input-box3">
          <input
            type="text"
            name="user_name"
            value={state.user_name}
            onChange={handleChange}
            required
            placeholder="User Name"
          />

          <input
            type="text"
            name="full_name"
            value={state.full_name}
            onChange={handleChange}
            required
            placeholder="Full Name"
          />

          <input
            type="email"
            name="email"
            value={state.email}
            onChange={handleChange}
            required
            placeholder="Email"
          />

          <input
            type="password"
            name="password"
            value={state.password}
            required
            autoComplete="off"
            onChange={handleChange}
            placeholder="Password"
          />

          <input
            type="tel"
            name="phone_number"
            value={state.phone_number}
            required
            onChange={handleChange}
            placeholder="Phone Number"
          />

          <div className="m-1">
            <h2>You will sign up as:</h2>
          </div>
          <select
            name="role"
            value={state.role}
            required
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
              type="submit"
              className={`main-button ${state.role === "chef" ? "active" : ""}`}
            >
              Chef
            </button>
            <button
              type="submit"
              className={`main-button ${state.role === "user" ? "active" : ""}`}
            >
              User
            </button>
            <button
              type="submit"
              className={`main-button ${state.role === "delivery" ? "active" : ""}`}
            >
              Delivery
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignUpForm;
