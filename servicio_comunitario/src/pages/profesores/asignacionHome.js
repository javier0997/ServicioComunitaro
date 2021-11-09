import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import firebase from "firebase/app";
import TableComponent from "../../components/table";
import { Auth } from "../../context/auth";

import Sidebar from "../../components/Sidebar";
import { Col, Row } from "react-bootstrap";
import { EliminarProfesor } from "../../components/eliminarProfesor";
import { ProfesorCreacion } from "../../components/ProfesorCreacion";
import { ModificarProfesor } from "../../components/modificarProfesor";

const AsignacionHome = () => {
  const db = firebase.firestore();
  const storage = firebase.storage();
  const { user } = useContext(Auth);
  const history = useHistory();
  const [profesores, setProfeores] = useState(null);

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
      db.collection("profesores")
        .get()
        .then((snapshot) => {
          const profesores = [];
          snapshot.forEach((doc) => {
            const data = doc.data();
            profesores.push({
              id: doc.id,
              ...data,
            });
          });
          setProfeores(profesores);
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
      title: "Seccion",
      field: "Seccion",
    },
    {
      title: "Cedula",
      field: "Cedula",
    },
    {
      title: "Eliminar",
      render: (rowData) => <EliminarProfesor data={rowData} />,
    },
    {
      title: "Modificar",
      render: (rowData) => <ModificarProfesor data={rowData} />,
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
              <h1> Tabla de Profesores</h1>
            </div>
            <br />
            <section
              style={{ paddingRight: 20 }}
              className="md:container mx-auto"
            >
              <TableComponent
                columns={columns}
                data={profesores ? profesores : []}
              />
            </section>
          </div>
          <br />
          <div>
            <ProfesorCreacion />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default AsignacionHome;
