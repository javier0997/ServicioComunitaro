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

export const ResponderAsignacion = (props) => {
  const db = firebase.firestore();

  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Formato de Email no valido!")
      .required("requerido"),
  });

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
      const usuarioupdate = db.collection("profesores");

      await usuarioupdate.doc(props.data.id).update({
        Nombre: data.Nombre,
        Apellido: data.Apellido,
        Telefono: data.Telefono,
        email: data.email,
        Seccion: data.Seccion,
        Cedula: data.Cedula,
      });
      window.location.reload();
      alert("Profesor modificado con Exito!");
    } catch (error) {
      console.log(error);
      alert("Error! No se pudo modificar un profesor!");
      setIsLoading(false);
    }
  };

  return (
    <div >
      <button type="button" onClick={handleClickOpen} class="btn btn-light" >
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="green" class="bi bi-file-earmark-arrow-up-fill" viewBox="0 0 16 16">
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
                <br />
                <div className="row mx-auto" >
                  <div >
                    <select
                      className="custom-select"
                      id="inlineFormCustomSelect"
                      name="Seccion"
                      {...register("Seccion", {
                        required: true,
                      })}
                    >
                      <option>Seleccione el Curso</option>
                      <option>Primer Grado</option>
                      <option>Segundo Grado</option>
                      <option>Tercer Grado</option>
                      <option>Cuarto Grado</option>
                      <option>Quinto Grado</option>
                      <option>Sexto Grado</option>
                    </select>
                  </div>
                
                </div>
                <br />
                <div style={{ paddingInline: 100 }}>
                  <button
                    type="button"
                    onClick={handleSubmit(onSubmit)}
                    class="btn btn-primary"
                  >
                    Modificar
                  </button>
                </div>
              </form>
            </div>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
};
