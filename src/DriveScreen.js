import React, { Component } from 'react';
// import { Link } from "react-router-dom";

import './NewDocScreen.css';
import download from './download.js';

class DriveScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount() {
        fetch('/pdf')
        .then(response => response.blob())
        .then(blob => download(blob))
        // .then(blob => URL.createObjectURL(blob))
        // .then(url => {
        //     window.open(url, '_blank');
        //     window.URL.revokeObjectURL(url);
        // });
        // .then(data => this.setState({ data }));
    }
    render() {
        return (
            <div className="NewDocScreen">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2">
                            <h1>Drive</h1>
                            <a href="http://localhost:5000/pdf" target="blank">PDF</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default DriveScreen;