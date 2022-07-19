import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/Landing.css"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';



export default class LandingPage extends React.Component {

    url = "https://8888-junhaok-wanderlustbe-8gy03i5t39q.ws-us54.gitpod.io/"

    state = {
        show: true,
    }


    render() {
        return (
            <React.Fragment>
                <div className="landing-body">
                    <div className="overlay">
                        <Form className="search-body">
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control type="text" placeholder="Search country or city" value={this.props.place} onChange={(event) => this.props.updatePlace(event.target.value)} />
                            </Form.Group>
                            <div className="location-checkbox">
                                <Form.Group className="mb-3 p-2" controlId="formBasicCheckbox">
                                    <Form.Check type="radio" label="Country" name="location" value="country" checked={this.props.searchLocation === "country"} onChange={() => this.props.updateQuery("country")} />
                                </Form.Group>
                                <Form.Group className="mb-3 p-2" controlId="formBasicCheckbox">
                                    <Form.Check type="radio" label="City" name="location" value="city" checked={this.props.searchLocation === "city"} onChange={() => this.props.updateQuery("city")} />
                                </Form.Group>
                            </div>
                            <Button variant="custom bg-warning" onClick={() => this.props.setActive('listing')}>
                                Search
                            </Button>
                            
                        </Form>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}