import React, { Component } from 'react';
import { Card ,Col, Container, Row} from 'react-bootstrap';
import telephone from '../assets/smartphone.png';
import mail from '../assets/email.png';
import Background from '../assets/back.jpg';
import facebook from '../assets/facebook.png';
import instagram from '../assets/instagram.png';

var sectionStyle = {
    backgroundSize: "cover",
          height: "100vh",
    backgroundImage: `url(${Background})`
  };

class Contactos extends Component {
    render() {
        return (
            <section style={ sectionStyle }>
            <Container style={{maxWidth:800, alignItems:'center', paddingTop:30}}>
             
                <Row >
                
                <Col> 
                <Card style={{marginBottom:40, height:400}}>
                    <Card.Body>
                        <Row style={{marginTop:10}}>
                            <Col style={{textAlign:"right"}}> 
                                <Card.Title style={{textAlign:"left"}}>Telefonos</Card.Title> 
                            </Col> 
                            <Col style={{textAlign:"right"}}> 
                                <img src={telephone} alt="tlf" width="40" />
                            </Col> 
                        </Row>
                        
                        <Card.Text style={{textAlign:"left"}}>
                            Teléfonos: 0412-3646441
                        </Card.Text>
                        <Card.Text style={{textAlign:"left", marginTop:20}}>
                            Teléfonos: 0412-3646441
                        </Card.Text>
                        <Card.Text style={{textAlign:"left", marginTop:20}}>
                            Teléfonos: 0412-3646441
                        </Card.Text>
                        <Row style={{marginTop:30}}>
                            <Col style={{textAlign:"right"}}> 
                                <Card.Title style={{textAlign:"left"}}>Correos</Card.Title> 
                            </Col> 
                            <Col style={{textAlign:"right"}}> 
                                <img src={mail} alt="tlf" width="40" />
                            </Col> 
                        </Row>
                        <Card.Text style={{textAlign:"left"}}>
                             yjmendez10@gmail.com
                        </Card.Text>
                        <Card.Text style={{textAlign:"left", marginTop:20}}>
                             yjmendez10@gmail.com
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer> </Card.Footer>
                </Card>
                </Col>

                <Col> 
                <Card style={{marginBottom:40,height:400}}>
                    <Card.Body style={{marginTop:10}}>

                    <Card.Title style={{textAlign:"left"}}>Facebook</Card.Title> 
                        <Row >
                            <Col > 
                                <Card.Text style={{textAlign:"left", marginTop:20}}>
                                yjmendez10@gmail.com
                                </Card.Text>
                            </Col> 
                            <Col style={{paddingTop:10}}> 
                                <img src={facebook} alt="tlf" width="40" /> 
                            </Col>  
                        </Row>

                    <Card.Title style={{textAlign:"left", marginTop:20}}>Instagram</Card.Title> 
                        <Row >
                            <Col > 
                                <Card.Text style={{textAlign:"left", marginTop:20}}>
                                yjmendez10@gmail.com
                                </Card.Text>
                            </Col> 
                            <Col style={{paddingTop:10}}> 
                                <img src={instagram} alt="tlf" width="40" /> 
                            </Col>  
                        </Row>
                    </Card.Body>
                    <Card.Footer> </Card.Footer>
                </Card>
                </Col>
                
                </Row>
                
               
          </Container>
          </section>
        );
    }
}

export default Contactos;


const styles = {
    card: {
      backgroundColor: '#B7E0F2',
      borderRadius: 55,
      padding: '3rem'
    },
    cardImage: {
      height: '100%',
      objectFit: 'cover',
      borderRadius: 55
    }
  };