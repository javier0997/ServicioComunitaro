import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Inicio from "../pages/inicio";
import Nosotros from "../pages/nosotros";
import Contactos from "../pages/contactos";
import asignacionHome from "../pages/profesores/asignacionHome";
import boletasHome from "../pages/profesores/boletasHome";
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

        <Switch>
          {/* ------ Profesores Paths ----- */}
          <Route exact path="/profesores" component={asignacionHome} />
          <Route exact path="/profesores/BoletasHome" component={boletasHome} />
        </Switch>

        {/* ------ Estudiantes Paths ----- */}
        <Route path="/estudiantes" component={EstudiantesHome} />
      </Switch>
    </Router>
  );
};

export default Navigation;
