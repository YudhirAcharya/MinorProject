// src/LoginPage.js
import React, { useState } from "react";

const LoginUser = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    // Add your authentication logic here (e.g., check against a server)
    // For simplicity, let's just check if the username and password are not empty
    if (username.trim() !== "" && password.trim() !== "") {
      setLoggedIn(true);
    } else {
      alert("Please enter a valid username and password.");
    }
  };

  return (
    <div>
      {loggedIn ? (
        <div>
          <h2>Welcome, {username}!</h2>
          <p>You are now logged in.</p>
        </div>
      ) : (
        <div>
          <h2>Login</h2>
          <form>
            <label>
              Username:
              <input
                type="text"
                value={username}
                onChange={(e) =>
                  setUsername(e.target.value)
                }
              />
            </label>
            <br />
            <label>
              Password:
              <input
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />
            </label>
            <br />
            <button type="button" onClick={handleLogin}>
              Login
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default LoginUser;
