import React from "react";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
// import Modal from 'react-bootstrap/Modal';
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
import '../css/Listing.css'
import axios from 'axios';

export default class Listing extends React.Component {

    url = "https://8888-junhaok-wanderlustbe-19jlt16pdei.ws-us54.gitpod.io/listings"
    resUrl = "https://8888-junhaok-wanderlustbe-19jlt16pdei.ws-us54.gitpod.io/"

    state = {
        data: [],
        tagsData: [],
        query: this.props.query,
        place: this.props.place,
        filter: this.props.filter,
        // selectedTag: "",
        haveData: false
    }
    async componentDidMount() {
        if (this.state.filter === "free-listing") {
            let response = await axios.get(this.url + `/free?${this.state.query}=${this.state.place}`)
            this.setState({
                data: response.data,
                haveData: true
            })
        }
        else if(this.state.filter === ""){
            let response = await axios.get(this.url + `?${this.state.query}=${this.state.place}`)
            this.setState({
                data: response.data,
                haveData: true
            })
        }
        else if(this.state.filter === "best-rated"){
            let response = await axios.get(this.url + `/stars?${this.state.query}=${this.state.place}`)
            this.setState({
                data: response.data,
                haveData: true
            })
        }
        else{
            let tagsResponse = await axios.get(this.resUrl + "tags")
            let response = await axios.get(this.url + `/tags/${this.state.filter}?${this.state.query}=${this.state.place}`)
            this.setState({
                tagsData: tagsResponse.data,
                data: response.data,
                filter: false,
                haveData: true
            })
        }
        
        

    }

    // updateFilter = async (event) => {
    //     this.setState({
    //         [event.target.name]: event.target.value
    //     })
    // }

    // refineSearch = async () => {
    //     if (this.state.filter === "free-listing") {
    //         let response = await axios.get(this.url + "/free" + `?${this.state.query}=${this.state.place}`)
    //         this.setState({
    //             data: response.data,
    //             haveData: true
    //         })
    //     }
    //     else {
    //         let response = await axios.get(this.url + `?${this.state.query}=${this.state.place}`)
    //         // console.log(response.data)
    //         this.setState({
    //             data: response.data,
    //             haveData: true
    //         })
    //     }
    // }

    // resetFilter = async () => {
    //     let response = await axios.get(this.url + `?${this.state.query}=${this.state.place}`)
    //     // console.log(response.data)
    //     this.setState({
    //         data: response.data,
    //         haveData: true,
    //         filter: ""
    //     })
    // }

    renderContent = () => {
        if (this.state.data.length !== 0) {
            return (
                <div >
                    <Row xs={1} md={2} lg={3} className="g-4 container-fluid" >
                        {Array.from({ length: this.state.data.length }).map((_, idx) => (
                            <React.Fragment key={this.state.data[idx]._id}>
                                <Col className="card-holder">
                                    <Card style={{ width: '18rem' }}>
                                        <Card.Img variant="top" src={this.state.data[idx].images} />
                                        <Card.Body>
                                            <Card.Title>{this.state.data[idx].name}</Card.Title>
                                            <Card.Title>{this.state.data[idx].type}</Card.Title>
                                            <ul>
                                                <li>{this.state.data[idx].description[0]}</li>
                                                <li>{this.state.data[idx].description[1]}</li>
                                                <li>{this.state.data[idx].description[2]}</li>
                                            </ul>
                                            <Card.Text>
                                                Some quick example text to build on the card title and make up the
                                                bulk of the card's content.
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </React.Fragment>
                        ))}
                    </Row>
                </div>
            )
        }
        else {
            // console.log(this.state.data)
            return (
                <div>
                    <h1>No results found</h1>
                </div>
            )

            // <Modal className="delete-modal" show={this.state.show} onHide={this.handleClose} backdrop="static" keyboard={false}>
            //     <Modal.Header closeButton>
            //         <Modal.Title>Delete {this.state.deleteName}?</Modal.Title>
            //     </Modal.Header>
            //     <Modal.Body >
            //         Are you sure you want to delete this listing about {this.state.deleteName} located in
            //         {this.state.deleteCity} , {this.state.deleteCountry}
            //     </Modal.Body>
            //     <Modal.Footer>
            //         <Button variant="warning" onClick={() => {
            //             this.deleteListing();
            //             this.props.setActive('home')
            //         }}>Yes</Button>
            //         <Button variant="warning" onClick={this.handleClose}>
            //             No
            //         </Button>
            //     </Modal.Footer>
            // </Modal>
        }
    }

    // Limit pict size
    // Text also limit height
    render() {
        return (

            <React.Fragment>
                {this.state.haveData ? this.renderContent() : ""}
            </React.Fragment>
        )

    }
}

