import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword, setPersistence, browserLocalPersistence } from "firebase/auth";
import { app } from "./firebase";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const auth = getAuth(app);

export default function Signin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const signinUser = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await setPersistence(auth, browserLocalPersistence);
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/Home");
    } catch (err) {
      console.log("Error:", err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signin-page">
      <form className="signin-content" onSubmit={signinUser}>
        <h1>Sign In</h1>
        <div className="signin-email">
          <input
            type="email"
            autoComplete="off"
            placeholder="Enter your email id"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>
        <div className="signin-password">
          <input
            type="password"
            autoComplete="off"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Sign In"}
        </button>
        <p>
          Don't have an account? <Link to="/Signup">Sign Up</Link>
        </p>
      </form>
    </div>
  );
}
