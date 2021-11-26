import React, { Component } from "react";
import { Carousel } from "../components/carousel";
import { Cards } from "../components/Cards";
import { Footer } from "../components/Footer";
import Navbar from "../components/Navbar";

class Inicio extends Component {
  render() {
    localStorage.clear();
    return (
      <div>
        <Navbar/>    
        <br />
        <Carousel />
        <br />
        <div style={{ display: 'flex',  justifyContent:'center', alignItems:'center' }}>

        <h1>U. E. ESCUELA PARROQUIAL SAN JOSÉ</h1>
        </div>
        <Cards />
        <Footer />
      </div>
    );
  }
}

export default Inicio;
