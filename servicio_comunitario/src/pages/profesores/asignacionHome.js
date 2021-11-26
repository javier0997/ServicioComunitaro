import React, { useState, useEffect, useContext } from "react";
import firebase from "firebase/app";
import TableComponent from "../../components/table";
import { Col, Row } from "react-bootstrap";
import { EliminarProfesor } from "../../components/eliminarProfesor";
import { ProfesorCreacion } from "../../components/ProfesorCreacion";
import { ModificarProfesor } from "../../components/modificarProfesor";
import SidebarProfesores from "../../components/SidebarProfesores";

const AsignacionHome = () => {
  const db = firebase.firestore();
  const [asignaciones, setAsig] = useState(null);


  const datosUser = JSON.parse(localStorage.getItem('datosUser'));
  const [user, setUser] = useState(datosUser);


 
  // const handleLogout = () => {
  //   firebase.auth().signOut();
  // };

  useEffect(() => {
    (async () => {
      db.collection("asignaciones").where('profesor_user', '==', `${user.userSC}`).where('curso', '==', `${user.cursoSC}`)
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
      title: "Eliminar",
      render: (rowData) => <EliminarProfesor data={rowData} />,
    },
    {
      title: "Modificar",
      render: (rowData) => <ModificarProfesor data={rowData} />,
    },
  ];

  if(user.loginSC=="1"){
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
        
  );
  }else if(user.loginSC=="0"){
    <h1>Error: Vuelva a iniciar sesion.</h1>
  }

};

export default AsignacionHome;
