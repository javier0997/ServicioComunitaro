import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid ">
                     <Link className="nav-link active" to='/inicio'>
                         <img src='./././assets/sj.png' />
                     </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                         <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                 <Link className="nav-link active" to='/inicio'>Home</Link>
                            </li>
                            <li className="nav-item">
                                 <Link className="nav-link " to='/nosotros'>Nosotros</Link>
                            </li>
                            <li className="nav-item">
                                 <Link className="nav-link " to='/contactos'>Contáctanos</Link>
                            </li>
                        </ul>
                    </div>
                    <button type="button" className="btn btn-success">Iniciar Sesion</button>
                </div>
                </nav>
            </div>
        );
    }
}

export default Navbar;