import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../css/Header.css";
import logo from "../assets/sj.png";

class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      show: true,
    };
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid ">
            <Link className="nav-link active" to="/inicio">
              <img src={logo} alt="Logo" width="50" />
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
              onClick={() => {
                this.setState({ show: !this.state.show });
              }}
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className={
                this.state.show
                  ? "collapse navbar-collapse "
                  : "collapse navbar-collapse active "
              }
            >
              <ul className="navbar-nav mx-auto">
                <li className="nav-item mx-2">
                  <Link className="nav-link " to="/inicio">
                    <h5>Inicio</h5>
                  </Link>
                </li>
                <li className="nav-item mx-2">
                  <Link className="nav-link " to="/nosotros">
                    <h5>Nosotros</h5>
                  </Link>
                </li>
                <li className="nav-item mx-2">
                  <Link className="nav-link " to="/contactos">
                    <h5>Contáctanos</h5>
                  </Link>
                </li>
              </ul>
              <button  className="btn btn-outline-success ">
                <Link className="nav-link "  to="/login">
                  <text style={{color:'gray', fontSize:20}}>
                  Inicio de sesion

                  </text>
                </Link>
              </button>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
