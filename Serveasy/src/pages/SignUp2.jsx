// import React from "react";
// import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
    function generateUniqueUserId() {
      return `u_${uuidv4()}`;
    }
    const uniqueUserId = generateUniqueUserId();
    // axios.defaults.withCredentials = true;
    console.log(state);

    for (const key in state) {
      setState({
        ...state,
        user_id: uniqueUserId,
        [key]: "",
      });
    }
    // axios
    //   .post("http://127.0.0.1:3001/users/register", state)
    //   .then((res) => {
    //     if (res.data.Status === "Success") {
    //       navigate("/SignIn2");
    //     } else {
    //       alert("error!");
    //     }
    //   })
    //   .then((err) => console.log(err));
    // fetch("http://127.0.0.1:3001/users/register", {
    //   method: "POST",
    //   body: JSON.stringify(state),
    //   headers: { "Content-Type": "application/json" },
    // })
    //   .then((response) => response.json())
    //   .then(() => {
    //     navigate("/SignIn2");
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //   });
  };
  useEffect(() => {
    // Assuming `state` contains the registration data
    fetch("http://127.0.0.1:3001/users/register", {
      method: "POST",
      body: JSON.stringify(state),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.success) {
          navigate("/success");
        } else {
          res.message || "Registration failed, please check your details.";
        }
      });
  }, [state]);

  // function SignUpForm() {
  //   const [state, setState] = useState({
  //     user_id: "",
  //     user_name: "",
  //     full_name: "",
  //     email: "",
  //     password: "",
  //     phone_number: "",
  //     role: "user",
  //   });

  //   const [error, setError] = useState(null);
  //   const navigate = useNavigate();

  //   useEffect(() => {
  //     const registerUser = async () => {
  //       try {
  //         const response = await fetch("127.0.0.1:3001/users/register", {
  //           method: "POST",
  //           headers: { "Content-Type": "application/json" },
  //           body: JSON.stringify(state),
  //         });

  //         if (!response.ok) {
  //           throw new Error("Failed to register user");
  //         }

  //         navigate("/login");
  //       } catch (error) {
  //         setError(error.message);
  //       }
  //     };

  //     registerUser();
  //   }, [state, navigate]);

  //   const handleChange = (e) => {
  //     setState({
  //       ...state,
  //       user_id: `u_${uuidv4()}`,
  //       [e.target.name]: e.target.value,
  //     });
  //     console.log(state);
  //   };

  //   const handleOnSubmit = (e) => {
  //     e.preventDefault();
  //   };
  return (
    <div className="form-container sign-up-container">
      <form onSubmit={handleOnSubmit}>
        <h1 className="form-title">Create Account</h1>

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

        <div className="input-box3">
          <input
            type="text"
            name="full_name"
            value={state.full_name}
            onChange={handleChange}
            placeholder="Full Name"
          />
          <input
            type="text"
            name="user_name"
            value={state.user_name}
            onChange={handleChange}
            placeholder="User Name"
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

          <input
            type="tel"
            name="phone_number"
            value={state.phone_number}
            onChange={handleChange}
            placeholder="Phone Number"
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
            <option value="chef" className="option">
              Chef
            </option>
          </select>
        </div>
        <button className="main-button">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUpForm;
