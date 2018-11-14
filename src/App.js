import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

// import logo from './logo.svg';
import './App.css';
import HomeWithAuth from './Home.js';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: true,
        };
        this.logIn = this.logIn.bind(this);
    }

    render() {
        return (
            <HomeWithAuth 
                logIn={this.logIn} 
                isLoggedIn={this.state.isLoggedIn}
            />
        );
    }

    logIn() {
        this.setState({
            isLoggedIn: true,
        });
    }
}

export default App;
