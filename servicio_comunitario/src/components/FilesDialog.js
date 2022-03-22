import React, { useState, useEffect } from "react";
import firebase from "firebase/app";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export const FilesDialog = ({ data, respuesta }) => {
  const storage = firebase.storage();

  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    fetchUrls(data);
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

  return (
    <div>
      <button type="button" onClick={handleClickOpen} class="btn btn-outline-info">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          class="bi bi-file-earmark-arrow-down"
          viewBox="0 0 16 16"
        >
          <path d="M8.5 6.5a.5.5 0 0 0-1 0v3.793L6.354 9.146a.5.5 0 1 0-.708.708l2 2a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0-.708-.708L8.5 10.293V6.5z" />
          <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z" />
        </svg>
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
      >
        {respuesta? 
          <>
          <DialogTitle id="alert-dialog-title">
             {"Archivo de respuesta:"}
          </DialogTitle>
          </>
          :
          <DialogTitle id="alert-dialog-title">
             {"Archivo de la Asignacion:"}
           </DialogTitle>
        }
        
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {files.map((file) => (
              <p>
                <a
                  className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
                  href={file.url}
                  target="_blank"
                >
                  {file.fileName}
                </a>
              </p>
            ))}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} class="btn btn-outline-primary">
            Atras
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
