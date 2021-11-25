import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Inicio from "../pages/inicio";
import Nosotros from "../pages/nosotros";
import Contactos from "../pages/contactos";
import asignacionHome from "../pages/profesores/asignacionHome";
import EstudiantesHome from "../pages/estudiantes/asignacionesHome";
import LoginScreen from "../pages/login";
import administradorhome from "../pages/administrador/administradorhome";

const Navigation = () => {
  return (
    <Router>
      <Switch>
        {/* ------ Colegio Page Paths ----- */}
        <Route exact path="/" component={Inicio} />
        <Route path="/inicio" component={Inicio} />
        <Route path="/nosotros">
          <Nosotros />
        </Route>
        <Route path="/contactos" component={Contactos} />
        <Route path="/login">
          <LoginScreen />
        </Route>

        {/* ------ Profesores Paths ----- */}
        <Switch>
          {/* <Route exact path="/profesores">
              <asignacionHome />
            </Route> */}
          <Route  path="/profesores" component={asignacionHome} />

          <Route path="/profesores/estudientas" component={EstudiantesHome} />
        </Switch>

        {/* ------ Administrador Paths ----- */}

        <Switch>
          <Route path="/administradorhome" component={administradorhome} />
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
