import React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../css/Login.css'
// import axios from "axios";

export default class Login extends React.Component{

    // url = "https://8888-junhaok-wanderlustbe-j9cdgw3eeay.ws-us54.gitpod.io/get-submissions"

    // state = {
    //     mySubmission: []
    // }


    render(){
        return(
            <React.Fragment>
                <div>
                    <Form className = "login-box p-3 bg-warning">
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control type="email" placeholder="Enter email here" value = {this.props.email} 
                                onChange = {(event) => {this.props.getEmail(event.target.value)}}/>
                        </Form.Group>
                        <Button variant="custom bg-dark" id = "loginBtn" type="submit" onClick = {() => this.props.getData()}>
                            Get my listings
                        </Button>
                    </Form>
                </div>
            </React.Fragment>
        )
    }
}