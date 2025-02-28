import React, { useState } from 'react';
import { app } from '../firebase';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { collection, doc, getDoc, getFirestore } from "firebase/firestore"; 
import { db } from '../firebase';
import { Authcontext } from '../App';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
export default function Signin() {
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const auth = getAuth(app);
    const { user, setUser } = useContext(Authcontext);
  const navigate = useNavigate(); 
 const getUserProfile = async (userId) => {
    try {
        const userDocRef = doc(db, "Profile", userId);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            setUser(userData);
            
            setTimeout(() => {
                navigate('/', { replace: true });
            }, 0);
        } else {
            console.log("No such document!");
        }
    } catch (error) {
        console.error("Error fetching user profile:", error);
    }
};


    const signinUser = async () => {  
        signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            const user = userCredential.user;
            console.log(user);
            await getUserProfile(user.uid);
        })
        .catch((error) => {
            console.error("Error:", error.message);
        });
    };

    function handleSignin(e) {
        e.preventDefault();
        signinUser();
    }

    return (
        <div>
            <form onSubmit={handleSignin}>
                <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setemail(e.target.value)}
                    required
                />
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setpassword(e.target.value)}
                    required
                />
                <button type="submit">Submit</button>
                      <Link to="/Signup">Sign up</Link>
            </form>
        </div>
    );
}
