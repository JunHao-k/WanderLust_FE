import React from "react";
import Form from 'react-bootstrap/Form';
import '../css/contribute.css'
import axios from "axios";



export default class Contribute extends React.Component {

    state = {
        countryData: [],
        tagsData: []
    }

    url = "https://8888-junhaok-wanderlustbe-fwpudmsqmrm.ws-us54.gitpod.io/"
    async componentDidMount() {
        let response1 = await axios.get(this.url + "countries")
        let response2 = await axios.get(this.url + "tags")
        this.setState({
            countryData: response1.data,
            tagsData: response2.data
        })
    }

    isEven = (num) => {
        return (num%2===0)
    }
   

    render() {
        return (
            <React.Fragment>
                <div className="contribute-form">

                    <Form.Group className="p-3">
                        <Form.Label>Type</Form.Label>
                        <Form.Group className="mb-1 p-2" controlId="formBasicCheckbox">
                            <Form.Check type="radio" label="Attraction" name="type" value="country" /*checked={this.props.searchLocation === "country"} onChange={() => this.props.updateQuery("country")} *//>
                        </Form.Group>
                        <Form.Group className="mb-1 p-2" controlId="formBasicCheckbox">
                            <Form.Check type="radio" label="Food" name="type" value="city" /*checked={this.props.searchLocation === "city"} onChange={() => this.props.updateQuery("city")} *//>
                        </Form.Group>
                        <Form.Group className="mb-1 p-2" controlId="formBasicCheckbox">
                            <Form.Check type="radio" label="Activity" name="type" value="city" /*checked={this.props.searchLocation === "city"} onChange={() => this.props.updateQuery("city")} *//>
                        </Form.Group>
                    </Form.Group>


                    <Form.Group className="mb-3 p-3" controlId="formPlaceName">
                        <Form.Label>Enter the name of attraction</Form.Label>
                        <Form.Control type="text" placeholder="Place Name" />
                    </Form.Group>

                    <Form.Group className="mb-3 p-3" controlId="formAuthorName">
                        <Form.Label>Your Name</Form.Label>
                        <Form.Control type="text" placeholder="Input Name" />
                    </Form.Group>


                    <Form.Group className="mb-3 p-3 g-3" controlId="formAuthorName">
                        <Form.Label>Short description of your recommendation</Form.Label>
                        <Form.Group className="p-1">
                            <Form.Control type="text" placeholder="1. First description" />
                        </Form.Group>
                        <Form.Group className="p-1">
                            <Form.Control type="text" placeholder="2. Second description" />
                        </Form.Group>
                        <Form.Group className="p-1">
                            <Form.Control type="text" placeholder="3. Third description" />
                        </Form.Group>
                    </Form.Group>

                    <Form.Group className="mb-3 p-3 g-3">
                        <Form.Label>Country</Form.Label>
                        <Form.Select aria-label="Default select example">
                            <option>-- Select Country --</option>
                            {Array.from({ length: this.state.countryData.length }).map((_, idx) => (
                                <option name = "country" value={this.state.countryData[idx]._id}>{this.state.countryData[idx].country}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>


                    <Form.Group className="mb-3 p-3" controlId="formCityName">
                        <Form.Label>City</Form.Label>
                        <Form.Control type="text" placeholder="Input City" />
                    </Form.Group>

                    <Form.Group className="mb-3 p-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3 p-3" controlId="formArticleName">
                        <Form.Label>Share your experiences in a summary</Form.Label>
                        <Form.Control as="textarea" placeholder="Input City" />
                    </Form.Group>

                    <Form.Group className="mb-3 p-3" controlId="formPriceEmail">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="text" placeholder="Enter price" />
                        <Form.Text className="text-muted">
                            Enter pricing in respective country's currency         
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3 p-3">
                        <Form.Label>Give this place a score out of 10</Form.Label>
                        <Form.Select aria-label="Default select example">
                            <option>-- Rate this recommendation --</option>
                            {Array.from({ length: 11 }).map((_, idx) => (
                                <option name = "ratings" value = {idx}>{idx}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3 p-3">
                        <Form.Label>Rate this recommendation out of 5 stars</Form.Label>
                        <Form.Select aria-label="Default select example">
                            <option>-- Number of stars --</option>
                            {Array.from({ length: 6}).map((_, idx) => (
                                <option name = "stars" value = {idx}>{idx}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group>   
                        <div key={`inline-checkbox`} className="mb-3 p-3">
                            <Form.Label className = "p-2">Rate this recommendation out of 5 stars: </Form.Label>
                            {Array.from({ length: this.state.tagsData.length}).map((_, idx) => (
                                <Form.Check inline label={this.state.tagsData[idx].tag_name} name="tags" type='checkbox' id = "inline-checkbox-1"/>
                            ))}
                        </div>
                    </Form.Group>
                    
                    <Form.Group className="mb-3 p-3" controlId="formUrlName">
                        <Form.Label>Paste picture URL link here</Form.Label>
                        <Form.Control type="url" placeholder="URL link to picture" />
                    </Form.Group>
                    
                </div>
            </React.Fragment>
        )
    }
}