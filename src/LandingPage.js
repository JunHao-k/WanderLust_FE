import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/Navbar.css"
import "./css/landing.css"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


export default class LandingPage extends React.Component {


    state = {
        show: true,
        active: "listing",
        location: "",
    };

    renderContent() {
        if (this.state.active === "listing") {
            return (
                <React.Fragment>
                    {/* <Listing /> */}
                </React.Fragment>
            );
        }
        /*else if (this.state.active === "add") {
            return (
                <React.Fragment>
                <AddNew />
                </React.Fragment>
            );
        }*/
    }

    setActive = (page) => {
        this.setState({
            active: page
        });
    }

    updateQuery = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    

    render() {
        return (
            <React.Fragment>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container-fluid">
                        <a className="navbar-brand text-warning" href="#">WanderLust</a>
                        <button className="navbar-toggler border border-warning text-warning"
                            onClick={() => { this.setState({ show: !this.state.show }) }}>
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className={this.state.show ? "collapse navbar-collapse" : "collapse navbar-collapse active"} >
                            <ul className="navbar-nav  ms-auto">
                                <li className="nav-item">
                                    <a className="nav-link text-light" href="#">HOME</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link text-light" href="#">CONTRIBUTE</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                {/* <div className="search-body">
                    <div className="mb-3">
                        <label for="exampleFormControlInput1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                    </div>
                    <div className = "radio-body">
                        <div className ="form-check">
                            <input className ="form-check-input" type="radio" name="country" id="flexRadioDefault1"/>
                                <label className ="form-check-label" for="flexRadioDefault1">
                                    Country
                                </label>
                        </div>
                        <div className ="form-check">
                            <input className ="form-check-input" type="radio" name="city" id="flexRadioDefault2" checked/>
                                <label className ="form-check-label" for="flexRadioDefault2">
                                    City
                                </label>
                        </div>
                    </div>
                    
                </div> */}
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
                        <Button variant="custom bg-warning"  type="submit">
                            Submit
                        </Button>
                    </Form>
                </div>
                
               
            </React.Fragment>
        )
    }
}