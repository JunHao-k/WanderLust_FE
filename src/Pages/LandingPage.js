import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/Landing.css"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import { searchSchema } from "../Validations/SearchValidation";
// import LandingError from "../Components/LandingError";
import Modal from 'react-bootstrap/Modal';
import { BsFillFilterSquareFill } from "react-icons/bs"


export default class LandingPage extends React.Component {

    url = "https://8888-junhaok-wanderlustbe-g4s1zflut0h.ws-us54.gitpod.io/"

    state = {
        show: true,
        errorShow: false,
        tagsData: [],
        search: "",
        radioGroup: "",
        noError: true
    }

    async componentDidMount() {

        let tagsResponse = await axios.get(this.url + "tags")
        this.setState({
            tagsData: tagsResponse.data,
            noError: true,
            search: this.props.place,
            radioGroup: this.props.searchLocation
            
        })

    }

    updateSearch = (location) => {
        this.setState({
            search: location
        })
    }
    updateRadio = (type) => {
        this.setState({
            radioGroup: type
        })
    }
    checkError = async () => {
        let searchData = {
            search: this.state.search,
            radioGroup: this.state.radioGroup
        }
        let isValid = await searchSchema.isValid(searchData)
        this.setState({
            noError: isValid
        })
    }

    handleClose = () => {
        this.setState({
            errorShow: false
        })
    }

    handleShow = () => {
        this.setState({
            errorShow: true
        })
    }

    



    render() {
        return (
            <React.Fragment>
                <div className="landing-body">
                    <div className="overlay">
                        
                        <Form className="search-body">
                            
                            <Form.Group className="mb-3" controlId="formBasicSearch">
                                <div className = "d-flex">
                                    <Form.Control type="text" placeholder="Search country or city" name="search" value={this.props.place} onChange={(event) => {
                                        this.props.updatePlace(event.target.value)
                                        this.updateSearch(this.props.place)
                                        
                                    }}/>
                                    <button id = "filterBtn"><BsFillFilterSquareFill size = {25} color = "#ffbb33"/></button>
                                </div>
                            </Form.Group>
                            
                            <div className="location-checkbox">

                                <Form.Group className="mb-3 p-2" controlId="formBasicCheckbox">
                                    <Form.Check type="radio" label="Country" name="location" value="country" checked={this.props.searchLocation === "country"} onChange={(event) => {
                                        this.props.updateQuery("country")
                                        this.updateRadio("country")
                                    }} />
                                </Form.Group>

                                <Form.Group className="mb-3 p-2" controlId="formBasicCheckbox">
                                    <Form.Check type="radio" label="City" name="location" value="city" checked={this.props.searchLocation === "city"} onChange={(event) => {
                                        this.props.updateQuery("city")
                                        this.updateRadio("city")
                                    }} />
                                </Form.Group>
                            </div>
                            <Form.Group className="mb-3 p-3">
                                <Form.Select aria-label="Default select example" name="filter" onChange={(event) => {
                                    this.props.updateFilter(event.target.value)
                                    //this.props.updateFilter(this.state.filter)
                                }}>
                                    <option value=""> -- Filter By -- </option>
                                    <option value="free-listing"> Free attractions </option>
                                    <option value="best-rated"> Best rated </option>
                                    {Array.from({ length: this.state.tagsData.length }).map((_, idx) => (
                                        <option value={this.state.tagsData[idx]._id}>
                                            {this.state.tagsData[idx].tag_name}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>

                            <Button variant="custom bg-warning" onClick={async () => {
                                await this.checkError()
                                this.state.noError ? this.props.setActive('listing') : this.handleShow()                                
                            }}>
                                Search
                            </Button>
                        </Form>
                    </div>
                </div>
                <Modal className="delete-modal" show={this.state.errorShow} onHide={this.handleClose} backdrop="static" keyboard={false}>
                    <Modal.Header closeButton>
                        <Modal.Title> Required fields reminder </Modal.Title>
                    </Modal.Header>
                    <Modal.Body >
                            Please check in the following field:
                            <br/>
                             
                            <br/>
                            Make sure you enter a valid country or city.
                            <br/>
                            
                            <br/>
                            Please make sure to indicate if you are searching via country or city
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="warning" onClick={this.handleClose}>
                            OK
                        </Button>
                    </Modal.Footer>
                </Modal>
            </React.Fragment>
        )
    }
}