import React from "react";
import { useEffect } from "react";
// import axios from "axios";
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
      const response = await fetch("http://127.0.0.1:3001/users/register", {
        method: "POST",
        body: JSON.stringify(state),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        navigate("/"); // Assuming a success page exists
      } else {
        alert(data.Error); // Or handle errors more gracefully
      }
    } catch (error) {
      console.error("Error:", error);
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
          </select>
        </div>
        <a href="#">Forgot your password?</a>
        <button className="main-button">Sign In</button>
      </form>
    </div>
  );
}

export default SignInForm;
