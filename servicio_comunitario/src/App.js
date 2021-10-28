import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Navbar from './components/Navbar';
import Inicio from './pages/inicio';
import Nosotros from './pages/nosotros';
import Contactos from './pages/contactos';
import Login from './pages/login';
import Sidebar from './components/Sidebar';
import { Col,Row } from "react-bootstrap";
import asignacionHome from './pages/profesores/asignacionHome';
import Sidebar2 from './components/Sidebar2';


function App() {
  return (
    <div className="App">
          <Router>
              <Switch>
                {/* ------ Colegio Page Paths ----- */}
                          <Route path='/' exact component={Inicio}/>
                          <Route path='/inicio' component={Inicio}/>
                          <Route path='/nosotros' component={Nosotros}/>
                          <Route path='/contactos' component={Contactos}/>
                          <Route path='/login' component={Login}/>
                

                 {/* ------ Profesores Paths ----- */}
                          <Route path='/profesores' component={asignacionHome}/>

                 {/* ------ Estudiantes Paths ----- */}
                             {/* <Row>
                                <Col xs={2} >      
                                  <Sidebar2/>
                                </Col>
                                <Col  xs={10} >
                                  <Switch>
                                      <Route path='/estudiantes' component={Contactos}/>
                                  </Switch>
                                </Col> 
                             </Row>
                    */}
              </Switch>
          </Router>
    </div>
  );
}

export default App;
