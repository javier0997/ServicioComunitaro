import React, { Component } from 'react'
import Sidebar from '../../components/Sidebar';
import { Col,Row } from "react-bootstrap";
import ProfesorTableAsignaciones from '../../components/ProfesorTableAsignaciones';



export class asignacionHome extends Component {
    render() {
        return (
            <div>
                <Row>
                    <Col xs={2} >      
                          <Sidebar />
                    </Col>
                    
                    <Col  xs={10} >           
                         <ProfesorTableAsignaciones />
                    </Col> 
                </Row>
            </div>
        )
    }
}

export default asignacionHome
