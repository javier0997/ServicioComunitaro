import React, { useState, useEffect, useContext } from "react";
import { Form, Button, Card, Container, Row, Col } from "react-bootstrap";
import Navbar from "../components/Navbar";
import { Auth } from "../context/auth";
import { useHistory } from "react-router-dom";
import firebase from "firebase/app";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { user } = useContext(Auth);
  const auth = firebase.auth();
  const history = useHistory();

  const clearInputs = () => {
    setEmail("");
    setPassword("");
  };

  const clearErrors = () => {
    setEmailError("");
    setPassword("");
  };

  useEffect(() => {
    if (user) {
      history.push("/profesores");
    }
  }, [history, user]);

  const handleLogin = (e) => {
    e.preventDefault();
    clearErrors();
    auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
      return auth
        .signInWithEmailAndPassword(email, password)
        .then((res) => {
          return true;
        })
        .catch((err) => {
          switch (err.code) {
            case "auth/invalid-email":
            case "auth/user-disabled":
            case "auth/user-not-found":
              setEmailError(err.message);
              break;
            case "auth/wrong-password":
              setPasswordError(err.message);
              break;
          }
        });
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
              <Card className="bg-white">
                <Card.Body>
                  <Card.Title className="text-muted " style={{ fontSize: 40 }}>
                    Inicio de Sesion
                  </Card.Title>
                  <br />
                  <br />
                  <Card.Text>
                    <Form>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Correo Electronico"
                          size="lg"
                        />
                        <p className="errorMsg">{emailError}</p>
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
                          onClick={handleLogin}
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

