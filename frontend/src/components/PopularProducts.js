import React from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { ListGroup } from "react-bootstrap";

const PopularProducts = ({ popularProducts }) => {
  return (
    <Container>
      {popularProducts && <Row xs={1} md={3} lg={4} className="g-4">
        {
          popularProducts.map((product, key) => (
            <Col key={key}>
              <Card className='shadow-lg mb-2 bg-body-tertiary rounded'>
                <Card.Img variant="top" src={product.image} />
                <Card.Body className='d-flex flex-column gap-3'>
                  <Card.Title className='fw-bold display-6'>{product.name}</Card.Title>
                  {product.description &&
                    <Card.Text>
                      {product.description}
                    </Card.Text>
                  }
                  <ListGroup variant="list-group-flush">
                    <ListGroup.Item>Pickup Location: {product.location}</ListGroup.Item>
                    <ListGroup.Item className='d-flex gap-1 fs-6 text-body-secondary'>
                      {product.tags && product.tags.map((item, key) => {
                        return <span key={key} className='fs-6'>#{item}</span>
                      })}
                    </ListGroup.Item>
                  </ListGroup>
                  <Button variant="primary btn-sm">Add to Cart</Button>
                </Card.Body>
              </Card>

            </Col>
          ))}
      </Row>
      }
    </Container>
  )
}

export default PopularProducts