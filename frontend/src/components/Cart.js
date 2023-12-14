import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useAuthenticator from './Middleware/useAuthenticator';

const Cart = () => {
  // See if the user is signed in (Get uid)
  // Set uid to userId
  // Fetch cart
  // Update cart based on uid
  const { user } = useAuthenticator();
  const [cartItems, setCartItems] = useState([]);
  const [myCart, setMyCart] = useState({});
  const [userId, setUserId] = useState(user || '');
  const [actCart, setActCart] = useState();

  const fetchCartItems = async () => {
    if (userId !== null && userId !== undefined && userId !== '') {
      // try {
      //   const response = await axios.get(`http://localhost:5001/api/tempCart/${userId}`);
      //   setCartItems(response.data);
      // } catch (error) {
      //   console.log(error);
      // }

      try {
        const response_cart = await axios.get(`http://localhost:5001/api/getCart/${userId}`);
        setActCart(response_cart.data);

      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    }
  };

  const addToCart = async (prodID, quantity) => {

    // check if cart is empty
    const currentCart = { ...myCart };
    if (currentCart.length === 0 || currentCart[prodID] === undefined) {
      // If the cart is empty or the product is not present, add the product
      currentCart[prodID] = 1;
    } else {
      // If the product is already in the cart, increment the quantity
      currentCart[prodID]++;
    }
    // set new obj to myCart
    setMyCart({ ...currentCart });
    console.log(myCart);

    // Push to server 
    try {
      const res = await axios.post(`http://localhost:5001/api/updateCart/${userId}`, currentCart);
      console.log(res.data);
    }
    catch (error) {
      console.log("Front-internal", error)
    }
  }


  useEffect(() => {
    console.log(sessionStorage.getItem('uid') || user?.uid);
    const uid = sessionStorage.getItem('uid');
    uid && setUserId(uid);
    fetchCartItems();
  }, [user, myCart]);

  // return (
  //   <div>
  //     {/* <h1>Shopping's Cart</h1>
  //     <ul>
  //       {
  //         cartItems && cartItems.map((item, key) => {
  //           const prod = item.prod;
  //           return (
  //             <li key={key}>
  //               <>{prod?.name}</>
  //               <button onClick={() => addToCart(item.prodID, prod.quantity)}>Add</button>
  //             </li>
  //           )
  //         })
  //       }
  //     </ul>
  //     <h3>
  //       {actCart && JSON.stringify(actCart, null, 2)}
  //     </h3> */}
  //   </div>
  // );
  return { actCart, addToCart };
};

export default Cart;
