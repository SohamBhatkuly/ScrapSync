import React from 'react';
import { Link } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';

export default function BuyerHeader() {
  const auth = getAuth();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("User signed out successfully");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  return (
    <nav style={{ display: "flex", justifyContent: "space-between", padding: "10px", background: "#222", color: "white" }}>
      <h2>Buyer Dashboard</h2>
      <div>
        <Link to="/BuyerHome" style={{ color: "white", marginRight: "10px" }}>Home</Link>
         <Link to="/BuyerDetail" style={{ color: "white", marginRight: "10px" }}>detail</Link>
        <button 
          onClick={handleLogout} 
          style={{ padding: "5px 10px", background: "red", color: "white", border: "none", cursor: "pointer" }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
