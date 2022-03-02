import React from 'react'
import { Spinner } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";


function Loading() {
  return (
    <div>
        <Spinner color='dark' style={{width:50,height:50}}/>
    </div>
  )
}


export default Loading;