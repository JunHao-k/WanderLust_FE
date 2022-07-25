import React from "react";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
import '../css/Listing.css'
import axios from 'axios';
import { RiStarSFill } from "react-icons/ri";
import Spinner from "../Components/Spinner";



export default class Listing extends React.Component {

    url = "https://8888-junhaok-wanderlustbe-kh7ct609pd2.ws-us54.gitpod.io/listings"
    resUrl = "https://8888-junhaok-wanderlustbe-kh7ct609pd2.ws-us54.gitpod.io/"

    state = {
        data: [],
        tagsData: [],
        tagLength: 0,
        query: this.props.query,
        place: this.props.place,
        filter: this.props.filter,
        haveData: false,
        show: false
    }

    handleClose = () => {
        this.setState({
            show: false
        })
    }

    async componentDidMount() {
        if (this.state.filter === "free-listing") {
            let response = await axios.get(this.url + `/free?${this.state.query}=${this.state.place}`)
            this.setState({
                data: response.data,
                haveData: true
            })
            if (this.state.data.length === 0) {
                this.setState({
                    show: true
                })
            }
        }
        else if (this.state.filter === "") {
            let response = await axios.get(this.url + `?${this.state.query}=${this.state.place}`)
            this.setState({
                data: response.data,
                haveData: true
            })
            if (this.state.data.length === 0) {
                this.setState({
                    show: true
                })
            }
        }
        else if (this.state.filter === "best-rated") {
            let response = await axios.get(this.url + `/stars?${this.state.query}=${this.state.place}`)
            this.setState({
                data: response.data,
                haveData: true
            })
            if (this.state.data.length === 0) {
                this.setState({
                    show: true
                })
            }
        }
        else {
            let tagsResponse = await axios.get(this.resUrl + "tags")
            let response = await axios.get(this.url + `/tags/${this.state.filter}?${this.state.query}=${this.state.place}`)

            this.setState({
                tagsData: tagsResponse.data,
                data: response.data,
                filter: false,
                haveData: true
            })
            if (this.state.data.length === 0) {
                this.setState({
                    show: true
                })
            }
        }
    }

    renderContent = () => {

        if (this.state.data.length !== 0) {
            return (
                <div >
                    <Row xs={1} md={2} lg={3} className="g-4 container-fluid" >
                        {Array.from({ length: this.state.data.length }).map((_, idx) => (
                            <React.Fragment key={this.state.data[idx]._id}>
                                <Col className="card-holder">
                                    <Card id = "listing-card" style={{ width: '18rem' }} onClick={() => {
                                        this.props.setListingId(this.state.data[idx]._id)
                                        this.props.setActive("listing-details")
                                    }}>
                                        <Card.Img variant="top" src={this.state.data[idx].images} />
                                        <Card.Body>
                                            <div className="card-info">
                                                <Card.Title>{this.state.data[idx].name}</Card.Title>
                                                <Card.Title><span>{this.state.data[idx].country} - {this.state.data[idx].city}</span></Card.Title>
                                                <Card.Title>Author: <span>{this.state.data[idx].author}</span></Card.Title>
                                                <Card.Title>Type: <span>{this.state.data[idx].type}</span></Card.Title>
                                                <ListGroup variant="flush" className="card-list-group">
                                                    <ListGroup.Item>Price: <span>{this.state.data[idx].price !== 0 ? this.state.data[idx].price : "Free"}</span></ListGroup.Item>
                                                    <ListGroup.Item>Score: <span>{this.state.data[idx].ratings}/10</span></ListGroup.Item>
                                                    <ListGroup.Item>Rated: <span>{Array.from({ length: this.state.data[idx].stars }).map((_, idx) => (
                                                        <RiStarSFill color="#ffbb33" />
                                                    ))}</span></ListGroup.Item>

                                                </ListGroup>

                                                <div>
                                                    {Array.from(this.state.data[idx].tags_id, item => <Badge bg="warning" className="tags-badge">{item}</Badge>)}
                                                </div>

                                            </div>
                                            <Card.Footer className="card-footer text-muted">Click to see more details</Card.Footer>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </React.Fragment>
                        ))}
                    </Row>
                </div>
            )
        }
        else {
            // console.log(this.state.data)
            return (
                
                <Modal className="delete-modal" show={this.state.show} onHide={this.handleClose} backdrop="static" keyboard={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>No Results Found</Modal.Title>
                    </Modal.Header>
                    <Modal.Body >
                        There seems to be no listing with regards to this particular location
                        <br />
                        Would you like to contribute a submission on your travel experience to this location?
                        <br />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="warning" onClick={() => {
                            this.props.setActive('contribute')
                        }}>Yes</Button>
                        <Button variant="warning" onClick={() => {
                            this.handleClose();
                            this.props.setActive('home');
                            this.props.clearFilter()
                        }}>
                            No
                        </Button>
                    </Modal.Footer>
                </Modal>
            )


        }
    }

    // Limit pict size
    // Text also limit height
    render() {
        return (

            <React.Fragment>
                {this.state.haveData ? this.renderContent() : ""}
            </React.Fragment>
        )

    }
}

