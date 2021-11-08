import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
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

export const ProfesorCreacion = () => {
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
      const doc = db.collection("profesores").doc();
      const profesores = {
        Nombre: data.Nombre,
        Apellido: data.Apellido,
        Telefono: data.Telefono,
        email: data.email,
        Seccion: data.Seccion,
        Cedula: data.Cedula || null,
      };
      await doc.set(profesores);
      setIsLoading(false);
      setId(doc.id);
      window.location.reload();
      alert("Profesor Creado con Exito!");
    } catch (error) {
      console.log(error);
      alert("Error! No se pudo crear un profesor!");
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button type="button" onClick={handleClickOpen} class="btn btn-secondary">
        Crear un Profesor
      </button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Crear un Profesor"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div className="grid grid-cols-1 md:grid-cols-1">
              <form className="form-group mt-3">
                <div className="row">
                  <div className="col">
                    <input
                      type="text"
                      name="Nombre"
                      id="Nombre"
                      className="form-control"
                      placeholder="Nombre"
                      {...register("Nombre", {
                        required: true,
                      })}
                    />
                  </div>
                  <div className="col">
                    <input
                      type="text"
                      name="Apellido"
                      id="Apellido"
                      className="form-control"
                      placeholder="Apellido"
                      {...register("Apellido", {
                        required: true,
                      })}
                    />
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col">
                    <input
                      type="text"
                      name="Telefono"
                      id="Telefono"
                      className="form-control"
                      placeholder="Telefono"
                      {...register("Telefono", {
                        required: true,
                      })}
                    />
                  </div>
                  <div className="col">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="form-control"
                      placeholder="Correo Electronico"
                      {...register("email", {
                        required: true,
                      })}
                    />
                    <ErrorMessage errors={errors} name="email" />

                    <ErrorMessage
                      errors={errors}
                      name="email"
                      render={({ message }) => (
                        <p>Ejemplo de formata de Email: example@domain.com</p>
                      )}
                    />
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col">
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
                  <div className="col">
                    <input
                      type="text"
                      name="Cedula"
                      id="Cedula"
                      className="form-control"
                      placeholder="Cedula"
                      {...register("Cedula", {
                        required: true,
                      })}
                    />
                  </div>
                </div>
                <br />
                <div>
                  <button
                    type="button"
                    onClick={handleSubmit(onSubmit)}
                    class="btn btn-secondary"
                  >
                    Crear
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
