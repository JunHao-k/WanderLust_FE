import React from "react";

export default class ListingDetails extends React.Component{

    state = {
        listingId: this.props.showListing,
        listingData: []
    }

    async componentDidMount(){
        
    }



    render(){
        return(
            <div>
                <h1>Hello World</h1>
                <div className = "img-container"></div>
            </div>
        )
    }
}