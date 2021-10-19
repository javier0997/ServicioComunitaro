import React, { Component } from "react";
import { Carousel } from "../components/carousel";
import { Cards } from "../components/Cards";
import { Footer } from "../components/Footer";
class Inicio extends Component {
  render() {
    return (
      <div style={{background:'#B2B5C1'}}>
        <br />
        <Carousel />
        <br />
        <h1>U. E. ESCUELA PARROQUIAL SAN JOSÉ</h1>
        <Cards />
        <Footer />
      </div>
    );
  }
}

export default Inicio;
