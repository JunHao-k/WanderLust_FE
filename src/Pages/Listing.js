import React from "react";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import '../css/listing.css'

export default class Listing extends React.Component {
    render() {
        return (
            <div >
                <Row xs={1} md={2} lg={3} className="g-4 container-fluid" >
                    {Array.from({ length: 3 }).map((_, idx) => (
                        <Col className = "card-holder">
                            <Card style={{ width: '18rem'}}>
                                <Card.Img variant="top" src="holder.js/100px180" />
                                <Card.Body>
                                    <Card.Title>Card Title</Card.Title>
                                    <Card.Text>
                                        Some quick example text to build on the card title and make up the
                                        bulk of the card's content.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
            
        )
    }
}