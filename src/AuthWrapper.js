import React, { Component } from 'react';

function AuthWrapper(WrappedComponent) {
    return class extends Component {
        handleSubmit(event) {
            event.preventDefault();
            this.props.logIn();
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
                                <label htmlFor="exampleInputEmail1">Usuario:</label>
                                <input 
                                    type="email" 
                                    className="form-control" 
                                    id="exampleInputEmail1" 
                                    aria-describedby="emailHelp" 
                                    placeholder="Nombre de usuario"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Contraseña:</label>
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    id="exampleInputPassword1" 
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