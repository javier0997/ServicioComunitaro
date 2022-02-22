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

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import { registerLocale, setDefaultLocale } from "react-datepicker";
import es from "date-fns/locale/es";
registerLocale("es", es);

export const CrearAsignacion = (props) => {
  const db = firebase.firestore();

  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Formato de Email no valido!")
      .required("requerido"),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState(null);

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDate2, setSelectedDate2] = useState(null);

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
      const usuarioupdate = db.collection("asignaciones");

      await usuarioupdate.doc(props.data.id).update({
        nombre_asignacion: data.nombre_asignacion,
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

  const [value, setValue] = React.useState("");

  return (
    <div>
      <button type="button" onClick={handleClickOpen} class="btn btn-secondary">
        Crear Asignacion
      </button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Crear Asignacion"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div className="grid grid-cols-1 md:grid-cols-1">
              <form className="form-group mt-3">
                <div className="row">
                  <div className="col">
                    <DatePicker
                      selected={selectedDate}
                      onChange={(date) => setSelectedDate(date)}
                      dateFormat="dd/MM/yyyy"
                      minDate={new Date()}
                      isClearable
                      locale="es"
                      placeholderText="Fecha Inicio"
                      className="form-control"
                    />
                    {/* <input
                      type="text"
                      name="Telefono"
                      id="Telefono"
                      className="form-control"
                      placeholder="Fecha Inicio"
                      {...register("Telefono", {
                        required: true,
                      })}
                    /> */}
                  </div>
                  <div className="col">
                    <DatePicker
                      selected={selectedDate2}
                      onChange={(date) => setSelectedDate2(date)}
                      dateFormat="dd/MM/yyyy"
                      minDate={new Date()}
                      isClearable
                      locale="es"
                      placeholderText="Fecha Fin"
                      className="form-control"
                      class="btn btn-secondary"
                    />
                    {/* <input
                      type="email"
                      name="email"
                      id="email"
                      className="form-control"
                      placeholder="Fecha Fin"
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
                    /> */}
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col">
                    <input
                      type="text"
                      name="nombre_asignacion"
                      id="nombre_asignacion"
                      className="form-control"
                      placeholder="Nombre de la Asignacion"
                      {...register("nombre_asignacion", {
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
                      placeholder="Profesor"
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
                      type="file"
                      name="Cedula"
                      id="Cedula"
                      className="form-control"
                      placeholder="Archivo"
                      isClearable
                      {...register("Cedula", {
                        required: true,
                      })}
                    />
                  </div>
                </div>
                <br />

                <div className="row">
                  <div className="col">
                    <textarea
                      className="form-control"
                      id="validationTextarea"
                      placeholder="Descripcion de la Asignacion"
                      required
                    ></textarea>
                  </div>
                </div>
                <br />

                <div className="row">
                  <div className="col">
                    <select
                      className="form-control"
                      class="btn btn-secondary"
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
                  <div className="col" style={{ paddingLeft: 200 }}>
                    <button
                      type="button"
                      onClick={handleSubmit(onSubmit)}
                      class="btn btn-secondary"
                    >
                      Crear
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
};
