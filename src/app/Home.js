import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import './Home.css';
import AuthWrapper from './AuthWrapper.js';
import NewDocScreen from './../docs/NewDocScreen.js';
import DriveScreen from './../drive/DriveScreen.js';

class Index extends Component {
    render() {
        return (
            <div className="Home">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <h1 style={{marginTop: '1rem'}}>Bienvenido</h1>
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
        const auth = {...this.props};
        return (
            <Router>
                <Switch>
                    <Route exact path="/" render={(props) => (<Index {...props} auth={auth}/>)} />
                    <Route exact path="/docs/" render={(props) => (<NewDocScreen {...props} auth={auth}/>)} />
                    <Route exact path="/docs/:doc_id" render={(props) => (<NewDocScreen {...props} auth={auth}/>)} />
                    <Route exact path="/drive/" render={(props) => (<DriveScreen {...props} auth={auth}/>)} />
                    <Route exact path="/drive/folder/:year" render={(props) => (<DriveScreen {...props} auth={auth}/>)} />
                    {/* <Route component={NoMatch}/> */}
                </Switch>
            </Router>
        )
    }
}

const HomeWithAuth = AuthWrapper(Home);

export default HomeWithAuth;