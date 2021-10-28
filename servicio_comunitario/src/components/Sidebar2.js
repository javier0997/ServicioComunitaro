import React, { Component } from 'react'
import "../css/Header.css";
import { Link } from "react-router-dom";


function Sidebar2(){

        return (
            <div className="Sidebar">
                <nav className="navbar">
               <ul style={{}}>
                    <li onClick={()=>{window.location.pathname = '/inicio'}}>
                    <Link className="nav-link " to="/inicio">
                    <h5 className="text-white">Sidebar 2</h5>
                  </Link>
                    </li>
               </ul>
              </nav>
            </div>
        )
    
}

export default Sidebar2;
