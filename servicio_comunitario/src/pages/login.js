import React, { Component } from "react";
import { Form, Button, Card, Container, Row, Col } from "react-bootstrap";

class Login extends Component {
  render() {
    return (
      <section
        style={{
          backgroundColor: "#B2B5C1",
          backgroundSize: "cover",
          height: "89.3vh",
        }}
      >
        <Container style={{width:700}}>
          <Col>

            <Row>
              <div style={{paddingTop:200}}>
              <Card className="bg-white">
                <Card.Body>
                  <Card.Title className="text-muted " style={{ fontSize: 40 }}>
                    Inicio de Sesion
                  </Card.Title>
                  <br />
                  <br />
                  <Card.Text>
                    <Form>
                      <Form.Group className="mb-3" controlId="formBasicEmail" >
                        <Form.Control
                          type="email"
                          placeholder="Correo Electronico"
                          size="lg" 
                        />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Control
                          type="password"
                          placeholder="Contraseña"
                          size="lg" 

                        />
                      </Form.Group>

                      <div style={{ paddingRight: 522 }}>
                        <Button variant="secondary" type="submit">
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
  }
}

export default Login;
