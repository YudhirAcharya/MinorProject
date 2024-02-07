import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function SignInForm() {
  const [state, setState] = React.useState({
    email: "",
    password: "",
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
  axios.defaults.withCredentials = true;
  const handleOnSubmit = (evt) => {
    evt.preventDefault();

    // log garna lai object
    const { email, password } = state;
    console.log(`You are login with email: ${email} and password: ${password}`);
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
          navigate("/");
        } else {
          alert(res.data.Error);
        }
      })
      .then((err) => console.log(err));
  };

  return (
    <div className="form-container sign-in-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Sign in</h1>

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
        </div>
        <a href="#">Forgot your password?</a>
        <button className="main-button">Sign In</button>
      </form>
    </div>
  );
}

export default SignInForm;
