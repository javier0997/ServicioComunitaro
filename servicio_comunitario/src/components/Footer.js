import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export const Footer = () => {
  return (
    <div class="main-footer bg-dark">
      <div class="container">
        <div class="row">
          {/*Col1*/}
          <div class="col-md-3 col-sm-6 text-muted">
            <h4>lorem, ipsum.</h4>
            <ul class="list-unstyled">
              <li>lorem</li>
              <li>lorem</li>
              <li>lorem</li>
              <li>lorem</li>
            </ul>
          </div>
          {/*Col2*/}
          <div class="col-md-3 col-sm-6 text-muted">
            <h4>lorem, ipsum.</h4>
            <ul class="list-unstyled">
              <li>lorem</li>
              <li>lorem</li>
              <li>lorem</li>
              <li>lorem</li>
            </ul>
          </div>
          {/*Col3*/}
          <div class="col-md-3 col-sm-6 text-muted">
            <h4>lorem, ipsum.</h4>
            <ul class="list-unstyled">
              <li>lorem</li>
              <li>lorem</li>
              <li>lorem</li>
              <li>lorem</li>
            </ul>
          </div>
          {/*Col4*/}
          <div class="col-md-3 col-sm-6 text-muted">
            <h4>lorem, ipsum.</h4>
            <ul class="list-unstyled">
              <li>lorem</li>
              <li>lorem</li>
              <li>lorem</li>
              <li>lorem</li>
            </ul>
          </div>
        </div>
        {/*footer bottom */}
        <div class="footer-bottom text-muted">
          <p class="text-xs-center">
            &copy;{new Date().getFullYear()} City Guide App - All Rights
            Reserved
          </p>
        </div>
      </div>
    </div>
  );
};
