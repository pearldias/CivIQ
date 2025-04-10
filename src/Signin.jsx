// import React, { useState } from "react";
// import { getAuth, signInWithEmailAndPassword, setPersistence, browserLocalPersistence } from "firebase/auth";
// import { app } from "./firebase";
// import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";

// const auth = getAuth(app);

// export default function Signin() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const signinUser = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);

//     try {
//       await setPersistence(auth, browserLocalPersistence);
//       await signInWithEmailAndPassword(auth, email, password);
//       navigate("/home"); // Navigate to Home (root)
//     } catch (err) {
//       console.log("Error:", err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="signin-page">
//       <form className="signin-content" onSubmit={signinUser}>
//         <h1>Sign In</h1>
//         <div className="signin-email">
//           <input
//             type="email"
//             autoComplete="off"
//             placeholder="Enter your email id"
//             onChange={(e) => setEmail(e.target.value)}
//             value={email}
//             required
//           />
//         </div>
//         <div className="signin-password">
//           <input
//             type="password"
//             autoComplete="off"
//             placeholder="Enter your password"
//             onChange={(e) => setPassword(e.target.value)}
//             value={password}
//             required
//           />
//         </div>
//         <button type="submit" disabled={isLoading}>
//           {isLoading ? "Loading..." : "Sign In"}
//         </button>
//         <p>
//           Don't have an account? <Link to="/Signup">Sign Up</Link>
//         </p>
//       </form>
//     </div>
//   );
// }
import React, { useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { app } from "./firebase";
import { useNavigate, Link } from "react-router-dom";

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
      navigate("/home");
    } catch (err) {
      console.log("Error:", err.message);
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
      background: "linear-gradient(135deg, #ece9e6, #ffffff)",
      padding: "20px",
    },
    form: {
      backgroundColor: "#ffffff",
      padding: "40px",
      width: "100%",
      maxWidth: "400px",
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
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      borderRadius: "8px",
      fontSize: "16px",
      cursor: "pointer",
      marginTop: "10px",
      transition: "background 0.3s ease",
    },
    buttonHover: {
      backgroundColor: "#0056b3",
    },
    linkText: {
      marginTop: "20px",
      fontSize: "14px",
      color: "#555",
    },
    link: {
      color: "#007bff",
      textDecoration: "none",
    },
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={signinUser}>
        <h1 style={styles.title}>Welcome Back</h1>
        <p style={styles.subtitle}>Login to continue</p>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
        </div>

        <button type="submit" style={styles.button} disabled={isLoading}>
          {isLoading ? "Signing in..." : "Sign In"}
        </button>

        <p style={styles.linkText}>
          Don't have an account? <Link to="/signup" style={styles.link}>Sign Up</Link>
        </p>
      </form>
    </div>
  );
}
