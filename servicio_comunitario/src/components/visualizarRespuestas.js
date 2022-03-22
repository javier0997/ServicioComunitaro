import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useHistory, Link } from "react-router-dom";



import "react-datepicker/dist/react-datepicker.css";

export const VisualizarRespuestas = (props) => {
   
    const history = useHistory();


  useEffect(() => {
   // fetchUrls(props.data);
  }, []);


  var data = {id:3,age:36};
var path = {
  pathname:'/asignacion_respuestas',
  query:data,
}

  const handlerClick = () => {
    history.push(`/asignacion_respuestas/${props.data.nombre_asignacion}`)
  };

  return (
      <button
        type="button"
        class="btn btn-outline-success"
        onClick={handlerClick}
      >
        <svg xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20"
                fill="currentColor" 
                class="bi bi-clipboard2-check" 
                viewBox="0 0 16 16">
            <path d="M9.5 0a.5.5 0 0 1 .5.5.5.5 0 0 0 .5.5.5.5 0 0 1 .5.5V2a.5.5 0 0 1-.5.5h-5A.5.5 0 0 1 5 2v-.5a.5.5 0 0 1 .5-.5.5.5 0 0 0 .5-.5.5.5 0 0 1 .5-.5h3Z"/>
            <path d="M3 2.5a.5.5 0 0 1 .5-.5H4a.5.5 0 0 0 0-1h-.5A1.5 1.5 0 0 0 2 2.5v12A1.5 1.5 0 0 0 3.5 16h9a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 12.5 1H12a.5.5 0 0 0 0 1h.5a.5.5 0 0 1 .5.5v12a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5v-12Z"/>
            <path d="M10.854 7.854a.5.5 0 0 0-.708-.708L7.5 9.793 6.354 8.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3Z"/>
        </svg>
      </button>
  );
};
