import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Row, Col } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import SearchComponent from './SearchComponent';


const Navbar_ = ({ handleSearch }) => {
  const [userId, setUserId] = useState('');

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
          (<Navbar.Collapse className="justify-content-end d-flex gap-5">
            <Form inline>
              <Row>
                <Col xs="auto">
                  {/* <Form.Control
                  type="text"
                  placeholder="Search"
                  className=" mr-sm-2"
                  onSubmit={searchFunc}
                /> */}
                  <SearchComponent onSearch={handleSearch} />
                </Col>
                {/* <Col xs="auto">
                <Button type="submit">Submit</Button>
              </Col> */}
              </Row>
            </Form>
            <Navbar.Text>
              Welcome <a href="#login">Mark Otto !</a>
            </Navbar.Text>
          </Navbar.Collapse>)
        }
      </Container>
    </Navbar>
  )
}

export default Navbar_