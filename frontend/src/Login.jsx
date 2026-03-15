import { useState } from "react";
import axios from "axios";

function Login({ setLoggedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");

    try {
      const response = await axios.post("http://127.0.0.1:8000/login", {
        username,
        password,
      });

      if (response.data.status === "success") {
        setLoggedIn(true);
      } else {
        setError("Invalid username or password");
      }
    } catch (err) {
      console.error(err);
      setError("Server connection failed");
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Welcome back</h2>
        <p className="card-subtitle">
          Sign in to start analyzing your hair health.
        </p>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="username">
          Username
        </label>
        <input
          id="username"
          type="text"
          className="input-control"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          type="password"
          className="input-control"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button className="primary-button" onClick={handleLogin}>
        Login
      </button>

      {error && <p className="error-text">{error}</p>}
    </div>
  );
}

export default Login;