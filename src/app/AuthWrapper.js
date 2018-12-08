import React, { Component } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

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
                        // that.props.history.push('/docs/'+res.data.id);
                        toast.success('Login correcto!');
                        this.props.logIn(
                            res.data.user_data,
                            res.data.access_token,
                            res.data.refresh_token,
                        );
                        // that.props.history.push('/');
                    }
                    else {
                        toast.error('Las credenciales no son válidas!');
                    }
                })
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