import React from "react";
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
  const handleOnSubmit = (evt) => {
    evt.preventDefault();

    // log garna lai object
    const { email, password, role } = state;
    console.log(
      `You are a ${role} and logged in with email: ${email} and password: ${password}`
    );
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
    fetch("http://127.0.0.1/users/register", {
      method: "POST",
      body: JSON.stringify(state),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then(() => {
        // Handle successful response
        // e.g., navigate to a different page
        navigate("/success"); // Assuming a success page exists
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle errors appropriately
      });
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
