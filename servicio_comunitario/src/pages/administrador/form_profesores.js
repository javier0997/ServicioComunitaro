import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import firebase from "firebase/app";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorMessage } from "@hookform/error-message";
import { useForm } from "react-hook-form";
import axios from "axios";

const Profesores = ({ history }) => {
  const db = firebase.firestore();

  const schema = yup.object().shape({
    // iban: yup
    //   .string()
    //   .required()
    //   .matches(
    //     /^(?:(?:IT|SM)\d{2}[A-Z]\d{22}|CY\d{2}[A-Z]\d{23}|NL\d{2}[A-Z]{4}\d{10}|LV\d{2}[A-Z]{4}\d{13}|(?:BG|BH|GB|IE)\d{2}[A-Z]{4}\d{14}|GI\d{2}[A-Z]{4}\d{15}|RO\d{2}[A-Z]{4}\d{16}|KW\d{2}[A-Z]{4}\d{22}|MT\d{2}[A-Z]{4}\d{23}|NO\d{13}|(?:DK|FI|GL|FO)\d{16}|MK\d{17}|(?:AT|EE|KZ|LU|XK)\d{18}|(?:BA|HR|LI|CH|CR)\d{19}|(?:GE|DE|LT|ME|RS)\d{20}|IL\d{21}|(?:AD|CZ|ES|MD|SA)\d{22}|PT\d{23}|(?:BE|IS)\d{24}|(?:FR|MR|MC)\d{25}|(?:AL|DO|LB|PL)\d{26}|(?:AZ|HU)\d{27}|(?:GR|MU)\d{28})$/i,
    //     "Le format de l'IBAN n'est pas correct"
    //   ),
    email: yup.string().email("Formato de Email no valido!").required("requerido"),

    // telephone: yup
    //   .string()
    //   .required("Requis")
    //   .min(10, "10 chiffres requis")
    //   .max(10, "10 chiffres requis"),
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

  const Nombre = watch("Nombre");
  const Apellido = watch("Apellido");
  const postalCode = watch("postalCode");
  const region = watch("region");
  const email = watch("email");
  const telephone = watch("telephone");

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
      alert("Profesor Creado con Exito!");
    } catch (error) {
      console.log(error);
      alert("Error! No se pudo crear un profesor!");
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div>hola</div>
      <Container
        style={{ width: 700, backgroundColor: "grey", paddingTop: 50 }}
      >
        <form>
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
                  <p>Example de format d'email: example@domain.com</p>
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
                <option>Seleccione la Seccion</option>
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
          <button
            onClick={handleSubmit(onSubmit)}
            type="submit"
            className="btn btn-primary"
          >
            Sign in
          </button>
        </form>
      </Container>
    </div>
  );
};

export default Profesores;
