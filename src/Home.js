import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import './Home.css';
import AuthWrapper from './AuthWrapper.js';
import NewDocScreen from './NewDocScreen.js';
import DriveScreen from './DriveScreen.js';

class Index extends Component {
    render() {
        return (
            <div className="Home">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <h1>Bienvenido</h1>
                            <h3>¿Qué deseas hacer?</h3>

                            <Link to="/docs/" className="btn btn-primary btn-lg btn-block">
                                Nuevo documento
                            </Link>

                            <Link to="/drive/" className="btn btn-secondary btn-lg btn-block">
                                Consultar documentos
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

class Home extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/" exact component={Index} />
                    <Route path="/docs/" component={NewDocScreen} />
                    <Route path="/drive/" component={DriveScreen} />
                </Switch>
            </Router>
        )
    }
}

const HomeWithAuth = AuthWrapper(Home);

export default HomeWithAuth;