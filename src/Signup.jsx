import React, { useState } from "react";
import { app } from "./firebase";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { db } from "./firebase";
import { useNavigate } from "react-router-dom";
import { setDoc, doc } from "firebase/firestore";
import './Signup.css'
const auth = getAuth(app);

export default function Signup() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const createUser = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);

      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store user info in Firestore with UID as doc ID
      await setDoc(doc(db, "Users", user.uid), {
        Name: name,
        Email: email,
        createdAt: new Date(),
      });

      navigate("/Home");
    } catch (error) {
      console.error("Error:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={createUser}>
        <h1 className="signup-title">Sign Up</h1>

        <div>
          <input
            type="text"
            autoComplete="off"
            placeholder="Enter your name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
            className="signup-input"
          />
        </div>

        <div>
          <input
            type="email"
            autoComplete="off"
            placeholder="Enter your email id"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            className="signup-input"
          />
        </div>

        <div>
          <input
            type="password"
            autoComplete="off"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
            className="signup-input"
          />
        </div>

        <button type="submit" disabled={isLoading} className="signup-button">
          {isLoading ? "Loading..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}
