import React from "react";
import Login from "../Components/Login";
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import '../css/Login.css'
import axios from "axios";

export default class Submission extends React.Component{

    url = "https://8888-junhaok-wanderlustbe-j9cdgw3eeay.ws-us54.gitpod.io/get-submissions"

    state = {
        email: "",
        mySubmission: [],
        retrieveStatus: 0
    }

    getData = async () => {

        let response = await axios.get(this.url + `?email=${this.state.email}`)
        this.setState({
            mySubmission: response.data
        })
    
    }


    updateSubmission = (mySubmission) => {
        this.setState({
            mySubmission: mySubmission
        })
    }

    updateStatus = (num) => {
        this.setState({
            retrieveStatus: num
        })
    }
    
    updateEmail = (event) => {
        this.setState({
            email: event.target.value
        })
    }
    getEmail = async (email) => {
        this.setState({
          email: email
        });
    }

    render(){
        return(
            <React.Fragment>
                <Login getEmail = {this.getEmail} email = {this.state.email} getData = {this.getData} />
            </React.Fragment>
        )
    }
}