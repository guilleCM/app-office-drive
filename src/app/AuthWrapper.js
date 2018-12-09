import React, { Component } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setDate(date.getDate() + days);
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
function eraseCookie(name) {   
    document.cookie = name+'=; Max-Age=-99999999;';  
}

function AuthWrapper(WrappedComponent) {
    return class extends Component {
        handleSubmit(event) {
            event.preventDefault();
            document.getElementById('App-Loader').style.display = 'block';
            let username = document.getElementById('username').value;
            let password = document.getElementById('password').value;
            let dataToSend = {
                'username': username,
                'password': password,
            };
            // let jsonData = JSON.stringify(dataToSend);
            axios.post('/users/login', dataToSend)
                .then((res) => {
                    console.log(res)
                    document.getElementById('App-Loader').style.display = 'none';
                    if (res.status === 200 && res.data.status === 'ok') {
                        setCookie('access_token', res.data.access_token, 5000);
                        setCookie('refresh_token', res.data.refresh_token, 5000);
                        setCookie('user_data', res.data.user_data, 5000);
                        toast.success('Login correcto!');
                        this.props.logIn(
                            res.data.user_data,
                            res.data.access_token,
                            res.data.refresh_token,
                        );
                    }
                    else {
                        toast.error('Las credenciales no son válidas!');
                    }
                })
        }
        componentDidMount() {
            let user_data = getCookie('user_data');
            let access_token = getCookie('access_token');
            let refresh_token = getCookie('refresh_token');
            if (user_data && access_token && refresh_token) {
                this.props.logIn(
                    user_data,
                    access_token,
                    refresh_token
                )
            }
        }
        render() {
            if (this.props.isLoggedIn) {
                return <WrappedComponent {...this.props} />
            }
            return (
                <div className="App">
                    <header className="App-header">
                        <form onSubmit={(e) => this.handleSubmit(e)}>
                            <div className="form-group">
                                <label htmlFor="username">Usuario:</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="username" 
                                    aria-describedby="emailHelp" 
                                    placeholder="Nombre de usuario"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Contraseña:</label>
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    id="password" 
                                    placeholder="Contraseña"
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">Iniciar sesión</button>
                        </form>
                    </header>
                </div>
            )
        }
    }
}

export default AuthWrapper;