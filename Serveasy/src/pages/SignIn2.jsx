import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

function SignInForm() {
  const [state, setState] = React.useState({
    email: "",
    password: "",
    role: "",
  });

  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  };
  const navigate = useNavigate();
  const handleRoleSubmit = (role) => {
    setState({ ...state, role });
    handleOnSubmit();
  };

  const handleOnSubmit = async (evt) => {
    evt.preventDefault();

    // Validate input
    if (!state.email || !state.password) {
      alert("Please enter both email and password.");
      return;
    }

    try {
      const response = await fetch(
        "http://127.0.0.1:3001/users/login",
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
        const { email, password } = data.user;

        if (
          state.email === email &&
          state.password === password
        ) {
          // Authentication successful
          navigate(getRedirectPath(state.role));
        } else {
          // Authentication failed
          alert(
            "Authentication failed. Email/Password error"
          );
        }
      } else {
        console.error("Error:", data.error);
        alert("Authentication failed.");
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

  return (
    <div className="form-container sign-in-container">
      <form onSubmit={handleOnSubmit}>
        <h1 className="form-login-title">Sign in</h1>

        <div className="input-box2">
          <input
            type="email"
            placeholder="Email"
            name="email"
            required
            value={state.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            autoComplete="off"
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
                type="submit"
                onClick={() => handleRoleSubmit("chef")}
                className={`main-button ${state.role === "chef" ? "active" : ""}`}
              >
                Chef
              </button>
              <button
                type="submit"
                onClick={() => handleRoleSubmit("user")}
                className={`main-button ${state.role === "user" ? "active" : ""}`}
              >
                User
              </button>
              <button
                type="submit"
                onClick={() => handleRoleSubmit("delivery")}
                className={`main-button ${state.role === "chef" ? "active" : ""}`}
              >
                Delivery
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignInForm;
