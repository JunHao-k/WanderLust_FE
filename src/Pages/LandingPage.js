import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/landing.css"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default class LandingPage extends React.Component{

    url = "https://3000-junhaok-wanderlustbe-bf8sxtwfi2f.ws-us54.gitpod.io/"

    state = {
        show: true,
        location: "",
    }

    updateQuery = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render(){
        return(
            <React.Fragment>
                <div className = "landing-body">
                    <div className = "overlay">
                        <Form className = "search-body">
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control type="search" placeholder="Search country or city" />
                            </Form.Group>
                            <div className = "location-checkbox">
                                <Form.Group className="mb-3 p-2" controlId="formBasicCheckbox">
                                    <Form.Check type="radio" label="Country" name = "location" value = "country" checked = {this.state.location === "country"} onChange = {this.updateQuery}/>
                                </Form.Group>
                                <Form.Group className="mb-3 p-2" controlId="formBasicCheckbox">
                                    <Form.Check type="radio" label="City" name = "location" value = "city" checked = {this.state.location === "city"} onChange = {this.updateQuery}/>
                                </Form.Group>
                            </div>
                            <Button variant="custom bg-warning"  type="submit" onClick = {() => this.props.setActive('listing')}>
                                Search
                            </Button>
                        </Form>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}