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

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "Users", user.uid), {
        Name: name,
        Email: email,
        createdAt: new Date(),
      });

      navigate("/home");
    } catch (error) {
      console.error("Error:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const styles = {
    container: {
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(135deg, #e0f7fa, #ffffff)",
      padding: "20px",
    },
    form: {
      backgroundColor: "#ffffff",
      padding: "40px",
      width: "100%",
      maxWidth: "420px",
      borderRadius: "16px",
      boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
      textAlign: "center",
    },
    title: {
      fontSize: "28px",
      fontWeight: "bold",
      marginBottom: "8px",
      color: "#333",
    },
    subtitle: {
      fontSize: "16px",
      color: "#777",
      marginBottom: "24px",
    },
    inputGroup: {
      textAlign: "left",
      marginBottom: "20px",
    },
    label: {
      fontSize: "14px",
      marginBottom: "6px",
      display: "block",
      color: "#333",
    },
    input: {
      width: "100%",
      padding: "10px 14px",
      border: "1px solid #ccc",
      borderRadius: "8px",
      fontSize: "14px",
      transition: "border 0.3s ease",
    },
    button: {
      width: "100%",
      padding: "12px",
      backgroundColor: "#00bcd4",
      color: "white",
      border: "none",
      borderRadius: "8px",
      fontSize: "16px",
      cursor: "pointer",
      marginTop: "10px",
      transition: "background 0.3s ease",
    },
    linkText: {
      marginTop: "20px",
      fontSize: "14px",
      color: "#555",
    },
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={createUser}>
        <h1 style={styles.title}>Create Account</h1>
        <p style={styles.subtitle}>Let's get you started</p>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Full Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Email</label>
          <input
            type="email"
            placeholder="Enter your email id"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
            style={styles.input}
          />
        </div>

        <button type="submit" disabled={isLoading} style={styles.button}>
          {isLoading ? "Creating..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}
