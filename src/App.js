import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import logo from './logo.svg';
import './App.css';
import HomeWithAuth from './Home.js';

const Loader = () => (
    <div className="showbox">
        <div className="loader">
            <svg className="circular" viewBox="25 25 50 50">
            <circle className="path" cx="50" cy="50" r="20" fill="none" strokeWidth="2" strokeMiterlimit="10"/>
            </svg>
        </div>
    </div>
);

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
            <React.Fragment>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnVisibilityChange
                    draggable
                    pauseOnHover={false}
                />
                <HomeWithAuth 
                    logIn={this.logIn} 
                    isLoggedIn={this.state.isLoggedIn}
                />
            </React.Fragment>
        );
    }

    logIn() {
        this.setState({
            isLoggedIn: true,
        });
    }
}

export {App, Loader};
