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
        <Spinner type="grow" color="primary" style={{width:20, height:20}}  />
      </div>

      <div style={{marginLeft:5, paddingTop:12}}>
        <p>Cargando...</p>
      </div>
    </div>
  );
}

export default Loading;
