import React, { Component } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import telephone from "../assets/smartphone.png";
import mail from "../assets/email.png";
import Background from "../assets/back.jpg";
import facebook from "../assets/facebook.png";
import instagram from "../assets/instagram.png";
import { Footer } from "../components/Footer";
import "../css/Header.css";
import Navbar from "../components/Navbar";


var sectionStyle = {
  backgroundSize: "cover",
  height: "70vh",
  backgroundImage: `url(${Background})`,
};

class Contactos extends Component {
  render() {
    return (
      <section>
        <Navbar/>    
        <br />

        <div
          style={{
            fontSize: 40,
            paddingTop: 50,
            marginInline:30
          }}
        >
             <h2>
               Pagina de Contacto
            </h2>
          
            <h3>
              Esta es la pagina por la cual usted se podra contactar con el
              Colegio
            </h3>
        </div>

        <br />

        <Container style={{ marginBottom: "5rem" }}>
          <Row>
            <Col className={"alinearCardContactos"}>
              <Card style={{ width: "18rem" }}>
                <Card.Body>
                  <Card.Title>Facebook</Card.Title>

                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                  <Card.Link target="_blank" href="https://www.facebook.com">
                    Facebook
                  </Card.Link>
                  <Card.Text style={{ marginTop: "1rem" }}>
                     <img src={facebook} alt="tlf" width="40" />
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
           

            <Col  className={"alinearCardContactos"}>
              <Card style={{ width: "18rem" }}>
                <Card.Body>
                  <Card.Title>Instagram</Card.Title>

                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                  <Card.Link
                    target="_blank"
                    href="https://www.instagram.com/?hl=es"
                  >
                    Instagram
                  </Card.Link>
                  <Card.Text style={{ marginTop: "1rem" }}>
                    <img src={instagram} alt="tlf" width="40" />
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col  className={"alinearCardContactos"}>
              <Card style={{ width: "18rem" }}>
                <Card.Body>
                  <Card.Title>Email</Card.Title>

                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                  <Card.Link
                    target="_blank"
                    href="https://www.google.com/intl/es-419/gmail/about/"
                  >
                    Gmail
                  </Card.Link>
                  <Card.Text style={{ marginTop: "1rem" }}>
                     <img src={mail} alt="tlf" width="40" />
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col  className={"alinearCardContactos"}>
              <Card style={{ width: "18rem" }}>
                <Card.Body>
                  <Card.Title>Telefono</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                  <Card.Link href="#">Another Link</Card.Link>
                  <Card.Text style={{ marginTop: "1rem" }}>
                     <img src={telephone} alt="tlf" width="40" />
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <br />

          
        </Container>

       <div style={{paddingTop:91}}>

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
