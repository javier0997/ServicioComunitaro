import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Navbar from './components/Navbar';
import Inicio from './pages/inicio';
import Nosotros from './pages/nosotros';
import Contactos from './pages/contactos';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="App">
          <Router>
             <Navbar/>
             <Switch>
                <Route path='/' exact component={Inicio}/>
                <Route path='/inicio' component={Inicio}/>
                <Route path='/nosotros' component={Nosotros}/>
                <Route path='/contactos' component={Contactos}/>
             </Switch>
             <Footer />
          </Router>
    </div>
  );
}

export default App;
