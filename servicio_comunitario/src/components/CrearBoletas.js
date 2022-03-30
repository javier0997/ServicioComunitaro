import React, { useState, useEffect } from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import "firebase/auth";
import firebase from "firebase/app";
import { useForm } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.min.css";
import Loading from "../components/Loading";

export const CrearBoletas = (props) => {
  const db = firebase.firestore();

  const datosUser = JSON.parse(localStorage.getItem("datosUser"));
  const [user, setUser] = useState(datosUser ? datosUser : { rolSC: "" });

  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState(null);

  const { watch, register, handleSubmit } = useForm();

  const [open, setOpen] = useState(false);
  const [estudiantes, setEstudiantes] = useState([]);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      db.collection("users")
        .where("curso", "==", `${user.cursoSC}`)
        .where("rol", "==", `estudiante`)
        .get()
        .then((snapshot) => {
          const estudiantes = [];
          snapshot.forEach((doc) => {
            const data = doc.data();
            estudiantes.push({
              id: doc.id,
              ...data,
            });
          });
          setEstudiantes(estudiantes);
        })
        .catch((error) => console.log(error));
      setIsLoading(false);
    })();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let estudiantesLista = estudiantes.length > 0
        && estudiantes.map((item, i) => {
        return (
          <option key={i} value={[item.user,item.nombre,item.apellido]}>{item.nombre + " " + item.apellido}</option>
        )
    }, this);

  const onSubmit = async (data) => {
   try {
      setIsLoading(true);
      const storageRef = firebase.storage().ref();
      console.log(data);

      let date = new Date()
      let day = date.getDate()
      let month = date.getMonth() + 1
      let year = date.getFullYear()
      let hora = date.getHours()
      let min = date.getMinutes()
      let fecha_carga = day+'/'+month+'/'+year+' '+hora+':'+min;

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

      let arreglo = data.estudiante.split(','); 

      await db.collection("boletas").doc().set({  
        user_estudiante: arreglo[0],
        estudiante_nombre: arreglo[1] + " " + arreglo[2],
        user_profesor: user.userSC,
        curso: user.cursoSC,
        comentario: data.descripcion,
        archivo: fileList,
        fecha:  fecha_carga,
        lapso: props.lapso
      });
      setIsLoading(false);
      alert("Boelta cargada con Exito!");
      window.location.reload();
    } catch (error) {
      console.log(error);
      alert("Error! No se pudo cargar la Boleta");
      setIsLoading(false);
    }
  };

  const [value, setValue] = React.useState("");

  return (
    <div>
      <button type="button" onClick={handleClickOpen} class="btn btn-secondary">
        Subir Boleta
      </button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Subir Boleta"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div className="grid grid-cols-1 md:grid-cols-1">
              <form className="form-group mt-3">
                  <div className="row ">
                      <select
                        className="form-control"
                        class="btn btn-secondary"
                        id="inlineFormCustomSelect"
                        name="estudiante"
                        {...register("estudiante", {
                          required: true,
                        })}
                      >
                        <option>Seleccione el estudiante</option>
                        {estudiantesLista}
                      </select>
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
                      placeholder="Comentario"
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
