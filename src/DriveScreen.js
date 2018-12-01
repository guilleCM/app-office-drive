import React, { Component } from 'react';
import axios from 'axios';
// import { Link } from "react-router-dom";

import './NewDocScreen.css';
import './DriveScreen.css';

const Folder = ({ label, onClickHandler }) => (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3" onClick={() => onClickHandler(label)}>
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
const Document = ({ label, onClickHandler }) => (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3" style={{marginBottom: '0.5rem'}} onClick={() => onClickHandler(label)}>
        <div className="card folder-wrapper">
            <div className="card-body" style={{padding: '0.4rem'}}>
                <span className="folder-label"><i className="fas fa-file-invoice invoice-icon"/>{label}</span>
            </div>
        </div>
    </div>
);

class DocumentsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            documents: [],
        };
        this.handleDocumentClick = this.handleDocumentClick.bind(this);
    }
    componentDidMount() {
        document.getElementById('App-Loader').style.display = 'block';
        axios.get('/docs/FilterByYear')
        .then((res) => {
            document.getElementById('App-Loader').style.display = 'none';
            this.setState({
                documents: res.data
            })
        })
    }
    componentWillUnmount() {
        document.getElementById('App-Loader').style.display = 'none';
    }
    render() {
        return(
            <div className="row" style={{marginTop: '1rem'}}>
                {this.state.documents.map((doc => 
                    <Document 
                        key={doc.id} 
                        label={doc.id} 
                        onClickHandler={this.handleDocumentClick}
                    />
                ))}
            </div>
        )
    }
    handleDocumentClick(id) {
        console.log("PDF")
    }
}

class DriveScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.handleFolderClick = this.handleFolderClick.bind(this);
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

                    {this.props.match.params.year === undefined &&
                        <div className="row" style={{marginTop: '1rem'}}>
                            <Folder 
                                label="2018" 
                                onClickHandler={this.handleFolderClick}
                            />
                        </div>
                    }
                    {this.props.match.params.year !== undefined &&
                        <DocumentsScreen 
                            filters={{year: this.props.match.params.year}}
                        />
                    }
                </div>
            </div>
        )
    }
    handleFolderClick(folderYear) {
        this.props.history.push('/drive/folder/'+folderYear);
    }
}

export default DriveScreen;