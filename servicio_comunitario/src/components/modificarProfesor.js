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

export const ModificarProfesor = (props) => {
  const db = firebase.firestore();

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDate2, setSelectedDate2] = useState(null);


 

  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState(null);

  const { watch, register, handleSubmit } = useForm();

   const datosUser = JSON.parse(localStorage.getItem("datosUser"));
  const [user, setUser] = useState(datosUser ? datosUser : { rolSC: "" });


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
      const storageRef = firebase.storage().ref();

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
      
      await usuarioupdate.doc(props.data.id).update({
        nombre_asignacion: data.nombre_asignacion,
        profesor_user: user.userSC,
        fecha_inicio: selectedDate.toLocaleDateString(),
        fecha_fin: selectedDate2.toLocaleDateString(),
        curso: user.cursoSC,
        descripcion: data.descripcion,
        archivo: fileList,
      });
      window.location.reload();
      alert("Profesor modificado con Exito!");
    } catch (error) {
      console.log(error);
      alert("Error! No se pudo modifiassacar un profesor!");
      setIsLoading(false);
    }
  };

  return (
    <div >
      <button type="button" onClick={handleClickOpen} class="btn btn-light">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
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
        <DialogTitle id="alert-dialog-title">{"Modificar Asignacion"}</DialogTitle>
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
                      minDate={new Date()}
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
                    <button
                      type="button"
                      onClick={handleSubmit(onSubmit)}
                      class="btn btn-outline-secondary btn-lg btn-block "
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
