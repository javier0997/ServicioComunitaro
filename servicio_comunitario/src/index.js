import React from "react";
import App from "./App";
import ReactDOM from "react-dom";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";
import reportWebVitals from "./reportWebVitals";
import {AuthContext} from './context/auth';
import "./index.css";

const firebaseConfig = {
  apiKey: "AIzaSyBIj84REbwXKfkpfU76n4bR4xqyeCB9XPs",
  authDomain: "serviciocomunitario-2ca3f.firebaseapp.com",
  projectId: "serviciocomunitario-2ca3f",
  storageBucket: "serviciocomunitario-2ca3f.appspot.com",
  messagingSenderId: "361075919512",
  appId: "1:361075919512:web:03c590e108d06950135eed",
  measurementId: "G-7C3Y470ZK4",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
