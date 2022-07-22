import axios from "axios";
import React from "react";
import "../css/listingDetails.css"

export default class ListingDetails extends React.Component{

    url = "https://8888-junhaok-wanderlustbe-vnzajbnkkmk.ws-us54.gitpod.io/listings/"

    state = {
        listingId: this.props.showListing,
        listingData: {}
    }

    async componentDidMount(){
        let response = await axios.get(this.url + this.state.listingId)
        this.setState({
            listingData: response.data
        })
    }

    render(){
        return(
            <div className = "listing-page bg-dark text-light">
                <div className = "separator bg-warning"></div>
                <div className = "img-container" >
                    <img className = "listingImg" src = {this.state.listingData.images} alt = "location-image"/>
                </div>
                <h1>Testing</h1>
            </div>
        )
    }
}