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

export const ModificarProfesor = (props) => {
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
    <div>
      <button type="button" onClick={handleClickOpen} class="btn btn-light">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="blue"
          class="bi bi-pencil-square"
          viewBox="0 0 16 16"
        >
          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
          <path
            fill-rule="evenodd"
            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
          />
        </svg>
      </button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Editar un Profesor"}
        </DialogTitle>
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
