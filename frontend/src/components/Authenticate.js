import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import auth from "./config/firebase_auth";
import useAuthenticator from './Middleware/useAuthenticator';
import useVerifyer from './Middleware/useVerifyer';
import useLogout from './Middleware/useLogout';
import { Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

const Authenticate = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState('buyer'); // New state for user type

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
      <Container className=''>
        <Row>
          <Col></Col>
          <Col xs={6} sm={4} lg={4} className='text-center d-flex flex-column mt-5 gap-4'>
            <h1 className='display-3'>{isLogin ? <div>Login</div> : <div>SignUp</div>}</h1>
            {/* <Button variant="primary">Primary</Button> */}
            <form onSubmit={handleSubmit} className='d-flex flex-column gap-3'>
              <div>
                <label className='d-flex flex-column align-items-start form-label'>
                  Email:
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className='w-100 form-control'
                  />
                </label>

                <label className='d-flex flex-column align-items-start form-label'>
                  Password:
                  <input
                    className='w-100 form-control'
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </label>
              </div>
              <div className='d-flex flex-column gap-3'>

                <div className='d-flex justify-content-center gap-3'>
                  <label>
                    <input
                      className='form-check-input'
                      type="radio"
                      value="buyer"
                      checked={userType === 'buyer'}
                      onChange={() => setUserType('buyer')}
                    />
                    Buyer
                  </label>
                  <label>
                    <input
                      className='form-check-input'
                      type="radio"
                      value="seller"
                      checked={userType === 'seller'}
                      onChange={() => setUserType('seller')}
                    />
                    Seller
                  </label>
                </div>
                <button className='btn btn-primary' type="submit">
                  {isLogin ? 'Login' : 'Sign Up'}
                </button>
              </div>
            </form>
            <p className='d-flex align-items-center justify-content-center gap-3'>
              <span>{isLogin ? "Don't have an account?" : 'Already have an account?'}</span>
              <button className='btn btn-outline-primary' onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? 'Sign Up' : 'Login'}
              </button>

            </p>
          </Col>
          <Col></Col>
        </Row>
      </Container >
      {/* <button onClick={() => { logOut() }}>
        Logout
      </button> */}
    </div >
  );
}

export default Authenticate;