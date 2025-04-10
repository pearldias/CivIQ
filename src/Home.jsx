import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

export default function Home() {
    return (
        <>
            <h1>Home</h1>
            {/* Add a link to navigate to the Detection page */}
            <Link to="/detection">
                <button>Go to Detection</button>
            </Link>
        </>
    );
}
