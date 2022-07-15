import React from "react";
import Listing from "./Pages/Listing";
import Contribute from "./Pages/Contribute";
import LandingPage from "./Pages/LandingPage";
import NavBar from "./Components/NavBar";


export default class Main extends React.Component {

  state = {
    active: "home",
    locations: "",
    place: ""
  };

  updatePlace = (value) => {
    this.setState({
      place: value
    })
  }

  updateQuery = (searchBy) => {
    this.setState({
        locations: searchBy
    })
  }

  setActive = (page) => {
    this.setState({
      active: page
    });
  }

  renderContent() {
    if (this.state.active === "listing") {
      return (
        <React.Fragment>
          <NavBar setActive={this.setActive} />
          <Listing 
            query = {this.state.locations}
            place = {this.state.place}
          />
        </React.Fragment>
      );
    }
    else if (this.state.active === "contribute") {
      return (
        <React.Fragment>
          <NavBar setActive={this.setActive} />
          <Contribute />
        </React.Fragment>
      );
    }
    else if (this.state.active === "home") {
      return (
        <React.Fragment>
          <NavBar setActive={this.setActive} />
          <LandingPage 
            setActive={this.setActive} 
            updateQuery = {this.updateQuery}
            searchLocation = {this.state.locations}
            updatePlace = {this.updatePlace}
            place = {this.state.place}
          />
        </React.Fragment>
      )
    }
  }

  render() {
    return (
      <React.Fragment>{this.renderContent()}</React.Fragment>
    )
  }
}