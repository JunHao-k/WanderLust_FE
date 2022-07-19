import React from "react";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import '../css/Listing.css'
import axios from 'axios';

export default class Listing extends React.Component {

    url = "https://8888-junhaok-wanderlustbe-psu2ribgc6l.ws-us54.gitpod.io/listings"

    state = {
        data: [],
        query: this.props.query,
        place: this.props.place,
        haveData: false
    }
    async componentDidMount() {

        let response = await axios.get(this.url + `?${this.state.query}=${this.state.place}`)
        // console.log(response.data)
        this.setState({
            data: response.data,
            haveData: true
        })
        
    }

    renderContent = () => {
        if (this.state.data.length !== 0) {
            return (
                <div >
                    <Row xs={1} md={2} lg={3} className="g-4 container-fluid" >
                        {Array.from({ length: this.state.data.length }).map((_, idx) => (
                            <React.Fragment key={this.state.data[idx]._id}>
                                <Col className="card-holder">
                                    <Card style={{ width: '18rem' }}>
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
        else{
            // console.log(this.state.data)
            return(
                <div>
                    <h1>No results found</h1>
                </div>
            )
            
            // <Modal className="delete-modal" show={this.state.show} onHide={this.handleClose} backdrop="static" keyboard={false}>
            //     <Modal.Header closeButton>
            //         <Modal.Title>Delete {this.state.deleteName}?</Modal.Title>
            //     </Modal.Header>
            //     <Modal.Body >
            //         Are you sure you want to delete this listing about {this.state.deleteName} located in
            //         {this.state.deleteCity} , {this.state.deleteCountry}
            //     </Modal.Body>
            //     <Modal.Footer>
            //         <Button variant="warning" onClick={() => {
            //             this.deleteListing();
            //             this.props.setActive('home')
            //         }}>Yes</Button>
            //         <Button variant="warning" onClick={this.handleClose}>
            //             No
            //         </Button>
            //     </Modal.Footer>
            // </Modal>
        }
    }

    // Limit pict size
    // Text also limit height
    render() {
        return (
            <React.Fragment>{this.state.haveData ? this.renderContent() : ""}</React.Fragment>  
        )

    }
}