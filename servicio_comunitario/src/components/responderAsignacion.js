import React, { useState } from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import "firebase/auth";
import firebase from "firebase/app";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { yupResolver } from "@hookform/resolvers/yup";
import "bootstrap/dist/css/bootstrap.min.css";
import Loading from '../components/Loading';

export const ResponderAsignacion = (props) => {
  const db = firebase.firestore();

  const schema = yup.object().shape({
    
  });

  const [disable, setDisable] = React.useState(false);

  const datosUser = JSON.parse(localStorage.getItem("datosUser"));
  const [user, setUser] = useState(datosUser ? datosUser : { rolSC: "" });

  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState(null);

  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const storageRef = firebase.storage().ref();
      console.log(data);

      let nombre_completo = user.nombreSC+' '+user.apellidoSC;

      let date = new Date()
      let day = date.getDate()
      let month = date.getMonth() + 1
      let year = date.getFullYear()
      let hora = date.getHours()
      let min = date.getMinutes()
      let fecha = day+'/'+month+'/'+year+' '+hora+':'+min;

      const fileList = [];
      for await (const file of data.archivo) {
        const fileName = Date.now() + "-" + file.name;
        const fileRef = storageRef.child(fileName);
        await fileRef.put(file);
        fileList.push({
          fileName: file.name,
          bucketFileName: fileName,
        });
      }

      await db.collection("respuesta_asignaciones").doc().set({
        nombre_asignacion: props.data.nombre_asignacion,
        nombre_estudiante: nombre_completo,
        user_estudiante: user.userSC,
        user_profesor: props.data.profesor_user,
        curso: user.cursoSC,
        fecha_respuesta: fecha,
        archivo_respuesta: fileList,
      });
      setIsLoading(false);
      window.location.reload();
      alert("Asignacion respondida con exito!");
    } catch (error) {
      console.log(error);
      alert("Error: No se pudo responder la asignacion");
      setIsLoading(false);
    }
  };

  return (
    <div >
      <button type="button" onClick={handleClickOpen} class="btn btn-outline-success" >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-file-earmark-arrow-up-fill" viewBox="0 0 16 16">
            <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM6.354 9.854a.5.5 0 0 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 8.707V12.5a.5.5 0 0 1-1 0V8.707L6.354 9.854z"/>
        </svg>    
      </button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Subir un archivo"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div className="grid grid-cols-1 md:grid-cols-1">
              <form className="form-group mt-3">
              
                <div className="row mx-auto" >
                      <div className="col">
                    <div className="row">
                        <input
                          type="file"
                          name="archivo"
                          id="archivo"
                          className="form-control"
                          placeholder="Archivo"
                          isClearable
                          {...register("archivo", {
                            required: true,
                          })}
                        />
                      </div>
                    </div>
                </div>
                <br />
                <div className="row mx-auto" >
                  <button
                    type="button"
                    onClick={handleSubmit(onSubmit)}
                    class="btn btn-outline-info"
                  >
                    Responder
                  </button>
                </div>

              </form>
            </div>
          </DialogContentText>
        </DialogContent>
        {isLoading && <Loading />}

      </Dialog>
    </div>
  );
};
