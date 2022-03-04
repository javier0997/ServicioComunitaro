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

import Loading from "../components/Loading";


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

  const datosUser = JSON.parse(localStorage.getItem("datosUser"));
  const [user, setUser] = useState(datosUser ? datosUser : { rolSC: "" });

  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState(null);

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDate2, setSelectedDate2] = useState(null);

  const { watch, register, handleSubmit } = useForm();

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

      await db
        .collection("asignaciones")
        .doc()
        .set({
          nombre_asignacion: data.nombre_asignacion,
          profesor_user: user.userSC,
          fecha_inicio: selectedDate.toLocaleDateString("en-GB"),
          fecha_fin: selectedDate2.toLocaleDateString("en-GB"),
          curso: user.cursoSC,
          descripcion: data.descripcion,
          archivo: fileList,
        });
      setIsLoading(false);
      alert("Asignacion creada con Exito!");
      window.location.reload();
    } catch (error) {
      console.log(error);
      alert("Error! No se pudo crea la Asignacion");
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
                  </div>
                  <div className="col">
                    <DatePicker
                      selected={selectedDate2}
                      onChange={(date) => setSelectedDate2(date)}
                      dateFormat="dd/MM/yyyy"
                      minDate={selectedDate}
                      isClearable
                      locale="es"
                      placeholderText="Fecha Fin"
                      className="form-control"
                      class="btn btn-secondary"
                    />
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
                </div>
                <br />
                <div className="row">
                  <div className="col">
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
                <br />

                <div className="row">
                  <div className="col">
                    <textarea
                      className="form-control"
                      id="validationTextarea"
                      placeholder="Descripcion de la Asignacion"
                      {...register("descripcion", {
                        required: true,
                      })}
                    ></textarea>
                  </div>
                </div>
                <br />

                <div className="row">
                  <div className="col">
                    <button
                      type="button"
                      onClick={handleSubmit(onSubmit)}
                      className="form-control btn-outline-secondary "
                    >
                      Crear
                    </button>
                  </div>
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
