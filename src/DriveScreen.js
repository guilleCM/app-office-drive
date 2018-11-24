import React, { Component } from 'react';
// import { Link } from "react-router-dom";

import './NewDocScreen.css';
import './DriveScreen.css';

const Folder = ({ label, onClickHandler }) => (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3" onClick={onClickHandler}>
        <div className="card folder-wrapper">
            <div className="card-body">
                <h4 className="folder-label"><i className="fas fa-folder folder-icon"/>{label}</h4>
            </div>
        </div>
    </div>
);
// class Folder extends Component {
//     render() {
//         <div className="col-12 col-sm-6 col-md-4 col-lg-3">
//             <div className="card folder-wrapper">
//                 <div className="card-body">
//                     <h4 className="folder-label"><i className="fas fa-folder folder-icon"/>{this.props.folderLabel}</h4>
//                 </div>
//             </div>
//         </div>
//     }
// }
class DriveScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount() {
    }
    render() {
        return (
            <div className="NewDocScreen">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2">
                            <h2>Consultar documentos</h2>
                        </div>
                    </div>

                    <div className="row" style={{marginTop: '1rem'}}>
                        <Folder 
                            label="2018" 
                            onClickHandler={this.handleFolderClick}
                        />
                    </div>

                </div>
            </div>
        )
    }
    handleFolderClick() {
        console.log("click")
    }
}

export default DriveScreen;