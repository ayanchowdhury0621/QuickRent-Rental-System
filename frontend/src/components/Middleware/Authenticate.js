import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import auth from "../config/firebase_auth";
import useAuthenticator from './useAuthenticator';
const Authenticate = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [userData, setUserData] = useState(null);

  const { user } = useAuthenticator();


  const logOut = () => {
    signOut(auth);
  }

  const signUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      if (userCredential) {
        // const user = userCredential.user;        
      }
    }
    catch (error) {
      console.log("Signup Error");
      console.log(error);
    }
  }

  const signIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      if (userCredential) {
        // const user = userCredential.user;                
      }
    }
    catch (error) {
      console.log("Signin Error");
      console.log(error);
    }
  }


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
      // Handle login logic here (can be a call to your backend)      
      signIn();

    } else {
      // Handle signup logic here (can be a call to your backend)      
      signUp();
    }

    // Reset form fields after submission
    setEmail('');
    setPassword('');
  };

  useEffect(() => {
    console.log(user);
  }, [user])


  return (
    <div>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
      </form>
      <p>
        {isLogin ? "Don't have an account?" : 'Already have an account?'}
        <button onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Sign Up' : 'Login'}
        </button>

        <button onClick={() => { logOut() }}>
          Logout
        </button>
      </p>
    </div>
  );
}

export default Authenticate;