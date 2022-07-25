import axios from "axios";
import React from "react";
import "../css/listingDetails.css"
import "../css/Separator.css"
import { RiStarSFill } from "react-icons/ri";
import { FaDollarSign } from "react-icons/fa";

export default class ListingDetails extends React.Component {

    url = "https://8888-junhaok-wanderlustbe-kh7ct609pd2.ws-us54.gitpod.io/listings/"

    state = {
        listingId: this.props.showListing,
        listingData: {},
        description1: "",
        description2: "",
        description3: ""
    }

    async componentDidMount() {
        let response = await axios.get(this.url + this.state.listingId)
        this.setState({
            listingData: response.data,
            description1: response.data.description[0],
            description2: response.data.description[1],
            description3: response.data.description[2],
        })
    }

    render() {
        return (
            <div className="listing-page">
                <div className="separator bg-warning"></div>
                <div className="img-container" >
                    <img className="listingImg" src={this.state.listingData.images} alt="location-image" />
                </div>

                <div className="separator02"></div>

                <div>
                    <div className="introduction">
                        <h1 className="listing-title">{this.state.listingData.name}</h1>

                        <div className="basic-info">
                            <h2><span> Country: <b className="singlePostBasic">
                                {this.state.listingData.country}
                            </b></span></h2>

                            <h2><span> City: <b className="singlePostBasic">
                                {this.state.listingData.city}
                            </b></span></h2>

                            <h2><span> Type: <b className="singlePostBasic">
                                {this.state.listingData.type}
                            </b></span></h2>

                            <h2><span> Author: <b className="singlePostBasic">
                                {this.state.listingData.author}
                            </b></span></h2>

                            <h2><span> Price: <b className="singlePostBasic">
                                {this.state.listingData.price}
                            </b></span></h2>

                            <h2><span> Score: <b className="singlePostBasic">
                                {this.state.listingData.ratings}/10
                            </b></span></h2>

                            <h2><span> Rated: <b className="singlePostBasic">
                                {Array.from({ length: this.state.listingData.stars }).map((_, idx) => (
                                    <RiStarSFill color="#ffbb33" />
                                ))}
                            </b></span></h2>

                            <h4><span><b className = "text-muted">Prices listed are in country's respective currency</b></span></h4>
                        </div>
                    </div>

                    <div className="separator02"></div>

                    <div className="description">
                        <h2> Description: </h2>
                        <ul className="description-list">
                            <li><span>{this.state.description1}</span></li>
                            <li><span>{this.state.description2}</span></li>
                            <li><span>{this.state.description3}</span></li>
                        </ul>
                        <h2> Author's experience: </h2>
                        <p>
                            {this.state.listingData.article}
                        </p>
                    </div>



                </div>



            </div>
        )
    }
}