import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import firebase from "firebase/app";
import TableComponent from "../../components/table";
import { ResponderAsignacion } from "../../components/responderAsignacion";

import SidebarEstudiantes from "../../components/SidebarEstudiantes";
import { Col, Row, Alert, Button } from "react-bootstrap";
import { FilesDialog } from "../../components/FilesDialog";
import { DescriptionDialog } from "../../components/DescriptionDialog";
import Loading from "../../components/Loading";

const BoletasHomeEstudiantes = () => {
  const db = firebase.firestore();
  const history = useHistory();
  const [boletas, setBoletas] = useState(null);

  const datosUser = JSON.parse(localStorage.getItem("datosUser"));
  const [user, setUser] = useState(datosUser ? datosUser : { rolSC: "" });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      db.collection("boletas")
        .where("user_estudiante", "==", `${user.userSC}`)
        .where("curso", "==", `${user.cursoSC}`)
        .get()
        .then((snapshot) => {
          const boletas = [];
          snapshot.forEach((doc) => {
            const data = doc.data();
            boletas.push({
              id: doc.id,
              ...data,
            });
          });
          setBoletas(boletas);
          setIsLoading(false);
        })
        .catch((error) => console.log(error));
      
    })();
  }, []);

  const columns = [
    {
      title: "Lapso",
      field: "lapso",
      headerStyle: {
        backgroundColor: "#00BFFF",
        fontSize:16,
        fontWeight: 'bold'
      },
    },
    {
      title: "Comentarios",
      render: (rowData) => <DescriptionDialog data={rowData} />,
      field: "comentario",
      headerStyle: {
        backgroundColor: "#00BFFF",
        fontSize:16,
        fontWeight: 'bold'
      },
    },
    {
      title: "Descargar",
      render: (rowData) => <FilesDialog data={rowData} />,
      headerStyle: {
        backgroundColor: "#00BFFF",
        maxWidth: 20,
        fontSize:16,
        fontWeight: 'bold'
      },
    },
  ];

  if (user.rolSC == "estudiante") {
    return (
      <div className="h-screen overflow-hidden">
        <main className="flex">
          <Row>
            <Col xs={2}>
              <SidebarEstudiantes />
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
                  marginLeft: 50,
                  height: "50vh",
                  width: "60vw",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 50,
                }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <h1>Boletas</h1>
                </div>
                <br />
                <section
                  style={{ paddingRight: 20 }}
                  className="md:container mx-auto"
                >
                  {isLoading && <Loading />}
                  <TableComponent
                    columns={columns}
                    data={boletas ? boletas : []}
                  />
                </section>
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

export default BoletasHomeEstudiantes;
