import React, { useState, useEffect, useContext } from "react";
import { Form, Button, Card, Container, Row, Col,Alert } from "react-bootstrap";
import Navbar from "../components/Navbar";
import firebase from "firebase/app";
import { useHistory } from "react-router-dom";
import Loading from "../components/Loading";


export const Login = () => {
  localStorage.clear();
  const history = useHistory();
  const db = firebase.firestore();
  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  

  const loginFirebase = async () => {
      setIsLoading(true)
      console.log(email+"-"+password)
      await firebase.auth().signInWithEmailAndPassword(email,password).then((userCredential) => {
        // Signed in
       
       let lastIndex = email.lastIndexOf('@')
       let userName = email.slice(0,lastIndex)
       getUser(userName)
       console.log(userName)
        const user = userCredential.user;
        
        // ...
      })
      .catch((error) => {
        setIsLoading(false)
        alert("Contraseña o correo invalido.")
        console.log(error)
        setEmail("")
        setPassword("")
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  
  const getUser = async (user) => {
           await db.collection('users').where('user', '==', `${user}`)
            .get()
            .then(querySnapshot => {
              querySnapshot.forEach(doc => {
              
                console.log(email + " "+ doc.data().rol+" "+doc.data().user+" "+doc.data().contraseña+" "+doc.data().curso + " "+doc.data().correo );

                if ( password==doc.data().contraseña ){
                  switch (doc.data().rol) {
                    case 'profesor':
                      let profesorCaracteristicas = {
                                                      'userSC': `${doc.data().user}`,
                                                      'nombreSC': `${doc.data().nombre}`,
                                                      'apellidoSC': `${doc.data().apellido}`,
                                                      'cursoSC': `${doc.data().curso}`,
                                                      'rolSC': `${doc.data().rol}`
                                                    };
                      localStorage.setItem('datosUser', JSON.stringify(profesorCaracteristicas));
                      history.push("/profesores");
                      setIsLoading(false)
                      break;
                    case 'estudiante':
                      let estudianteCaracteristicas = {
                                                   'userSC': `${doc.data().user}`,
                                                  'nombreSC': `${doc.data().nombre}`,
                                                  'apellidoSC': `${doc.data().apellido}`,
                                                  'cursoSC': `${doc.data().curso}`,
                                                  'rolSC': `${doc.data().rol}`
                                                };
                      localStorage.setItem('datosUser', JSON.stringify(estudianteCaracteristicas));
                      history.push("/estudiantes");
                      setIsLoading(false)
                      break;
                    case 'administrador':
                      localStorage.setItem("loginSC", "3");
                      break;

                  }
                }else {
                alert("Error: contraseña o usuario incorrectos.")
                setIsLoading(false)
                }

              });
            }).catch((error) => {
              console.log(error)
              alert(error.message)
              const errorCode = error.code;
              const errorMessage = error.message;
            });
             
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
              <Card className="bg-white border-primary">
                <Card.Body>
                  <Card.Title className="text-muted " style={{ fontSize: 40, marginBottom:40 }}>
                    Inicio de Sesion
                  </Card.Title>
                  <Card.Text >
                  
                  <div className="form-outline mb-4">
                        <input
                         style={{ fontSize: 16 }}
                         className="form-control border-primary" 
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Correo electronico"
                          size="lg"
                          onKeyPress={(e) => e.key === 'Enter' && loginFirebase()}
                        />
                     </div>

                     <div className="form-outline mb-4">
                        <input
                        style={{ fontSize: 16 }}
                        className="form-control border-primary" 
                          type="password"
                          id="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Contraseña"
                          size="lg"
                          onKeyPress={(e) => e.key === 'Enter' && loginFirebase()}
                        />
                     </div>

                      <div style={{ alignItems:'center' }}>
                        <Button
                          variant="primary"
                          type="submit"
                          className="text-white btn-lg"
                          onClick={loginFirebase}
                        >
                          Iniciar sesion
                        </Button>
                      </div>
                
                   
                  </Card.Text>
                
                </Card.Body>
                {isLoading &&
                <div className=" mt-4 mb-4 mx-auto">
                  <div className="row mx-auto">
                    <Loading/>
                    </div>
                </div>
                 }
              </Card>
            </div>
          </Row>

          <Row className="m-auto align-self-center">
            <div className="footer-copyright text-center py-3 text-muted">
              Todos los derechos Reservados
               © U.E. Escuela Parroquial San José
            </div>
          </Row>
        </Col>
      </Container>
    </section>
  );
};

export default Login;

