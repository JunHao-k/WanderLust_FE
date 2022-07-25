import React from "react";
import Login from "../Components/Login";
import "../css/DeleteModal.css"
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import { RiStarSFill } from "react-icons/ri";
import axios from "axios";
import '../css/Submission.css'
import Spinner from "../Components/Spinner";

export default class Submission extends React.Component {

    url = "https://8888-junhaok-wanderlustbe-kh7ct609pd2.ws-us54.gitpod.io/get-submissions"
    deleteURL = "https://8888-junhaok-wanderlustbe-kh7ct609pd2.ws-us54.gitpod.io/listings/"

    state = {
        email: "",
        mySubmission: [],
        retrieveStatus: 0,
        show: false,
        deleteName: "",
        deleteId: "",
        deleteCountry: "",
        deleteCity: "",
        haveData: false,
        errorShow: false

    }

    getData = async () => {
        let response = await axios.get(this.url + `?email=${this.state.email}`)
        this.setState({
            haveData: true,
            mySubmission: response.data
        })
        if(this.state.mySubmission.length === 0){
            this.setState({
                errorShow: true
            })
        }
    }

    getEmail = (email) => {
        this.setState({
            email: email
        });
    }

    handleClose = () => {
        this.setState({
            show: false
        })
    }

    noResultClose = () => {
        this.setState({
            errorShow: false
        })
    }

    handleShow = () => {
        this.setState({
            show: true
        })
    }

    deleteDetails = (name, id, country, city) => {
        this.setState({
            deleteName: name,
            deleteId: id,
            deleteCountry: country,
            deleteCity: city
        })
    }

    deleteListing = async () => {
        let res = await axios.delete(this.deleteURL + this.state.deleteId)
        console.log(res)
    }

    
    renderContent() {
        //if (this.state.retrieveStatus === 1) {
            if (this.state.mySubmission.length !== 0) {
                return (
                    <Row xs={1} md={2} lg={3} className="g-4 container-fluid" >
                        {Array.from({ length: this.state.mySubmission.length }).map((_, idx) => (
                            <React.Fragment key={this.state.mySubmission[idx]._id}>
                                <Col className="card-holder">
                                    <Card style={{ width: '18rem' }}>
                                        <Card.Img variant="top" src={this.state.mySubmission[idx].images} />
                                        <Card.Body>
                                            <div className="card-info">
                                                <Card.Title>{this.state.mySubmission[idx].name}</Card.Title>
                                                <Card.Title><span>{this.state.mySubmission[idx].country} - {this.state.mySubmission[idx].city}</span></Card.Title>
                                                <Card.Title>Author: <span>{this.state.mySubmission[idx].author}</span></Card.Title>
                                                <Card.Title>Type: <span>{this.state.mySubmission[idx].type}</span></Card.Title>

                                                <ListGroup variant="flush" className="card-list-group">
                                                    <ListGroup.Item>Price: <span>{this.state.mySubmission[idx].price !== 0 ? this.state.mySubmission[idx].price : "Free"}</span></ListGroup.Item>
                                                    <ListGroup.Item>Score: <span>{this.state.mySubmission[idx].ratings}/10</span></ListGroup.Item>
                                                    <ListGroup.Item>Rated: <span>{Array.from({ length: this.state.mySubmission[idx].stars }).map((_, idx) => (
                                                        <RiStarSFill color="#ffbb33" />
                                                    ))}</span></ListGroup.Item>

                                                </ListGroup>

                                                <div>
                                                    {Array.from(this.state.mySubmission[idx].tags_id ,  item => <Badge bg="warning" className = "tags-badge">{item}</Badge>)}
                                                </div>

                                            </div>

                                            <Button variant="custom bg-warning mb-3 udBtn" id="editBtn" onClick={async () => {
                                                await this.props.selectListing(this.state.mySubmission[idx]._id)
                                                this.props.setActive('update')
                                            }}>
                                                Edit
                                            </Button>
                                            <Button variant="custom bg-warning mb-3 udBtn" id="deleteBtn" onClick={() => {
                                                this.handleShow();
                                                this.deleteDetails(
                                                    this.state.mySubmission[idx].name,
                                                    this.state.mySubmission[idx]._id,
                                                    this.state.mySubmission[idx].country,
                                                    this.state.mySubmission[idx].city
                                                )
                                            }}>
                                                Delete
                                            </Button>
                                            <Modal className="delete-modal" show={this.state.show} onHide={this.handleClose} backdrop="static" keyboard={false}>
                                                <Modal.Header closeButton>
                                                    <Modal.Title>Delete {this.state.deleteName}?</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body >
                                                    Are you sure you want to delete this listing about {this.state.deleteName} located in
                                                    {this.state.deleteCity} , {this.state.deleteCountry}
                                                </Modal.Body>
                                                <Modal.Footer>
                                                    <Button variant="warning" onClick={() => {
                                                        this.deleteListing();
                                                        this.props.setActive('home')
                                                    }}>Yes</Button>
                                                    <Button variant="warning" onClick={this.handleClose}>
                                                        No
                                                    </Button>
                                                </Modal.Footer>
                                            </Modal>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </React.Fragment>
                        ))}
                    </Row>
                )
            }
            else {
                return (
                    // <h1>No results found</h1>
                    <Modal className="delete-modal" show={this.state.errorShow} onHide={this.noResultClose} backdrop="static" keyboard={false}>
                        <Modal.Header closeButton>
                            <Modal.Title> No Results Found </Modal.Title>
                        </Modal.Header>
                        <Modal.Body >
                            Please check in the following field:
                            <br />

                            <br />
                            Make sure you enter a valid email.
                            <br />

                            <br />
                            Please make sure to enter the same email that is registered to your submissions
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="warning" onClick={this.noResultClose}>
                                OK
                            </Button>
                        </Modal.Footer>
                    </Modal>
                )
            }
        //}
        
    }

    render() {
        return (
            <React.Fragment>
                <Login getEmail={this.getEmail} email={this.state.email} getData={this.getData} />
                {this.state.haveData ? this.renderContent() : <Spinner/>}
            </React.Fragment>
        )
    }
}

