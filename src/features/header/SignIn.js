import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "../../firestore";

const SignIn = () => {
  const [user, setUser] = useState(null);

  // check if user is signed in
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
    }
  }, []);

  const handleSignIn = () => {
    const enteredEmail = prompt("Enter email: ");
    const enteredPassword = prompt("Enter password: ");
    
    signInWithEmailAndPassword(auth, enteredEmail, enteredPassword)
      .then((userCredential) => {
        setUser(userCredential.user);
        localStorage.setItem("user", JSON.stringify(userCredential.user));
      })
      .catch((error) => {
        console.error(error.message);
      });
  };  

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        setUser(null);
        localStorage.removeItem("user");
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  return (
    <div>
      {user ? (
        <div className="header-field" onClick={handleSignOut}>
          Log Out
        </div>
      ) : (
        <div className="header-field" onClick={handleSignIn}>
          Log In
        </div>
      )}
    </div>
  );
};

export default SignIn;