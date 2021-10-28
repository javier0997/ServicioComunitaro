import React, { Component, useState } from "react";
import { ListGroup, Col, Tab, Row, Container } from "react-bootstrap";
import "../css/Header.css";
import Background from "../assets/back.jpg";
import { Footer } from "../components/Footer";
import Navbar from "../components/Navbar";


var ListStyle = {
  maxWidth: 370,
  minWidth: 150,
  paddingBottom: 10,
};

var sectionStyle = {
  backgroundSize: "cover",
  backgroundImage: `url(${Background})`,
  paddingBlock: 50,
  paddingInline: 10,
};

class Nosotros extends Component {
  render() {
    return (
      <div>
           <Navbar/>   
        <div className={"alinearNosotros"}>
          <Container
            style={{
              maxWidth: 800,
              alignItems: "center",
              justifyContent: "center",
      
            }}
          >
            <Tab.Container defaultActiveKey="#link1">
              <Row>
                <Col style={ListStyle}>
                  <ListGroup>
                    <ListGroup.Item variant="primary" action href="#link1">
                      Quienes Somos?
                    </ListGroup.Item>
                    <ListGroup.Item variant="primary" action href="#link2">
                      Misión
                    </ListGroup.Item>
                    <ListGroup.Item variant="primary" action href="#link3">
                      Visión
                    </ListGroup.Item>
                    <ListGroup.Item variant="primary" action href="#link4">
                      Perfil Docente
                    </ListGroup.Item>
                  </ListGroup>
                </Col>

                <Col
                  style={{
                    backgroundColor: "rgba(1, 138, 255, 0.8)",
                    borderRadius: 10,
                    paddingInline: 10,
                    paddingBlock: 50,
                  }}
                >
                  <Tab.Content style={{ color: "white" }}>
                    <Tab.Pane eventKey="#link1">
                      <p>
                        La Unidad Educativa Escuela Parroquial San José, es una
                        unidad educativa de búsqueda permanente del desarrollo
                        integral de sus estudiantes, tratando de hacer posible
                        un desarrollo armónico y equilibrado que abarque todas
                        las capacidades: personal, social, intelectual,
                        religiosa, comunicativa, afectiva y artística. Se
                        fundamentan en formar personas libres, vinculadas a los
                        demás, dentro de un ambiente educativo de confianza.
                      </p>
                    </Tab.Pane>
                    <Tab.Pane eventKey="#link2">
                      <p>
                        La Unidad Educativa Escuela Parroquial San José tiene
                        como misión brindar las herramientas necesarias a los
                        estudiantes que le permitan producir cambios a nivel
                        personal, social y ambiental, en permanente búsqueda de
                        la consolidación de los valores del respeto, la
                        solidaridad y la cooperación enmarcados en la labor
                        pedagógica y social a través de las políticas educativas
                        que contribuyeron a mejorar el ambiente y las relaciones
                        con la comunidad.{" "}
                      </p>
                    </Tab.Pane>
                    <Tab.Pane eventKey="#link3">
                      <p>
                        Su visión se basa en proporcionar desde la Educación
                        Inicial hasta la Educación Primaria una educación de
                        calidad, basada en los ideales fisiológicos, pedagógicos
                        y sociales del nuevo salvatoriano, democrático,
                        participativo que permita formar niños, niñas y
                        adolescentes con valores de respeto, solidaridad,
                        cooperación que participen en los cambios productivos de
                        la nación plasmado en la Constitución de la República
                        Bolivariana de Venezuela.{" "}
                      </p>
                    </Tab.Pane>
                    <Tab.Pane eventKey="#link4">
                      <p>
                        The standard chunk of Lorem Ipsum used since the 1500s
                        is reproduced below for those interested. Sections
                        1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum"
                        by Cicero are also reproduced in their exact original
                        form, accompanied by English versions from the 1914
                        translation by H. Rackham.{" "}
                      </p>
                    </Tab.Pane>
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          </Container>
        </div>

      
          <Footer />
      
      </div>
    );
  }
}

export default Nosotros;
