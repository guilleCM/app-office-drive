import React, { Component } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

import './../docs/NewDocScreen.css';
import './DriveScreen.css';
import download from './download.js';

const Folder = ({ label, onClickHandler }) => (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3" onClick={() => onClickHandler(label)}>
        <div className="card folder-wrapper">
            <div className="card-body">
                <h4 className="folder-label"><i className="fas fa-folder folder-icon"/>{label}</h4>
            </div>
        </div>
    </div>
);

const Document = ({ label, apiEndPoint, onClickHandler }) => (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3" style={{marginBottom: '1rem'}} onClick={() => onClickHandler(apiEndPoint)}>
        <div className="card folder-wrapper">
            <div className="card-body" style={{padding: '0.4rem'}}>
                <span className="folder-label"><i className="fas fa-file-alt invoice-icon"/>{label}</span>
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
        axios.get('/docs/FilterByYear?year='+this.props.filters.year)
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
        let documents = {};
        const months = ["", "Enero", "Febrero", "Marzo", "Abril", "Mayo",
                        "Junio", "Julio", "Agosto", "Septiembre", "Octubre",
                        "Noviembre", "Diciembre"];
        for (let doc of this.state.documents) {
            let month = doc.c_date.substr(5, 2) * 1;
            if (months[month] in documents === false) {
                documents[months[month]] = [];
            }
            documents[months[month]].push(doc);
        }
        return(
            <div className="row" style={{marginTop: '1rem'}}>
                {this.state.documents.map((doc => 
                    <Document 
                        key={doc.id}
                        apiEndPoint={doc.id}
                        label={doc.client_name} 
                        onClickHandler={this.handleDocumentClick}
                    />
                ))}
            </div>
        )
    }
    handleDocumentClick(id) {
        document.getElementById('App-Loader').style.display = 'block';
        fetch('/docs/GetPdf?id='+id)
        .then(response => response.blob())
        .then(blob => {
            download(blob, 'factura');
            document.getElementById('App-Loader').style.display = 'none';
        })
    }
}

class DriveScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            years: []
        };
        this.handleFolderClick = this.handleFolderClick.bind(this);
    }
    componentDidMount() {
        document.getElementById('App-Loader').style.display = 'block';
        axios.get('/docs/DistinctSetOfYears')
        .then((res) => {
            document.getElementById('App-Loader').style.display = 'none';
            this.setState({
                years: res.data.years
            })
        })
    }
    render() {
        let breadcrumb = [];
        if (this.props.match.params.year === undefined) {
            breadcrumb.push(
                <li key="b-drive" className="breadcrumb-item active" aria-current="page">Documentos</li>
            )
        }
        else {
            breadcrumb.push(
                <li key="b-drive" className="breadcrumb-item"><Link to="/drive">Documentos</Link></li>
            )
            breadcrumb.push(
                <li key="b-year" className="breadcrumb-item active" aria-current="page">{this.props.match.params.year}</li>
            )
        }
        return (
            <div className="NewDocScreen">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb custom-breadcrumb">
                                    <li key="b-home" className="breadcrumb-item"><Link to="/">Inicio</Link></li>
                                    {breadcrumb}
                                </ol>
                            </nav>
                        </div>
                    </div>

                    {this.props.match.params.year === undefined && this.state.years.length > 0 &&
                        this.state.years.map(year => 
                            <div key={year} className="row" style={{marginTop: '1rem'}}>
                                <Folder 
                                    label={year}
                                    onClickHandler={this.handleFolderClick}
                                />
                            </div>
                        )
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