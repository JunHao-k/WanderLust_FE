import React from "react";
import Login from "../Components/Login";
import "../css/DeleteModal.css"
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import '../css/Submission.css'

export default class Submission extends React.Component {

    url = "https://8888-junhaok-wanderlustbe-vnzajbnkkmk.ws-us54.gitpod.io/get-submissions"
    deleteURL = "https://8888-junhaok-wanderlustbe-vnzajbnkkmk.ws-us54.gitpod.io/listings/"

    state = {
        email: "",
        mySubmission: [],
        retrieveStatus: 0,
        show: false,
        deleteName: "",
        deleteId: "",
        deleteCountry: "",
        deleteCity: ""
        
    }

    getData = async () => {
        let response = await axios.get(this.url + `?email=${this.state.email}`)
        this.setState({
            retrieveStatus: 1,
            mySubmission: response.data
        })
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

    handleShow = () => {
        this.setState({
            show: true
        })
    }

    deleteDetails = (name , id , country , city) => {
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
        if (this.state.retrieveStatus === 1) {
            if (this.state.mySubmission.length !== 0) {
                return (
                    <Row xs={1} md={2} lg={3} className="g-4 container-fluid" >
                        {Array.from({ length: this.state.mySubmission.length }).map((_, idx) => (
                            <React.Fragment key={this.state.mySubmission[idx]._id}>
                                <Col className="card-holder">
                                    <Card style={{ width: '18rem' }}>
                                        <Card.Img variant="top" src={this.state.mySubmission[idx].images} />
                                        <Card.Body>
                                            <Card.Title>{this.state.mySubmission[idx].name}</Card.Title>
                                            <Card.Title>{this.state.mySubmission[idx].type}</Card.Title>
                                            <Card.Title>{this.state.mySubmission[idx].country}</Card.Title>
                                            <Card.Title>{this.state.mySubmission[idx].city}</Card.Title>
                                            <ul>
                                                <li>{this.state.mySubmission[idx].description[0]}</li>
                                                <li>{this.state.mySubmission[idx].description[1]}</li>
                                                <li>{this.state.mySubmission[idx].description[2]}</li>
                                            </ul>
                                            <Card.Text>
                                                Some quick example text to build on the card title and make up the
                                                bulk of the card's content.
                                            </Card.Text>
                                            <Button variant="custom bg-warning mb-3 udBtn" onClick={async () => {
                                                await this.props.selectListing(this.state.mySubmission[idx]._id)
                                                this.props.setActive('update')
                                            }}>
                                                Edit
                                            </Button>
                                            <Button variant="custom bg-warning mb-3 udBtn" onClick = {() => {
                                                    this.handleShow(); 
                                                    this.deleteDetails(
                                                        this.state.mySubmission[idx].name ,
                                                        this.state.mySubmission[idx]._id ,
                                                        this.state.mySubmission[idx].country,
                                                        this.state.mySubmission[idx].city
                                                    )
                                                }}>
                                                Delete
                                            </Button>
                                            <Modal className = "delete-modal" show={this.state.show} onHide={this.handleClose} backdrop="static" keyboard={false}>
                                                <Modal.Header  closeButton>
                                                    <Modal.Title>Delete {this.state.deleteName}?</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body >
                                                    Are you sure you want to delete this listing about {this.state.deleteName} located in  
                                                    {this.state.deleteCity} , {this.state.deleteCountry}
                                                </Modal.Body>
                                                <Modal.Footer>
                                                    <Button variant="warning" onClick = {() => {
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
                    <React.Fragment>
                        <h1>No listing available</h1>
                    </React.Fragment>
                )
            }
        }
    }

    render() {
        return (
            <React.Fragment>
                <Login getEmail={this.getEmail} email={this.state.email} getData={this.getData} />
                {this.renderContent()}
            </React.Fragment>
        )
    }
}