import React, { useState, useEffect, useContext } from "react";
import firebase from "firebase/app";
import TableComponent from "../../components/table";
import { Col, Row, Alert, Button } from "react-bootstrap";
import { EliminarAsignacion } from "../../components/eliminarAsignacion";
import { ProfesorCreacion } from "../../components/ProfesorCreacion";
import { ModificarProfesor } from "../../components/modificarProfesor";
import { FilesDialog } from "../../components/FilesDialog";
import { DescriptionDialog } from "../../components/DescriptionDialog";
import { CrearBoletas } from "../../components/CrearBoletas";
import  TablaLapso from "../../components/TablaPrimerLapso";
import  TablasegundoLapso from "../../components/TablaSegundoLapso";
import  TablaTercerLapso from "../../components/TablaTercerLapso";
import SidebarProfesores from "../../components/SidebarProfesores";
import { useHistory } from "react-router-dom";
import Loading from "../../components/Loading";

const BoletasHome = () => {
  const db = firebase.firestore();
  const history = useHistory();
  const [asignaciones, setAsig] = useState(null);

  const datosUser = JSON.parse(localStorage.getItem("datosUser"));
  const [user, setUser] = useState(datosUser ? datosUser : { rolSC: "" });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      db.collection("asignaciones")
        .where("profesor_user", "==", `${user.userSC}`)
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
        })
        .catch((error) => console.log(error));
      setIsLoading(false);
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
      title: "Descripcion",
      render: (rowData) => <DescriptionDialog data={rowData} />,
      field: "descripcion",
      headerStyle: {
        backgroundColor: "gray",
        color: "white",
      },
      cellStyle: {
        //maxLenght:50
      },
    },
    {
      title: "Fecha Inicio",
      field: "fecha_inicio",
      headerStyle: {
        backgroundColor: "gray",
        color: "white",
      },
    },
    {
      title: "Fecha Fin",
      field: "fecha_fin",
      headerStyle: {
        backgroundColor: "gray",
        color: "white",
      },
    },
    {
      title: "Descargar",
      render: (rowData) => <FilesDialog data={rowData} />,
      headerStyle: {
        backgroundColor: "gray",
        color: "white",
      },
    },
    {
      title: "Eliminar",
      render: (rowData) => <EliminarAsignacion data={rowData} />,
      headerStyle: {
        backgroundColor: "gray",
        color: "white",
      },
    },
    {
      title: "Modificar",
      render: (rowData) => <ModificarProfesor data={rowData} />,
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
              <ul
                class="nav nav-tabs justify-content-center"
                id="myTab"
                role="tablist"
              >
                <li class="nav-item" role="presentation">
                  <button
                    class="nav-link active"
                    id="home-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#home"
                    type="button"
                    role="tab"
                    aria-controls="home"
                    aria-selected="true"
                  >
                    Boletas Primer Lapso
                  </button>
                </li>
                <li class="nav-item" role="presentation">
                  <button
                    class="nav-link"
                    id="profile-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#profile"
                    type="button"
                    role="tab"
                    aria-controls="profile"
                    aria-selected="false"
                  >
                    Boletas Segundo Lapso
                  </button>
                </li>
                <li class="nav-item padding-left: 0pt" role="presentation">
                  <button
                    class="nav-link"
                    id="contact-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#contact"
                    type="button"
                    role="tab"
                    aria-controls="contact"
                    aria-selected="false"
                  >
                    Boletas Tercer Lapso
                  </button>
                </li>
              </ul>
              <div
                style={{
                  height: "80vh",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop:20
                }}
                class="tab-content"
                id="myTabContent"
              >
                <div
                  class="tab-pane fade show active"
                  id="home"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                  
                >
                  <TablaLapso />
                </div>
                <div
                  class="tab-pane fade"
                  id="profile"
                  role="tabpanel"
                  aria-labelledby="profile-tab"
                >
                 <TablasegundoLapso/>
                </div>
                <div
                  class="tab-pane fade"
                  id="contact"
                  role="tabpanel"
                  aria-labelledby="contact-tab"
                >
                  <TablaTercerLapso/>
                </div>
              </div>
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

export default BoletasHome;
