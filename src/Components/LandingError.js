import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


export default class LandingError extends React.Component {
    state = {
        show: this.props.show
    }
    handleClose = () => {
        this.setState({
            show: false
        })
    }

    handleShow = () => {
        this.setState({
            show: true
        })
    }
    render() {
        return (
            <Modal className="delete-modal" show={this.state.show} onHide={this.handleClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title> Required fields reminder </Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    Please check in the following field:
                    <br/>
                    1. Make sure you enter a valid country or city tag_name.
                    <br/>
                    2. Please make sure to indicate if you are searching via country or city   
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="warning" /*onClick={() => {
                        this.deleteListing();
                        this.props.setActive('home')
                    }}*/>Yes</Button>
                    <Button variant="warning" onClick={this.handleClose}>
                        No
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}