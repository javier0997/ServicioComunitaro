import React, { useState, useEffect, useContext } from "react";
import firebase from "firebase/app";
import TableComponent from "./table";
import { Col, Row, Alert, Button } from "react-bootstrap";
import { EliminarAsignacion } from "./eliminarAsignacion";
import { ModificarProfesor } from "./modificarProfesor";
import { FilesDialog } from "./FilesDialog";
import { DescriptionDialog } from "./DescriptionDialog";
import { CrearBoletas } from "./CrearBoletas";
import SidebarProfesores from "./SidebarProfesores";
import { useHistory } from "react-router-dom";
import Loading from "./Loading";

const TablaTercerLapso = () => {
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
      title: "Estudiante",
      field: "nombre_asignacion",
      headerStyle: {
        backgroundColor: "gray",
        color: "white",
      },
    },
    {
      title: "Comentario",
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
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <h1>Tabla de Boleta Tercer Lapso</h1>
            </div>

            <br />
            <section
              style={{ paddingRight: 20 }}
              className="md:container mx-auto"
            >
              {isLoading && <Loading />}
              <TableComponent
                columns={columns}
                data={asignaciones ? asignaciones : []}
              />
            </section>
            <br />
            <div className="md:container md:mx-auto">
              <CrearBoletas data={asignaciones} />
            </div>
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

export default TablaTercerLapso;
