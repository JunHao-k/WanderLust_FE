import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/Landing.css"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import { searchSchema } from "../Validations/SearchValidation";
import Modal from 'react-bootstrap/Modal';
import {  BsFillFilterSquareFill } from "react-icons/bs"
import Spinner from "../Components/Spinner";


export default class LandingPage extends React.Component {

    url = "https://tgc-wanderlust.herokuapp.com/"

    state = {
        show: true,
        errorShow: false,
        tagsData: [],
        search: "",
        radioGroup: "",
        noError: true,
        showFilter: false
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

    toggleFilter = () => {
        if(this.state.showFilter){
            this.setState({
                showFilter: false
            })
        }
        else{
            this.setState({
                showFilter: true
            })
        }
    }

    



    render() {
        return (
            <React.Fragment>
              
                <div className="landing-body">
                    
                    <div className="overlay">
                        
                        <Form className="search-body">
                            
                            <Form.Group className="mb-3" controlId="formBasicSearch">

                                <div className = "d-flex">
                                    <Form.Control id = "main-page-search" type="text" placeholder="Search country or city" name="search" value={this.props.place} onChange={(event) => {
                                        this.props.updatePlace(event.target.value)
                                        this.updateSearch(this.props.place)
                                        
                                    }}/>
                                    <a id = "filterBtn" onClick = {() => {this.toggleFilter()}} className = "p-1"><BsFillFilterSquareFill size = {25} color = "#ffbb33"/></a>
                                </div>
                            </Form.Group>
                            
                            <div className = {this.state.showFilter ? "showFilterChoices" : "hideFilterChoices"}>
                                <div className="location-checkbox">
                                    
                                    <Form.Group className="mb-1" style = {{paddingLeft: "20px" , paddingTop: "20px"}} controlId="formBasicCheckbox">
                                        <Form.Text className="text-muted" style = {{paddingRight: "20px" , paddingTop: "20px"}}>
                                            *Required, choose country or city
                                        </Form.Text>
                                        <Form.Check type="radio" label="Country" name="location" value="country" checked={this.props.searchLocation === "country"} onChange={(event) => {
                                            this.props.updateQuery("country")
                                            this.updateRadio("country")
                                        }} />
                                    </Form.Group>
                                    
                                    <Form.Group className="mb-1 " style = {{paddingLeft: "20px"}} controlId="formBasicCheckbox">
                                        <Form.Check type="radio" label="City" name="location" value="city" checked={this.props.searchLocation === "city"} onChange={(event) => {
                                            this.props.updateQuery("city")
                                            this.updateRadio("city")
                                        }} />
                                    </Form.Group>
                                </div>
                                <Form.Group className="mb-3 p-3">
                                    <Form.Text className="text-muted">
                                        *Optional Field
                                    </Form.Text>
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
                            </div>

                            <Button variant="custom bg-warning mt-2" onClick={async () => {
                                await this.checkError()
                                this.state.noError ? this.props.setActive('listing') : this.handleShow()                                
                            }}>
                                Search
                            </Button>

                            <div id = {this.state.showFilter ? "search-instruction-close" : "search-instruction"}>
                                <h4>To start searching:</h4>
                                <p>
                                    Make sure to select either country or city via the icon beside the search bar or <span style = {{color: "red"}}>search will
                                    not go through</span>
                                </p>
                            </div>
                        </Form>
                    </div>
                </div>
                <Modal className="create-error" show={this.state.errorShow} onHide={this.handleClose} backdrop="static" keyboard={false}>
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