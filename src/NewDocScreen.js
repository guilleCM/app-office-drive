import React, { Component } from 'react';

import './NewDocScreen.css';

class NewDocScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: {},
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    render() {
        const today = new Date();
        return (
            <div className="NewDocScreen">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <h1>Nueva factura</h1>
                        </div>
                        <div className="col-12">
                            <form onSubmit={(e) => this.handleSubmit(e)}>

                                <div className="card" style={{marginBottom: '1rem'}}>
                                    <div className="card-body">
                                        <h6 className="card-subtitle mb-2 text-muted">Presupuesto nº <b>100</b> de <b>{today.getFullYear()}</b></h6>
                                        <h6 style={{marginBottom: 0}} className="card-subtitle text-muted">Fecha: <b>{today.toLocaleDateString()}</b></h6>
                                    </div>
                                </div>

                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">DATOS CLIENTE:</h5>
                                        <div className="form-group">
                                            <label htmlFor="client_name">Nombre:</label>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                id="client_name" 
                                                placeholder="Nombre de la persona o empresa"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="client_address">Dirección:</label>
                                            <input 
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
                                                type="text" 
                                                className="form-control" 
                                                id="client_address" 
                                                placeholder=""
                                            />
                                        </div>
                                    </div>
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
    }
}

export default NewDocScreen;