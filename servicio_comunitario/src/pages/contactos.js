import React, { Component } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import telephone from "../assets/smartphone.png";
import mail from "../assets/email.png";
import Background from "../assets/back.jpg";
import facebook from "../assets/facebook.png";
import instagram from "../assets/instagram.png";
import { Footer } from "../components/Footer";

var sectionStyle = {
  backgroundSize: "cover",
  height: "70vh",
  backgroundImage: `url(${Background})`,
};

class Contactos extends Component {
  render() {
    return (
      <section style={sectionStyle}>
        <div
          style={{
            fontSize: 40,
            color: "#ffffff",
            fontWeight: "bold",
            paddingTop: 50,
          }}
        >
          <lable>
            Pagina de Contacto
            <p>
              Esta es la pagina por la cual usted se podra contactar con el
              Colegio
            </p>
          </lable>
        </div>

        <Container style={{ paddingTop: 220 }}>
          <Row>
            <Col style={styles.card}>
              <Card style={styles.c}>
                <Card.Body>
                  <Card.Title>Telefonos</Card.Title>
                  <Col>
                    <Card.Text style={{ textAlign: "center", marginTop: 20 }}>
                      yjmendez10@gmail.com
                    </Card.Text>
                  </Col>
                  <Row>
                    <Col style={{ marginTop: 20 }}>
                      <Card.Link
                        target="_blank"
                        href="https://www.facebook.com"
                      >
                        Facebook
                      </Card.Link>
                    </Col>
                    <Col style={{ paddingTop: 10 }}>
                      <img src={telephone} alt="tlf" width="40" />
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>

            <Col></Col>

            <Col style={styles.card}>
              <Card style={styles.c}>
                <Card.Body>
                  <Card.Title>Facebook</Card.Title>
                  <Col>
                    <Card.Text style={{ textAlign: "center", marginTop: 20 }}>
                      yjmendez10@gmail.com
                    </Card.Text>
                  </Col>
                  <Row>
                    <Col style={{ marginTop: 20 }}>
                      <Card.Link
                        target="_blank"
                        href="https://www.facebook.com"
                      >
                        Facebook
                      </Card.Link>
                    </Col>
                    <Col style={{ paddingTop: 10 }}>
                      <img src={facebook} alt="tlf" width="40" />
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>

            <Col></Col>

            <Col style={styles.card}>
              <Card style={styles.c}>
                <Card.Body>
                  <Card.Title>Correros</Card.Title>
                  <Col>
                    <Card.Text style={{ textAlign: "center", marginTop: 20 }}>
                      yjmendez10@gmail.com
                    </Card.Text>
                  </Col>
                  <Row>
                    <Col style={{ marginTop: 20 }}>
                      <Card.Link
                        target="_blank"
                        href="https://www.google.com/intl/es-419/gmail/about/"
                      >
                        Gmail
                      </Card.Link>
                    </Col>

                    <Col style={{ paddingTop: 10 }}>
                      <img src={mail} alt="tlf" width="40" />
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>

            <Col></Col>

            <Col style={styles.card}>
              <Card style={styles.c}>
                <Card.Body>
                  <Card.Title>Instagram</Card.Title>
                  <Col>
                    <Card.Text style={{ textAlign: "center", marginTop: 20 }}>
                      yjmendez10@gmail.com
                    </Card.Text>
                  </Col>
                  <Row>
                    <Col style={{ marginTop: 20 }}>
                      <Card.Link
                        target="_blank"
                        href="https://www.instagram.com/?hl=es"
                      >
                        Instagram
                      </Card.Link>
                    </Col>
                    <Col style={{ paddingTop: 10 }}>
                      <img src={instagram} alt="tlf" width="40" />
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
        <div className="fixed-bottom">
          <Footer />
        </div>
      </section>
    );
  }
}

export default Contactos;

const styles = {
  card: {
    backgroundColor: "#000000",
    opacity: 0.9,
    borderRadius: 55,
    padding: "1rem",
  },
  c: {
    height: "100%",
    objectFit: "cover",
    borderRadius: 55,
  },
};
