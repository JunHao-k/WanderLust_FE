import React from "react";
import "../css/Spinner.css"

export default class Spinner extends React.Component {
    render() {
        return (
            <div class="spinner">
                <div class="double-bounce1"></div>
                <div class="double-bounce2"></div>
            </div>
        )
    }
}