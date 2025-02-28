import React, { useState } from 'react';
import { app } from '../firebase';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, setDoc, doc } from "firebase/firestore";

export default function Signup() {  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [type, setType] = useState('');

    const auth = getAuth(app);
    const db = getFirestore(app);

    function handleSignup(e) {
        e.preventDefault();
        signupUser();  
    }

    const updateDb = async (user) => {
        try {
            const docRef = await setDoc(doc(db, "Profile", user.uid), {
                email: email,
                accType: type, 
            });
            console.log("Document written with ID: ");
        } catch (e) {
            console.error("Error adding document: ");
        }
    };

    const signupUser = async () => {  
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log("User created:", userCredential.user);
            await updateDb(userCredential.user); 
        } catch (error) {
            console.error("Error:", error.message);
        }
    };

    return (
        <div>
            <form onSubmit={handleSignup}>
                <input 
                    type="email" 
                    placeholder="Email"
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
                <input 
                    type="password" 
                    placeholder="Password"
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
                
                <select 
                    id="userType" 
                    value={type} 
                    name="userType" 
                    onChange={(e) => setType(e.target.value)} 
                    required
                >
                    <option value="" disabled>Select one</option>
                    <option value="buyer">Buyer</option>
                    <option value="dealer">Dealer</option>
                </select>

                <button type='submit'>Submit</button>
            </form>
        </div>
    );
}
