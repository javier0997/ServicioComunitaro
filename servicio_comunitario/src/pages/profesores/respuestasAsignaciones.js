import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import TableComponent from "../../components/table";
import { Col, Row, Alert, Button } from "react-bootstrap";
import { FilesDialog } from "../../components/FilesDialog";
import SidebarProfesores from "../../components/SidebarProfesores";
import { useHistory } from "react-router-dom";
import Loading from "../../components/Loading";


const RespuestasAsignaciones = (props) => {
    
  const db = firebase.firestore();
  const history = useHistory();

  const [filtro, setFiltro] = useState(props.name);
    
  const [asignaciones, setAsig] = useState(null);
  const datosUser = JSON.parse(localStorage.getItem("datosUser"));
  const [user, setUser] = useState(datosUser ? datosUser : { rolSC: "" });
  const [isLoading, setIsLoading] = useState(false);
 

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      db.collection("respuesta_asignaciones")
        .where("nombre_asignacion", "==", `${filtro}`)
        .where("user_profesor", "==", `${user.userSC}`)
        .where("curso", "==", `${user.cursoSC}`)
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
          setIsLoading(false);
        })
        .catch((error) => console.log(error));
    })();
  }, []);

  const columns = [
    {
      title: "Asignacion",
      field: "nombre_asignacion",
      headerStyle: {
        backgroundColor: "gray",
        color: "white",
      },
    },
    {
      title: "Nombre del Estudiante",
      field: "nombre_estudiante",
      headerStyle: {
        backgroundColor: "gray",
        color: "white",
      },
    },
    {
      title: "Fecha de Respuesta",
      field: "fecha_respuesta",
      headerStyle: {
        backgroundColor: "gray",
        color: "white",
      },
    },
    {
      title: "Descargar",
      render: (rowData) => <FilesDialog data={rowData} respuesta={true} />,
      headerStyle: {
        backgroundColor: "gray",
        color: "white",
      },
    },
  ];

  if (user.rolSC == "profesor") {
    return (
      <div className="h-screen overflow-hidden">
        <main className="flex">
          <Row>
            <Col xs={2}>
              <SidebarProfesores />
            </Col>

            <Col>
            {isLoading?
                  <>
                  <div style={{
                  marginTop: 50,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                  >
                  <Loading />
                  </div>
                  </> 
                :
              <div 
              style={{
                  height: "50vh",
                  width: "65vw",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 20,
                }}>
                <br />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <h1>Respuestas Asignacion</h1>
                </div>

                <br />
                <section
                  style={{ }}
                  className="md:container mx-auto"
                >
                  <TableComponent
                    columns={columns}
                    data={asignaciones ? asignaciones : []}
                  />
                </section>
                <br />
              </div>
             }
            </Col>
          </Row>
        </main>
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

export default RespuestasAsignaciones;
