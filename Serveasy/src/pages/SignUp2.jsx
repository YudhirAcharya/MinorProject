import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function SignUpForm() {
  const [state, setState] = React.useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  };

  const navigate = useNavigate();

  const handleOnSubmit = (evt) => {
    evt.preventDefault();

    // log garna lai object
    const { name, email, password } = state;
    console.log(
      `You are sign up with name: ${name} email: ${email} and password: ${password}`
    );
    console.log(state);

    for (const key in state) {
      setState({
        ...state,
        [key]: "",
      });
    }
    axios
      .post("http://127.0.0.1/users/register", state)
      .then((res) => {
        if (res.data.Status === "Success") {
          navigate("/SignIn2");
        } else {
          alert("error!");
        }
      })
      .then((err) => console.log(err));
  };

  return (
    <div className="form-container sign-up-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Create Account</h1>

        {/* <div className="social-container">
          <a href="#" className="social">
            <i className="fab fa-facebook-f" />
          </a>
          <a href="#" className="social">
            <i className="fab fa-google-plus-g" />
          </a>
          <a href="#" className="social">
            <i className="fab fa-linkedin-in" />
          </a>
        </div> */}
        <span>Use your email for registration</span>
        <div className="input-box3">
          <input
            type="text"
            name="name"
            value={state.name}
            onChange={handleChange}
            placeholder="Name"
          />
          <input
            type="email"
            name="email"
            value={state.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <input
            type="password"
            name="password"
            value={state.password}
            onChange={handleChange}
            placeholder="Password"
          />
        </div>
        <button className="main-button" style={{ marginTop: "15px" }}>
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignUpForm;
