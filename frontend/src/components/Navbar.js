import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Row, Col } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import useLogOut from './Middleware/useLogout';
import Modal from 'react-bootstrap/Modal';

const Navbar_ = () => {
  const logOut = useLogOut();
  const [userId, setUserId] = useState('');
  const [lgShow, setLgShow] = useState(false);

  useEffect(() => {
    const u = sessionStorage.getItem('uid');
    setUserId(u);
  }, [])
  return (
    <Navbar sticky="top" className="container-fluid text-bg-primary" >
      <Container>
        <Navbar.Brand href="#home">QuickRent</Navbar.Brand>
        <Navbar.Toggle />
        {userId &&
          (<Navbar.Collapse className="justify-content-end d-flex gap-3">
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
                  <Button onClick={() => { window.location.href = "/search" }}>Search</Button>
                </Col>
                {/* <Col xs="auto">
                <Button type="submit">Submit</Button>
              </Col> */}
              </Row>
            </Form>
            <Button onClick={() => setLgShow(true)}>Cart</Button>
            <Button onClick={() => { logOut() }}>Logout</Button>
            <Navbar.Text>
              Welcome!
            </Navbar.Text>
          </Navbar.Collapse>)
        }
      </Container>

      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            My Cart
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>...</Modal.Body>
      </Modal>
    </Navbar>
  )
}

export default Navbar_