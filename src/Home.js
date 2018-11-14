import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import './Home.css';
import AuthWrapper from './AuthWrapper.js';
import NewDocScreen from './NewDocScreen.js';

class Index extends Component {
    render() {
        return (
            <div className="Home">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <h1>Bienvenido</h1>
                            <h3>¿Qué deseas hacer?</h3>

                            <Link to="/new-doc/" className="btn btn-primary btn-lg btn-block">
                                Nueva factura
                            </Link>

                            <Link to="/drive/" className="btn btn-secondary btn-lg btn-block">
                                Consultar facturas
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
                    <Route path="/new-doc/" component={NewDocScreen} />
                    {/* <Route path="/users/" component={Users} /> */}
                </Switch>
            </Router>
        )
    }
}

const HomeWithAuth = AuthWrapper(Home);

export default HomeWithAuth;