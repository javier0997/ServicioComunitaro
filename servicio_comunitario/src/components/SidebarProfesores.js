import React, { useEffect, useContext } from "react";
import "../css/Header.css";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../assets/sj.png";
import { Link } from "react-router-dom";
import firebase from "firebase/app";
import { Auth } from "../context/auth";
import { useHistory } from "react-router-dom";

function SidebarProfesores() {


  const handleLogout = () => {
   
  };

  return (
    <div
      className="Sidebar bg-secondary"
      style={{ height: "100vh", width: 240 }}
    >
      <div
        style={{
          paddingTop: 20,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src={logo} alt="Logo" width="100" />
      </div>

      <div
        style={{
          paddingTop: 30,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Link className="nav-link " to="/profesores">
        <button type="button" class="btn btn-outline-primary " aria-pressed="true">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width:100
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="white"
              class="bi bi-file-earmark-plus"
              viewBox="0 0 16 16"
            >
              <path d="M8 6.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 .5-.5z" />
              <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z" />
            </svg>
          </div>
          <h6 style={{ paddingTop: 15 }} className="text-white">
            Asignaciones
          </h6>
          </button>
        </Link>
      </div>

      <div
        style={{
          paddingTop: 10,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Link className="nav-link " to="/profesores/estudientas">
        <button type="button" class="btn btn-outline-primary  " aria-pressed="true" >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width:100
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="white"
              class="bi bi-card-checklist"
              viewBox="0 0 16 16"
            >
              <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z" />
              <path d="M7 5.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0zM7 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0z" />
            </svg>
          </div>
          <h6 style={{ paddingTop: 15 }} className="text-white">
            Boletas
          </h6>
          </button>
        </Link>
      </div>

      <div
        style={{
          paddingTop: 200,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <button type="button" class="btn btn-outline-danger" onClick={handleLogout}>
          <div 
          style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width:100
            }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="white"
              class="bi bi-power"
              viewBox="0 0 16 16"
            >
              <path d="M7.5 1v7h1V1h-1z" />
              <path d="M3 8.812a4.999 4.999 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812z" />
            </svg>
          </div>
          <p style={{ paddingTop: 15 }} className="text-white">
            Cerrar Sesion
          </p>
        </button>
      </div>
    </div>
  );
}

export default SidebarProfesores;
