import React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../css/Login.css'
// import axios from "axios";

export default class Login extends React.Component{


    render(){
        return(
            <React.Fragment>
                <div className = "login-div">
                    <Form className = "login-box p-3 bg-warning">
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control type="email" placeholder="Enter email here" value = {this.props.email} 
                                onChange = {(event) => {this.props.getEmail(event.target.value)}}/>
                        </Form.Group>
                        <Button variant="custom bg-dark" id = "loginBtn" onClick = {() => this.props.getData()}>
                            Get my listings
                        </Button>
                    </Form>
                </div>
            </React.Fragment>
        )
    }
}