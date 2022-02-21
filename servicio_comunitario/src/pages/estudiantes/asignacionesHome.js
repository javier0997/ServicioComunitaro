import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import firebase from "firebase/app";
import TableComponent from "../../components/table";
import { ResponderAsignacion } from "../../components/responderAsignacion";

import SidebarEstudiantes from "../../components/SidebarEstudiantes";
import { Col, Row, Alert, Button } from "react-bootstrap";

const EstudiantesHome = () => {
  const db = firebase.firestore();
  const history = useHistory();
  const [asignaciones, setAsig] = useState(null);

  const datosUser = JSON.parse(localStorage.getItem('datosUser'));
  const [user, setUser] = useState(datosUser ? datosUser : {rolSC: ''} );
  
  


 
  // const handleLogout = () => {
  //   firebase.auth().signOut();
  // };

  useEffect(() => {
    (async () => {
      db.collection("asignaciones").where('curso', '==', `${user.cursoSC}`)
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
    },
    {
      title: "Curso",
      field: "curso",
    },
    {
      title: "Descripcion",
      field: "descripcion",
    },
    {
      title: "Fecha Inicio",
      field: "fecha_inicio",
    },
    {
      title: "Fecha Fin",
      field: "fecha_fin",
    },
    {
      title: "Descargar",
      field: "archivo",
    },
    {
      title: "Reponder",
      render: (rowData) => <ResponderAsignacion data={rowData} />,
    },
  ];

  if(user.rolSC=="estudiante"){
  return (
    
    <div>
      <Row>
        <Col xs={2}>
          <SidebarEstudiantes />
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
              style={{ paddingRight: 20 }}
              className="md:container mx-auto"
            >
              <TableComponent
                columns={columns}
                data={asignaciones ? asignaciones : []}
              />
            </section>
          </div>
          <br />
        </Col>
      </Row>
    </div>
        
  )
  }else {
    return(
      <div style={{ marginTop: 100, paddingInline:200 }}>
        <Alert variant="warning">
        <Alert.Heading>Error: Vuelva a iniciar sesion.</Alert.Heading>
          <hr />
          <div className="d-flex justify-content-start mt-5">
          
              <Button onClick={() => history.replace("/login")} variant="outline-info">
                Iniciar sesion
              </Button>
            </div>
        </Alert>
      </div>
    )
  }
};

export default EstudiantesHome;
