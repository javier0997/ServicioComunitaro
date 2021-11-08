import React, { Component } from 'react'
import Sidebar from '../../components/Sidebar';
import { Col,Row } from "react-bootstrap";
import ProfesorTableAsignaciones from '../../components/ProfesorTableAsignaciones';



export class administradorhome extends Component {
    render() {
        return (
            <div>
                <h1>

                aksjdlajslk
                </h1>
                <Row>
                    <Col xs={2} >      
                          <Sidebar />
                    </Col>
                    
                    <Col  xs={10} >           
                         <ProfesorTableAsignaciones />
                         <div>akjsdkha</div>
                    </Col> 
                </Row>
            </div>
        )
    }
}

export default administradorhome
