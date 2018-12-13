import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { toast } from 'react-toastify';

import './NewDocScreen.css';

class ConceptsTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            concepts: [],
            newConceptForm: false,
        };
        this.openNewConceptForm = this.openNewConceptForm.bind(this);
        this.closeNewConceptForm = this.closeNewConceptForm.bind(this);
        this.addNewConcept = this.addNewConcept.bind(this);
        this.removeConcept = this.removeConcept.bind(this);

        this.descriptionInputRef = React.createRef();
        this.costInputRef = React.createRef();
    }    
    render() {
        let totalCost = this.state.concepts.length > 0 ? this.state.concepts.reduce((a, b) => {return {cost: a.cost + b.cost}}).cost : 0;
        return (
            <React.Fragment>
                <div className="ConceptsTable">
                    <div className="cp-table">
                        <div className="cp-thead">
                            <div className="cp-tr">
                                <div className="cp-th" style={{minWidth: '70%'}}>
                                    Concepto
                                </div>
                                <div className="cp-th">
                                    Importe
                                </div>
                            </div>
                        </div>
                        <div className="cp-tbody">
                            {this.state.concepts.map((concept, index) => {
                                return(
                                    <div key={index} className="cp-tr-group">
                                        <div className="cp-tr">
                                            <div className="cp-td" style={{minWidth: '70%'}}>
                                                <div 
                                                    onClick={() => this.removeConcept(index)} 
                                                    className="btn btn-sm btn-danger btn-cp-tr-remove" 
                                                    title="Borrar concepto"
                                                >
                                                    <i className="fas fa-trash"/>
                                                </div>
                                                <p style={{whiteSpace: 'pre-wrap', marginBottom: 0, textIndent: 32}}>
                                                    {concept.description}
                                                </p>
                                            </div>
                                            <div className="cp-td" style={{margin: 'auto', textAlign: 'center'}}>
                                                <span>{concept.cost} €</span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                            {this.state.newConceptForm &&
                                <div className="cp-tr-group">
                                    <div className="cp-tr">
                                        <div className="cp-td" style={{minWidth: '70%'}}>
                                            <input ref={this.descriptionInputRef} type="text" className="form-control" placeholder="Escribir una descripción..."/>
                                        </div>
                                        <div className="cp-td">
                                            <input ref={this.costInputRef} type="number" className="form-control" placeholder="Valor..."/>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                {!this.state.newConceptForm &&
                    <button 
                        style={{marginTop: 10}} 
                        className="btn btn-dark btn-block"
                        onClick={this.openNewConceptForm}
                    >
                        Añadir nuevo concepto
                    </button>
                }
                {this.state.newConceptForm &&
                    <React.Fragment>
                        <button 
                            style={{marginTop: 10}} 
                            className="btn btn-dark col-5"
                            onClick={this.addNewConcept}
                        >
                            Añadir
                        </button>  
                        <button 
                            style={{marginTop: 10}} 
                            className="btn btn-danger col-5 offset-2"
                            onClick={this.closeNewConceptForm}
                        >
                            Cancelar
                        </button> 
                    </React.Fragment>
                }
                {this.state.concepts.length > 0 && 
                    <div style={{textAlign: 'right', marginTop: '1rem'}}>
                        <label>Resumen:</label>
                        <ul style={{listStyle: 'none', marginBottom: 0}}>
                            <li>Importe Trabajo: <b>{totalCost.toFixed(2)}</b> €</li>
                            <li>21% de IVA: <b>{(totalCost * 0.21).toFixed(2)}</b> €</li>
                            <li>TOTAL: <b>{((totalCost * 0.21) + totalCost).toFixed(2)}</b> €</li>
                        </ul>
                    </div>
                }
            </React.Fragment>
        )
    }
    openNewConceptForm() {
        this.setState({
            newConceptForm: true,
        })
    }
    closeNewConceptForm() {
        this.setState({
            newConceptForm: false,
        })
    }
    addNewConcept() {
        let concepts = [...this.state.concepts];
        let concept = {
            "description": this.descriptionInputRef.current.value,
            "cost": this.costInputRef.current.value*1,
        }
        concepts.push(concept)
        this.setState({
            concepts: concepts,
            newConceptForm: false,
        })
    }
    removeConcept(index) {
        let concepts = [...this.state.concepts];
        concepts.splice(index, 1);
        this.setState({
            concepts: concepts,
        })
    }
}

class DocumentCount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: null
        }
    }
    componentDidMount() {
        let config = {
            headers: {
                Authorization: 'Bearer ' + this.props.auth.access_token,
            }
        }
        axios.get('/docs/CountByYear?year='+this.props.year, config)
        .then((res) => {
            this.setState({
                count: res.data.count+1
            })
        })
    }
    render() {
        return (
            <span>
                {this.state.count !== null ? this.state.count : <i className="fas fa-spinner fa-spin"/>}
            </span>
        )
    }
}

class NewDocScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: {},
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.sendData = this.sendData.bind(this);

        this.conceptsTableRef = React.createRef();
    }
    render() {
        const today = new Date();
        return (
            <div className="NewDocScreen">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2">
                            <h2>Nuevo documento</h2>
                        </div>
                        <div className="form-wrapper col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2" style={{paddingBottom: '2rem'}}>
                            <form onSubmit={(e) => this.handleSubmit(e)}>

                                <div className="card" style={{marginBottom: '1rem'}}>
                                    <div className="card-body">
                                        <h6 className="card-subtitle mb-2 text-muted">
                                            Presupuesto nº <b><DocumentCount auth={this.props.auth} year={today.getFullYear()}/></b> de <b>{today.getFullYear()}</b>
                                        </h6>
                                        <h6 style={{marginBottom: 0}} className="card-subtitle text-muted">Fecha: <b>{today.toLocaleDateString()}</b></h6>
                                    </div>
                                </div>

                                <div className="card" style={{marginBottom: '1rem'}}>
                                    <div className="card-body">
                                        <h5 className="card-title">DATOS CLIENTE:</h5>
                                        <div className="form-group">
                                            <label htmlFor="client_name">Nombre:</label>
                                            <input 
                                                required
                                                type="text" 
                                                className="form-control" 
                                                id="client_name" 
                                                placeholder="Nombre de la persona o empresa"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="client_address">Dirección:</label>
                                            <input 
                                                required
                                                type="text" 
                                                className="form-control" 
                                                id="client_address" 
                                                placeholder="C/ ..."
                                            />
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group col-12 col-sm-2">
                                                <label htmlFor="client_zip_code">CP:</label>
                                                <input 
                                                    required
                                                    pattern="[0-9]{5}"
                                                    type="text" 
                                                    maxLength={5}
                                                    className="form-control" 
                                                    id="client_zip_code" 
                                                    placeholder="XXXXX"
                                                />
                                            </div>
                                            <div className="form-group col-12 col-sm-10">
                                                <label htmlFor="client_city">Ciudad:</label>
                                                <input 
                                                    required
                                                    type="text" 
                                                    className="form-control" 
                                                    id="client_city" 
                                                    placeholder="Por ejemplo Palma"
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="client_cif">CIF:</label>
                                            <input
                                                required
                                                type="text" 
                                                className="form-control" 
                                                id="client_cif" 
                                                placeholder=""
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="card" style={{marginBottom: '1rem'}}>
                                    <div className="card-body">
                                        <h5 className="card-title">DATOS FACTURA:</h5>
                                        <div className="form-group">
                                            <label htmlFor="doc_type">Tipo:</label>
                                            <select id="doc_type" className="form-control">
                                                <option value="work">Obra</option>
                                                <option value="serv">Servicio</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="doc_type_description">Descripción:</label>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                id="doc_type_description" 
                                                placeholder="Descripción de la obra o servicio"
                                            />
                                        </div>

                                        <label>Conceptos:</label>
                                        <ConceptsTable ref={this.conceptsTableRef} />

                                    </div>
                                </div>
                            <div className="form-wrapper-footer">
                                <button 
                                    style={{marginRight: '1rem'}} 
                                    type="submit" 
                                    className="btn btn-primary"
                                >   
                                    Guardar
                                </button>
                                <Link to="/" className="btn btn-danger">
                                    Cancelar
                                </Link>
                            </div>

                            </form>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
    handleSubmit(event) {
        event.preventDefault();
        document.getElementById('App-Loader').style.display = 'block';
        let totalCost = this.conceptsTableRef.current.state.concepts.length > 0 ? this.conceptsTableRef.current.state.concepts.reduce((a, b) => {return {cost: a.cost + b.cost}}).cost : 0;
        let dataToSend = {
            client_name: document.getElementById('client_name').value,
            client_address: document.getElementById('client_address').value,
            client_zip_code: document.getElementById('client_zip_code').value,
            client_city: document.getElementById('client_city').value,
            client_cif: document.getElementById('client_cif').value,
            doc_type: document.getElementById('doc_type').value,
            doc_type_description: document.getElementById('doc_type_description').value, 
            concepts: this.conceptsTableRef.current.state.concepts,
            concepts_cost: totalCost,
            iva_percent: 0.21,
            iva_cost: totalCost * 0.21,
            total_cost: (totalCost * 0.21) + totalCost,
        }
        let jsonData = JSON.stringify(dataToSend).toLowerCase();
        this.sendData(JSON.parse(jsonData));
    }
    sendData(jsonData) {
        let that = this;
        let config = {
            headers: {
                Authorization: 'Bearer ' + this.props.auth.access_token,
            }
        }
        axios.put('/docs/', jsonData, config)
            .then((res) => {
                console.log(res)
                document.getElementById('App-Loader').style.display = 'none';
                if (res.status === 200 && res.data.status === 'ok') {
                    
                    // that.props.history.push('/docs/'+res.data.id);
                    toast.success('Documento guardado correctamente!');
                    that.props.history.push('/');
                }
                else {
                    toast.error('No se ha podido guardar!');
                }
            })
    }
}

export default NewDocScreen;