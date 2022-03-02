import React, { useState, useEffect } from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import "firebase/auth";
import firebase from "firebase/app";
import { useForm } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.min.css";

import DatePicker from "react-datepicker";
import Loading from "../components/Loading";

import "react-datepicker/dist/react-datepicker.css";

export const ModificarProfesor = (props) => {
  const db = firebase.firestore();
  const storage = firebase.storage();

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDate2, setSelectedDate2] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState(null);

  const [files, setFiles] = useState([]);

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

  useEffect(() => {
    fetchUrls(props.data);
  }, []);

  const fetchUrls = async (data) => {
    try {
      const fileList = [];
      for await (const file of data.archivo) {
        const storageRef = storage.ref(file.bucketFileName);
        const url = await storageRef.getDownloadURL();
        fileList.push({
          url,
          fileName: file.fileName,
        });
      }
      setFiles(fileList);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const usuarioupdate = db.collection("asignaciones");

      await usuarioupdate.doc(props.data.id).update({
        nombre_asignacion:
          data.nombre_asignacion || props.data.nombre_asignacion,
        fecha_inicio: selectedDate?.toLocaleDateString('en-GB') || props.data.fecha_inicio,
        fecha_fin: selectedDate2?.toLocaleDateString('en-GB') || props.data.fecha_fin,
        descripcion: data.descripcion || props.data.descripcion,
      });
      setIsLoading(false);
      window.location.reload();
      alert("Asignacion modificada con Exito!");
    } catch (error) {
      console.log(error);
      alert("Error! No se pudo modificar la Asignacion!");
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleClickOpen}
        class="btn btn-outline-secondary"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
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
          {"Modificar Asignacion"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div className="grid grid-cols-1 md:grid-cols-1">
              <form className="form-group mt-3">
                <div className="row">
                  <div className="col">
                    <label>Fecha de Inicio: {console.log(props.data)}</label>
                    <DatePicker
                      selected={selectedDate}
                      onChange={(date) => setSelectedDate(date)}
                      dateFormat="dd/MM/yyyy"
                      minDate={new Date()}
                      isClearable
                      locale="es"
                      placeholderText={props.data.fecha_inicio}
                      className="form-control"
                    />
                  </div>
                  <div className="col">
                    <label>Fecha de Fin:</label>
                    <DatePicker
                      selected={selectedDate2}
                      onChange={(date) => setSelectedDate2(date)}
                      dateFormat="dd/MM/yyyy"
                      minDate={selectedDate}
                      isClearable
                      locale="es"
                      placeholderText={props.data.fecha_fin}
                      className="form-control"
                      class="btn btn-secondary"
                    />
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col">
                    <label>Nombre de la Asignacion:</label>
                    <input
                      type="text"
                      name="nombre_asignacion"
                      id="nombre_asignacion"
                      className="form-control"
                      placeholder={props.data.nombre_asignacion}
                      {...register("nombre_asignacion", {
                        required: false,
                      })}
                    />
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col">
                    <label>Descripcion de la Asignacion:</label>
                    <textarea
                      className="form-control"
                      id="validationTextarea"
                      placeholder={props.data.descripcion}
                      {...register("descripcion", {
                        required: false,
                      })}
                    ></textarea>
                  </div>
                </div>
                <br />

                <div className="row">
                  <div className="col">
                    {files.map((file) => (
                      <label>Archivo: {file.fileName}</label>
                    ))}
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
                      Modificar
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
