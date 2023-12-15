import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import useLogOut from "./Middleware/useLogout";
import Modal from "react-bootstrap/Modal";
import Cart from "./Cart";
import axios from "axios";

const Navbar_ = ({ productsData }) => {
  const logOut = useLogOut();
  const [userId, setUserId] = useState("");
  const [lgShow, setLgShow] = useState(false);
  const [actCart, addToCart] = Cart();
  const [cartArray, setCartArray] = useState(null);
  const [total, setTotal] = useState(0);
  const [checkedOut, setCheckedOut] = useState(false);
  const [mCart, setMCart] = useState({});

  const getCartArray = async () => {
    // console.log("start");
    // console.log("productsData before filter:", productsData);
    // console.log("actCart before filter:", Object.keys(JSON.parse(actCart)));
    console.log("getting cart");
    try {
      const response_cart = await axios.get(
        `http://localhost:5001/api/getCart/${userId}`
      );
      setMCart(JSON.parse(response_cart.data));
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
    if (mCart["-1"]) {
      setCartArray([]);
      setTotal(0);
      return 0;
    }
    const id_arr = Object.keys(mCart);

    const arr = productsData.filter((item) => {
      return id_arr.includes(String(item.product_id));
    });
    // .map((item, key)=>{
    //   (<div className='container'>
    //     <div className='row'>
    //       <div className='col'>
    //         <h3>{item.name}</h3>
    //         <div>{item.price}</div>
    //         <div>{item.location}</div>
    //       </div>
    //       <div className='col'>
    //         <img src={item.image}/>
    //       </div>
    //     </div>
    //   </div>)
    // });
    const newTotal = arr.reduce((acc, item) => acc + item.price, 0);
    setTotal(newTotal);
    setCartArray(arr);
    // sessionStorage.setItem("cart", JSON.stringify(arr));s
    console.log("Filtered products:", arr);
  };

  const handleCheckout = async () => {
    setCheckedOut(true);
    setTotal(0);
    setCartArray([]); // Or whatever logic you need to clear the cart
    const res = await addToCart(-1, 0);
    console.log(res);
    // Clear the cart in your Cart logic as well, if needed
  };

  useEffect(() => {
    const u = sessionStorage.getItem("uid");
    setUserId(u);
  }, []);

  useEffect(() => {
    if (actCart !== undefined && actCart !== null) getCartArray();
  }, [actCart]);
  return (
    <Navbar sticky="top" className="container-fluid text-bg-primary">
      <Container>
        <Navbar.Brand href="#home">QuickRent</Navbar.Brand>
        <Navbar.Toggle />
        {userId && (
          <Navbar.Collapse className="justify-content-end d-flex gap-3">
            <Form inline>
              <Row>
                <Col xs="auto">
                  {/* <Form.Control
                  type="text"
                  placeholder="Search"
                  className=" mr-sm-2"
                  onSubmit={searchFunc}
                /> */}
                  {/* <SearchComponent onSearch={handleSearch} /> */}
                  <Button
                    onClick={() => {
                      window.location.href = "/search";
                    }}
                  >
                    Search
                  </Button>
                </Col>
                {/* <Col xs="auto">
                <Button type="submit">Submit</Button>
              </Col> */}
              </Row>
            </Form>
            <Button
              onClick={() => {
                setLgShow(true);
                // if (actCart !== undefined && actCart !== null)
                getCartArray();
              }}
            >
              Cart
            </Button>
            <Button
              onClick={() => {
                logOut();
              }}
            >
              Logout
            </Button>
            <Navbar.Text>Welcome!</Navbar.Text>
          </Navbar.Collapse>
        )}
      </Container>

      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">My Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {cartArray &&
            cartArray.map((item, key) => {
              return (
                <div className="container" key={key}>
                  <div className="row">
                    <div className="col">
                      <h3>Name: {item.name}</h3>
                      <div>Price: ${item.price}</div>
                      <div>Location: {item.location}</div>
                    </div>
                    <div className="col">
                      <img src={item.image} className="img-fluid" />
                    </div>
                  </div>
                </div>
              );
            })}
        </Modal.Body>
        Cart Total: ${total}
        <Button
          variant="primary btn-sm"
          onClick={() => {
            handleCheckout();
            alert("Your rentals have been processed");
          }}
        >
          Checkout
        </Button>
      </Modal>
    </Navbar>
  );
};

export default Navbar_;
