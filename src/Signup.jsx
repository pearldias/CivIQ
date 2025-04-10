import React, { useState } from "react";
import { app } from "./firebase";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { db } from "./firebase";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";

const auth = getAuth(app);

export default function Signup() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  
  const profileCollection = collection(db, "Profile");

  const createUser = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await addDoc(profileCollection, {
        Name: name,
        Email: email,
        Password: password, 
        Points: 0,
      });

      navigate("/Profile");
    } catch (error) {
      console.error("Error:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <form className="signup-content" onSubmit={createUser}>
        <h1>Sign Up</h1>

        <div className="signup-name">
          <input
            type="text"
            autoComplete="off"
            placeholder="Enter your name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
        </div>

        <div className="signup-email">
          <input
            type="email"
            autoComplete="off"
            placeholder="Enter your email id"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>

        <div className="signup-password">
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
          {isLoading ? "Loading..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}
