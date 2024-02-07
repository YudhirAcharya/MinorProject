import { useState } from "react";
import "./styles.css";
import SignInForm from "./SignIn2";
import SignUpForm from "./SignUp2";
import Navbar from "../components/Navbar";

export default function Signing() {
  const [type, setType] = useState("signIn");

  // Separate formData states for sign-in and sign-up
  const [signInFormData, setSignInFormData] = useState({
    email: "",
    password: "",
    role: "",
  });

  const [signUpFormData, setSignUpFormData] = useState({
    user_id: "",
    user_name: "",
    full_name: "",
    email: "",
    password: "",
    phone_number: "",
    role: "",
  });

  const handleOnClick = (text) => {
    if (text !== type) {
      setType(text);
    }
  };

  const handleInputChange = (event) => {
    if (type === "signIn") {
      setSignInFormData({
        ...signInFormData,
        [event.target.name]: event.target.value,
      });
    } else if (type === "signUp") {
      setSignUpFormData({
        ...signUpFormData,
        [event.target.name]: event.target.value,
      });
    }
    console.log(setSignInFormData, setSignUpFormData);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (type === "signIn") {
      console.log("Sign In Form data submitted:", signInFormData);
      // Handle sign-in form submission logic here
    } else if (type === "signUp") {
      // Handle sign-up form submission logic here
      console.log("Sign Up Form data submitted:", signUpFormData);
    }
    console.log("Form submitted", setSignInFormData, setSignUpFormData);
  };

  const containerClass =
    "container " + (type === "signUp" ? "right-panel-active" : "");

  return (
    <div>
      <Navbar />

      <div className={`${containerClass} mx-auto my-5 `} id="container">
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
