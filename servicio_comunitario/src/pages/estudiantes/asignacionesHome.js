import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import firebase from "firebase/app";
import TableComponent from "../../components/table";
import { Auth } from "../../context/auth";

import Sidebar from "../../components/Sidebar";
import { Col, Row } from "react-bootstrap";
import { EstudianteCreacion } from "../../components/EstudianteCreacion";

const EstudiantesHome = () => {
  const db = firebase.firestore();
  const storage = firebase.storage();
  const { user } = useContext(Auth);
  const history = useHistory();
  const [estudiantes, setEstudiantes] = useState(null);

  useEffect(() => {
    if (!user) {
      history.replace("/login");
    }
  }, [user, history]);

  const handleLogout = () => {
    firebase.auth().signOut();
  };

  useEffect(() => {
    (async () => {
      db.collection("estudiantes")
        .get()
        .then((snapshot) => {
          const estudiantes = [];
          snapshot.forEach((doc) => {
            const data = doc.data();
            estudiantes.push({
              id: doc.id,
              ...data,
            });
          });
          setEstudiantes(estudiantes);
        })
        .catch((error) => console.log(error));
    })();
  }, []);

  const columns = [
    {
      title: "Nombre",
      field: "Nombre",
    },
    {
      title: "Apellido",
      field: "Apellido",
    },
    {
      title: "Telefono",
      field: "Telefono",
    },
    {
      title: "Email",
      field: "email",
    },
    {
      title: "Curso",
      field: "Curso",
    },
    {
      title: "Fecha de Nacimiento",
      field: "Feca_de_Nacimiento",
    },
  ];

  return (
    <div>
      <Row>
        <Col xs={2}>
          <Sidebar />
        </Col>

        <Col>
          <div>
            <br />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <h1> Tabla de Estudiantes</h1>
            </div>
            <br />
            <section
              style={{ paddingRight: 20 }}
              className="md:container mx-auto"
            >
              <TableComponent
                columns={columns}
                data={estudiantes ? estudiantes : []}
              />
            </section>
          </div>
          <br />
          <div>
            <EstudianteCreacion />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default EstudiantesHome;
