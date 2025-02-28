import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { Authcontext } from '../App';

export default function DealerHeader() {
  const { setUser } = useContext(Authcontext);
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        navigate("/signin");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  return (
      <nav>
            <button 
  onClick={handleLogout} 
  style={{ marginLeft: "10px", padding: "5px 10px", background: "red", color: "white", border: "none", cursor: "pointer" }}
>
  Logout
</button>
      <h2>Dealer Dashboard</h2>
      <Link to="/DealerHome">Home</Link>


    </nav>
  );
}
