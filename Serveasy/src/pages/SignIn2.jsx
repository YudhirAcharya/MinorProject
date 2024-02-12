import React from "react";
import { useEffect } from "react";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import { NavLink, Link } from "react-router-dom";
function SignInForm() {
  const [state, setState] = React.useState({
    email: "",
    password: "",
    role: "user",
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
  const handleOnSubmit = (evt) => {
    evt.preventDefault();

    console.log(state);

    for (const key in state) {
      setState({
        ...state,
        [key]: "",
      });
    }
    // axios
    //   .post("http://127.0.0.1/users/register", state)
    //   .then((res) => {
    //     if (res.data.Status === "Success") {
    //       navigate("/");
    //     } else {
    //       alert(res.data.Error);
    //     }
    //   })
    //   .then((err) => console.log(err));
    // fetch("http://127.0.0.1/users/register", {
    //   method: "POST",
    //   body: JSON.stringify(state),
    //   headers: { "Content-Type": "application/json" },
    // })
    //   .then((response) => response.json())
    //   .then(() => {
    //     // Handle successful response
    //     // e.g., navigate to a different page
    //     navigate("/success"); // Assuming a success page exists
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //     // Handle errors appropriately
    //   });
  };
  useEffect(() => {
    // Assuming `state` contains the registration data
    fetch("http://127.0.0.1:3001/users/register", {
      method: "POST",
      body: JSON.stringify(state),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) {
          switch (response.status) {
            case 400:
              break;
            case 401:
              break;
            case 404:
              break;
            case 500:
              break;
          }
        }
        return response.json();
      })
      .then((res) => {
        if (res.success) {
          switch (state.role) {
            case "user":
              navigate("/home");
              break;
            case "chef":
              navigate("/home-chef");
              break;
            case "delivery":
              navigate("/home-delivery");
              break;
            default:
              navigate("/home");
          }
        } else {
          alert(
            res.message ||
              "Registration failed, please check your details."
          );
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [state, navigate]);

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
            <option value="user" className="options">
              User
            </option>
            <option value="chef" className="options">
              Chef
            </option>
            <option value="user" className="options">
              Delivery
            </option>
          </select>
        </div>
        <a href="#">Forgot your password?</a>
        <Link to="/home">
          <button className="main-button">Sign In</button>
        </Link>
      </form>
    </div>
  );
}

export default SignInForm;
