import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import imagen5 from "../assets/imagenes/imagen_5.jpg";
import imagen6 from "../assets/imagenes/imagen_6.jpg";
import imagen7 from "../assets/imagenes/imagen_7.jpg";




export const Cards = () => {
  return (
    <div class="container mt-4 mb-4">
      <div class="row">
        <div class="col">
          <div class="card h-100">
            <img src={imagen5} class="card-img-top" alt="..." />
            <div class="card-body">
              <p class="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
          </div>
        </div>

        <div class="col">
          <div class="card h-100">
            <img src={imagen6} class="card-img-top" alt="..." />
            <div class="card-body">
              <p class="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
          </div>
        </div>

        <div class="col">
          <div class="card h-100">
            <img src={imagen7} class="card-img-top" alt="..." />
            <div class="card-body">
              <p class="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
