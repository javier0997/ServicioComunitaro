import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Inicio from "../pages/inicio";
import Nosotros from "../pages/nosotros";
import Contactos from "../pages/contactos";
import asignacionHome from "../pages/profesores/asignacionHome";
import LoginScreen from "../pages/login";

const Navigation = () => {
  return (
    <Router>
      <Switch>
        {/* ------ Colegio Page Paths ----- */}
        <Route exact path="/" component={Inicio} />
        <Route path="/inicio" component={Inicio} />
        <Route path="/nosotros" component={Nosotros} />
        <Route path="/contactos" component={Contactos} />

        <Route path="/login">
          <LoginScreen />
        </Route>

        {/* ------ Profesores Paths ----- */}
        <Switch>
          <Route path="/profesores" component={asignacionHome} />
        </Switch>

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
  );
};

export default Navigation;
