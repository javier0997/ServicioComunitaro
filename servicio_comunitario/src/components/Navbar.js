import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/Header.css';
import logo from '../assets/sj.png';

class Navbar extends Component {
    constructor() {
        super();
        this.state={
            show: true,
        }
        
    }
    
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid ">
                    
                     <Link className="nav-link active" to='/inicio'>
                         <img src={logo} alt="Logo" width="50" />
                     </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"
                           onClick={()=>{this.setState({show: !this.state.show})}}>
                         <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className={this.state.show ? 'collapse navbar-collapse ' : 'collapse navbar-collapse active '} >
                        <ul className="navbar-nav mx-auto">
                            <li className="nav-item mx-2">
                                 <Link className="nav-link " to='/inicio'>Home</Link>
                            </li>
                            <li className="nav-item mx-2">
                                 <Link className="nav-link " to='/nosotros'>Nosotros</Link>
                            </li>
                            <li className="nav-item mx-2">
                                 <Link className="nav-link " to='/contactos'>Contáctanos</Link>
                            </li>
                        </ul>
                        <button type="button" className="btn btn-outline-success me-2">Iniciar Sesion</button> 
                    </div>
                    
                </div>
                </nav>
            </div>
        );
    }
}

export default Navbar;