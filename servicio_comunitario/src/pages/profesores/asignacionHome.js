import React, { useState, useEffect, useContext } from "react";
import firebase from "firebase/app";
import TableComponent from "../../components/table";
import { Col, Row, Alert, Button } from "react-bootstrap";
import { EliminarAsignacion } from "../../components/eliminarAsignacion";
import { ProfesorCreacion } from "../../components/ProfesorCreacion";
import { ModificarProfesor } from "../../components/modificarProfesor";
import { FilesDialog } from "../../components/FilesDialog";
import { CrearAsignacion } from "../../components/CrearAsignacion";
import SidebarProfesores from "../../components/SidebarProfesores";
import { useHistory } from "react-router-dom";

const AsignacionHome = () => {
  const db = firebase.firestore();
  const history = useHistory();
  const [asignaciones, setAsig] = useState(null);

  const datosUser = JSON.parse(localStorage.getItem("datosUser"));
  const [user, setUser] = useState(datosUser ? datosUser : { rolSC: "" });

  // const handleLogout = () => {
  //   firebase.auth().signOut();
  // };

  useEffect(() => {
    (async () => {
      db.collection("asignaciones").where("profesor_user", "==", `${user.userSC}`).where("curso", "==", `${user.cursoSC}`)
        .get()
        .then((snapshot) => {
          const asignaciones = [];
          snapshot.forEach((doc) => {
            const data = doc.data();
            asignaciones.push({
              id: doc.id,
              ...data,
            });
          });
          setAsig(asignaciones);
          console.log(user.cursoSC);
        })
        .catch((error) => console.log(error));
    })();
  }, []);

  const columns = [
    {
      title: "Asignacion",
      field: "nombre_asignacion",
      headerStyle: {
            backgroundColor: 'gray',
            color: 'white'
          },
    },
    {
      title: "Curso",
      field: "curso",
      headerStyle: {
        backgroundColor: 'gray',
        color: 'white'
      },
    },
    {
      title: "Descripcion",
      field: "descripcion",
      headerStyle: {
        backgroundColor: 'gray',
        color: 'white'
      },
      cellStyle: {
        //maxLenght:50
      }
    },
    {
      title: "Fecha Inicio",
      field: "fecha_inicio",
      headerStyle: {
        backgroundColor: 'gray',
        color: 'white'
      },
    },
    {
      title: "Fecha Fin",
      field: "fecha_fin",
      headerStyle: {
        backgroundColor: 'gray',
        color: 'white'
      },
    },
    {
      title: "Descargar",
      render: (rowData) => <FilesDialog data={rowData} />,
      headerStyle: {
        backgroundColor: 'gray',
        color: 'white'
      },
    },
    {
      title: "Eliminar",
      render: (rowData) => <EliminarAsignacion data={rowData} />,
      headerStyle: {
        backgroundColor: 'gray',
        color: 'white'
      },
    },
    {
      title: "Modificar",
      render: (rowData) => <ModificarProfesor data={rowData} />,
      headerStyle: {
        backgroundColor: 'gray',
        color: 'white'
      },
    },
  ];

  if (user.rolSC == "profesor") {
    return (
      <div>
        <Row>
          <Col xs={2}>
            <SidebarProfesores />
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
                <h1>Tabla de Asignaciones</h1>
              </div>
              <br />
              <section
                style={{ paddingRight: 20,  }}
                className="md:container mx-auto"
              >
                <TableComponent
                  columns={columns}
                  data={asignaciones ? asignaciones : []}
                />
              </section>
              <br />
              <CrearAsignacion data={asignaciones} />
            </div>
          </Col>
        </Row>
      </div>
    );
  } else {
    return (
      <div style={{ marginTop: 100, paddingInline: 200 }}>
        <Alert variant="warning">
          <Alert.Heading>Error: Vuelva a iniciar sesion.</Alert.Heading>
          <hr />
          <div className="d-flex justify-content-start mt-5">
            <Button
              onClick={() => history.replace("/login")}
              variant="outline-info"
            >
              Iniciar sesion
            </Button>
          </div>
        </Alert>
      </div>
    );
  }
};

export default AsignacionHome;
