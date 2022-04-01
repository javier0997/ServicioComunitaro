import React, { useState, useEffect, useContext } from "react";
import firebase from "firebase/app";
import TableComponent from "./table";
import { Col, Row, Alert, Button } from "react-bootstrap";
import { EliminarBoleta } from "./eliminarBoleta";
import { FilesDialog } from "./FilesDialog";
import { DescriptionDialog } from "./DescriptionDialog";
import { CrearBoletas } from "./CrearBoletas";
import { useHistory } from "react-router-dom";
import Loading from "./Loading";

const TablaPrimerLapso = () => {
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
        .where("curso", "==", `${user.cursoSC}`)
        .where("lapso", "==", "Primer Lapso")
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
      title: "Estudiante",
      field: "estudiante_nombre",
      headerStyle: {
        backgroundColor: "gray",
        color: "white",
      },
    },
    {
      title: "Comentario",
      render: (rowData) => <DescriptionDialog data={rowData} boleta={true} />,
      field: "comentario",
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
      render: (rowData) => <EliminarBoleta data={rowData} />,
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
                width: "60vw",
              }}
            >
              <h1>Tabla de Boleta Primer Lapso</h1>
            </div>

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
            <section
              style={{ paddingRight: 20 }}
              className="md:container mx-auto"
            >
              <TableComponent
                columns={columns}
                data={boletas ? boletas : []}
              />
              <br />
            <div className="md:container md:mx-auto">
              <CrearBoletas lapso={"Primer Lapso"} />
            </div>
            </section>
              }
            
            
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

export default TablaPrimerLapso;
