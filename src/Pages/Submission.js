import React from "react";
import Login from "../Components/Login";
// import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import axios from "axios";
import '../css/Submission.css'

export default class Submission extends React.Component{

    url = "https://8888-junhaok-wanderlustbe-ultao66f8gr.ws-us54.gitpod.io/get-submissions"

    state = {
        email: "",
        mySubmission: [],
        retrieveStatus: 0
    }

    getData = async () => {
        let response = await axios.get(this.url + `?email=${this.state.email}`)
        this.setState({
            retrieveStatus: 1,
            mySubmission: response.data
        })
    }

    getEmail = async (email) => {
        this.setState({
          email: email
        });
    }

    renderContent(){
        if(this.state.retrieveStatus === 1){
            if(this.state.mySubmission.length !== 0){
                return(
                    <Row xs={1} md={2} lg={3} className="g-4 container-fluid" >
                        {Array.from({ length: this.state.mySubmission.length }).map((_, idx) => (
                            <React.Fragment key={this.state.mySubmission[idx]._id}>
                                <Col className = "card-holder">
                                    <Card style={{ width: '18rem'}}>
                                        <Card.Img variant="top" src={this.state.mySubmission[idx].images} />
                                        <Card.Body>
                                            <Card.Title>{this.state.mySubmission[idx].name}</Card.Title>
                                            <Card.Title>{this.state.mySubmission[idx].type}</Card.Title>
                                            <ul>
                                                <li>{this.state.mySubmission[idx].description[0]}</li>
                                                <li>{this.state.mySubmission[idx].description[1]}</li>
                                                <li>{this.state.mySubmission[idx].description[2]}</li>
                                            </ul>
                                            <Card.Text>
                                                Some quick example text to build on the card title and make up the
                                                bulk of the card's content.
                                            </Card.Text>
                                            <Button variant="custom bg-warning mb-3 udBtn" onClick = {async () => {
                                                await this.props.selectListing(this.state.mySubmission[idx]._id)
                                                this.props.setActive('update')
                                            }}>
                                                Update
                                            </Button>
                                            <Button variant="custom bg-warning mb-3 udBtn">
                                                Delete
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </React.Fragment>
                        ))}
                    </Row>
                )
            }
            else{
                return(
                    <React.Fragment>
                        <h1>No listing available</h1>
                    </React.Fragment>   
                ) 
            }
        }
    }

    render(){
        return(
            <React.Fragment>
                <Login getEmail = {this.getEmail} email = {this.state.email} getData = {this.getData} />
                {this.renderContent()}
            </React.Fragment>
        )
    }
}