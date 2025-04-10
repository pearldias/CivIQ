
// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Home.css"; // Add this import

// const Home = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const script1 = document.createElement("script");
//     script1.src = "https://cdn.botpress.cloud/webchat/v2.3/inject.js";
//     script1.async = true;

//     script1.onload = () => {
//       const script2 = document.createElement("script");
//       script2.src =
//         "https://files.bpcontent.cloud/2025/04/10/12/20250410123106-I318OB4E.js";
//       script2.async = true;
//       document.body.appendChild(script2);
//       script2.dataset.cleanup = "true";
//     };

//     document.body.appendChild(script1);

//     return () => {
//       const scripts = document.querySelectorAll("script");
//       scripts.forEach((s) => {
//         if (
//           s.src.includes("botpress.cloud") ||
//           s.dataset.cleanup === "true"
//         ) {
//           s.remove();
//         }
//       });
//     };
//   }, []);

//   return (
//     <div className="home-container">
//       <h1 className="home-title">Welcome to Home</h1>
//       <p className="home-description">This page has the chatbot enabled.</p>

//       <h2 className="complaint-title">Submit a Complaint</h2>
//       <button
//         type="button"
//         onClick={() => navigate("/detection")}
//         className="submit-button"
//       >
//         Make Complaint
//       </button>
//     </div>
//   );
// };

// export default Home;
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css"; // Add this import

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const script1 = document.createElement("script");
    script1.src = "https://cdn.botpress.cloud/webchat/v2.3/inject.js";
    script1.async = true;

    script1.onload = () => {
      const script2 = document.createElement("script");
      script2.src =
        "https://files.bpcontent.cloud/2025/04/10/12/20250410123106-I318OB4E.js";
      script2.async = true;
      document.body.appendChild(script2);
      script2.dataset.cleanup = "true";
    };

    document.body.appendChild(script1);

    return () => {
      const scripts = document.querySelectorAll("script");
      scripts.forEach((s) => {
        if (
          s.src.includes("botpress.cloud") ||
          s.dataset.cleanup === "true"
        ) {
          s.remove();
        }
      });
    };
  }, []);

  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to Our Civic Reporting System</h1>
      <p className="home-description">
        Our platform helps you report and resolve civic issues easily.
      </p>

      <div className="complaint-section">
        <h2 className="complaint-title">Submit a Complaint</h2>
        <button
          type="button"
          onClick={() => navigate("/detection")}
          className="submit-button"
        >
          Make a Complaint
        </button>
      </div>
    </div>
  );
};

export default Home;
