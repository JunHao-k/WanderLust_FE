import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/Navbar.css"

export default class NavBar extends React.Component {

    state = {
        show: true
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand text-warning" href="#">
                    <img src = {require("../css/branding.jpg")} alt={"branding"} width="80px" height="50" style = {{marginRight: "10px"}} class="d-inline-block align-text-center"/>
                        WanderLust
                    </a>
                    <button className="navbar-toggler border border-warning text-warning"
                        onClick={() => { this.setState({ show: !this.state.show }) }}>
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className={this.state.show ? "collapse navbar-collapse" : "collapse navbar-collapse active"} >
                        <ul className="navbar-nav  ms-auto">
                            <li className="nav-item">
                                <a className="nav-link text-light" onClick={() => {
                                    this.props.setActive('home')
                                    this.props.clearFilter()
                                    }}>
                                        HOME
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-light" onClick={() => this.props.setActive('contribute')}>CONTRIBUTE</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-light" onClick={() => this.props.setActive('submission')}>MY SUBMISSIONS</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}