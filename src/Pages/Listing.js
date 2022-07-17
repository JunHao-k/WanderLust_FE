import React from "react";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import '../css/Listing.css'
import axios from 'axios';

export default class Listing extends React.Component {

    url = "https://8888-junhaok-wanderlustbe-ultao66f8gr.ws-us54.gitpod.io/listings"

    state = {
        data: [],
        query: this.props.query,
        place: this.props.place,        
    }
    async componentDidMount (){
    
        let response = await axios.get(this.url + `?${this.state.query}=${this.state.place}`)
        this.setState({
            data: response.data
        })
    }

    // Limit pict size
    // Text also limit height
    render() {
        return (
            <div >
                <Row xs={1} md={2} lg={3} className="g-4 container-fluid" >
                    {Array.from({ length: this.state.data.length }).map((_, idx) => (
                        <React.Fragment key={this.state.data[idx]._id}>
                            <Col className = "card-holder">
                                <Card style={{ width: '18rem'}}>
                                    <Card.Img variant="top" src={this.state.data[idx].images} />
                                    <Card.Body>
                                        <Card.Title>{this.state.data[idx].name}</Card.Title>
                                        <Card.Title>{this.state.data[idx].type}</Card.Title>
                                        <ul>
                                            <li>{this.state.data[idx].description[0]}</li>
                                            <li>{this.state.data[idx].description[1]}</li>
                                            <li>{this.state.data[idx].description[2]}</li>
                                        </ul>
                                        <Card.Text>
                                            Some quick example text to build on the card title and make up the
                                            bulk of the card's content.
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </React.Fragment>
                    ))}
                </Row>
            </div>
            
        )
    }
}