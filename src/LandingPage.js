import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/Navbar.css"


export default class LandingPage extends React.Component {
    state = {
        show: true,
        active: "listing"
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

    render() {
        return (
            <React.Fragment>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container-fluid">
                        <a className="navbar-brand text-warning" href="#">WanderLust</a>
                        <button className="navbar-toggler border border-warning text-warning" 
                        onClick = {() => {this.setState({show: !this.state.show})}}>
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className = {this.state.show ? "collapse navbar-collapse" : "collapse navbar-collapse active"} >
                            <ul className="navbar-nav  ms-auto">
                                <li className="nav-item">
                                    <a className="nav-link text-light" href="#">HOME</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link text-light" href="#">CONTRIBUTE</a>
                                </li>
                                {/* <li className="nav-item">
                                    <a className="nav-link" href="#">Pricing</a>
                                </li> */}
                                
                            </ul>
                        </div>
                    </div>
                </nav>
            </React.Fragment>
        )
    }
}