import React, { useState, useEffect, useContext } from "react";
import { Form, Button, Card, Container, Row, Col,Alert } from "react-bootstrap";
import Navbar from "../components/Navbar";
import firebase from "firebase/app";
import { useHistory } from "react-router-dom";



export const Login = () => {
  localStorage.clear();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [passwordAux, setPasswordAux] = useState("");
  const [emailAux, setEmailAux] = useState("");
  const [rol, setRol] = useState("");
  const [curso, setCurso] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [alerta, setAlert] = useState(false);




  const history = useHistory();
  const db = firebase.firestore();

  // const dbRef = ref(getDatabase());
  //   get(child(dbRef, `users/${email}`)).then((snapshot) => {
  //     if (snapshot.exists()) {
  //       console.log(snapshot.val());
  //     } else {
  //       console.log("No data available");
  //     }
  //   }).catch((error) => {
  //     console.error(error);
  //   });
  
  const getUser = () => {
    db.collection('users').where('user', '==', `${email}`)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          setRol(doc.data().rol);
          setEmailAux(doc.data().user);
          setPasswordAux(doc.data().contraseña);
          setCurso(doc.data().curso);
          setNombre(doc.data().nombre);
          setApellido(doc.data().apellido);
          
          console.log(rol+" "+emailAux+" "+passwordAux+" "+curso + " "+doc.data().correo );

          if (email==emailAux && password==passwordAux ){
            switch (rol) {
              case 'profesor':
                let profesorCaracteristicas = {
                                                'userSC': `${email}`,
                                                'nombreSC': `${nombre}`,
                                                'apellidoSC': `${apellido}`,
                                                'cursoSC': `${curso}`,
                                                'rolSC': `${rol}`
                                              };
                localStorage.setItem('datosUser', JSON.stringify(profesorCaracteristicas));
                history.push("/profesores");
                break;
              case 'estudiante':
                let estudianteCaracteristicas = {
                                        'userSC': `${email}`,
                                        'nombreSC': `${nombre}`,
                                        'apellidoSC': `${apellido}`,
                                        'cursoSC': `${curso}`,
                                        'rolSC': `${rol}`
                };
                localStorage.setItem('datosUser', JSON.stringify(estudianteCaracteristicas));
                history.push("/estudiantes");
                break;
              case 'administrador':
                localStorage.setItem("loginSC", "3");
                break;

            }
          }else {
           setAlert(true)
          }

          
        });
      })

  };

  return (
    <section
      style={{
        backgroundSize: "cover",
        height: "89.3vh",
      }}
    >
      <Navbar />
      <Container style={{ width: 700 }}>
        <Col>
          <Row>
            <div style={{ paddingTop: 100 }}>
              <Card className="bg-white">
                <Card.Body>
                  <Card.Title className="text-muted " style={{ fontSize: 40 }}>
                    Inicio de Sesion
                  </Card.Title>
                  <br />
                  <br />
                  <Card.Text>
                    <Form>
                      <Form.Group className="mb-3" >
                        <Form.Control
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Nombre de usuario"
                          size="lg"
                        />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Control
                          type="password"
                          id="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Contraseña"
                          size="lg"
                        />
                        <p className="errorMsg">{passwordError}</p>
                      </Form.Group>

                      <div style={{ paddingRight: 510 }}>
                        <Button
                          variant="primary"
                          type="submit"
                          className="text-white"
                          onClick={getUser}
                        >
                          Iniciar sesion
                        </Button>
                      </div>
                    </Form>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </Row>

          <Row className="m-auto align-self-center">
            <div className="footer-copyright text-center py-3 text-muted">
              Todos los derechos Reservados
              <p> © U.E. Escuela Parroquial San José</p>
            </div>
          </Row>
        </Col>
      </Container>
    </section>
  );
};

export default Login;

