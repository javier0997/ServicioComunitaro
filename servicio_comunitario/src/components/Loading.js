import React from "react";
import { Spinner } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function Loading() {
  return (
    <div
      style={{
        justifyContent:'center',
        alignItems: "center",
        display:'flex',
      }}
    >
      <div>
        <Spinner type="grow" color="success" style={{width:20, height:20}}  />
      </div>

      <div style={{paddingTop:12}}>
        <p>Cargando...</p>
      </div>
    </div>
  );
}

export default Loading;
