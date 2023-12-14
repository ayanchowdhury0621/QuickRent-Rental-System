import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import auth from "./config/firebase_auth";
import useAuthenticator from './Middleware/useAuthenticator';
import useVerifyer from './Middleware/useVerifyer';
import useLogout from './Middleware/useLogout';

const Authenticate = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const { user } = useAuthenticator();
  // Recieves function to verify token manually;
  const verifyFunc = useVerifyer();
  // Recieves function to logout;
  const logOut = useLogout();



  const signUp = async () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        alert("Account Created. Signup now!");

      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          alert('Email Already in Use');
        }
        else {
          alert("Internal Server Error");
        }
      })
  }


  const signIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(async (user) => {
        try {
          const checkToken = await verifyFunc();
          if (checkToken.data.message === "success") { }
          else alert(checkToken.response.data.message);
        }
        catch (error) {
          console.log("Token verification error:", error);
        }
      })
      .catch((error) => {

        if (error.code === 'auth/user-not-found') {
          alert('Please check the Email');
        }
        else {
          alert("Invalid Credentials!")
        }
      })
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
    // console.log(user);
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