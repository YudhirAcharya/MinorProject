import { useState } from "react";
import "./styles.css";
import SignInForm from "./SignIn2";
import SignUpForm from "./SignUp2";

export default function Signing() {
  const [type, setType] = useState("signIn");

  // Separate formData states for sign-in and sign-up
  const [signInFormData, setSignInFormData] = useState({
    username: "",
    password: "",
  });

  const [signUpFormData, setSignUpFormData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const handleOnClick = (text) => {
    if (text !== type) {
      setType(text);
    }
  };

  const handleInputChange = (field, value) => {
    if (type === "signIn") {
      setSignInFormData({
        ...signInFormData,
        [field]: value,
      });
    } else if (type === "signUp") {
      setSignUpFormData({
        ...signUpFormData,
        [field]: value,
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (type === "signIn") {
      console.log("Sign In Form data submitted:", signInFormData);
      // Handle sign-in form submission logic here
    } else if (type === "signUp") {
      console.log("Sign Up Form data submitted:", signUpFormData);
      // Handle sign-up form submission logic here
    }
  };

  const containerClass =
    "container " + (type === "signUp" ? "right-panel-active" : "");

  return (
    <div className="App">
      <h2 style={{ fontSize: "30px" }}>Sign in/up Form</h2>
      <div className={containerClass} id="container">
        <SignUpForm
          formData={signUpFormData}
          onInputChange={handleInputChange}
          onSubmit={handleSubmit}
        />
        <SignInForm
          formData={signInFormData}
          onInputChange={handleInputChange}
          onSubmit={handleSubmit}
        />
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button
                className="ghost"
                id="signIn"
                onClick={() => handleOnClick("signIn")}
              >
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button
                className="ghost "
                id="signUp"
                onClick={() => handleOnClick("signUp")}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
