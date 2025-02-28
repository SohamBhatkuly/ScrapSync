import { useState, useEffect, createContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Signup from './Authentication/Signup';
import Signin from './Authentication/Signin';
import BuyerRoutes from './Buyer/BuyerRoutes';
import DealerRoutes from './Dealer/DealerRoutes';
import BuyerHeader from './Buyer/BuyerHeader';
import DealerHeader from './Dealer/DealerHeader';
import { db } from './firebase'; 
import { doc, getDoc } from "firebase/firestore";

export const Authcontext = createContext(null);


function App() {
  const [user, setUser] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        console.log("User ID:", firebaseUser.uid);
        if (firebaseUser.uid) {
          const userDocRef = doc(db, "Profile", firebaseUser.uid);
          const userDocSnap = await getDoc(userDocRef);
          
          if (userDocSnap.exists()) {
            setUser(userDocSnap.data());
          } else {
            console.warn("User document does not exist.");
          }
        } else {
          console.error("Firebase user UID is undefined");
        }
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // useEffect(() => {
  //   requestForToken().then((token) => {
  //     if (token) {
  //       setUserToken(token);
  //     }
  //   });
  // }, []);


  return (
    <Authcontext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        {user?.accType === "buyer" && <BuyerHeader />}
        {user?.accType === "dealer" && <DealerHeader />}
     
        <Routes>
          <Route path="/signin" element={user ? <Navigate to="/" replace /> : <Signin />} />
          <Route path="/signup" element={user ? <Navigate to="/" replace /> : <Signup />} />
          
          {user ? (
            user.accType === "buyer" ? (
              <Route path="/*" element={<BuyerRoutes />} />
            ) : (
              <Route path="/*" element={<DealerRoutes />} />
            )
          ) : (
            <Route path="/*" element={<Navigate to="/signin" replace />} />
          )}
        </Routes>
      </BrowserRouter>
    </Authcontext.Provider>
  );
}

export default App;
