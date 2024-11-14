import { useState, useEffect } from "react";
import '../Styles/DragAnsDropStyles.css';
import { sendFilesFromAdmin } from "../api/auth";

const DragAndDrop = ({ passFunctionToParent }) => {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (event) => {
    event.preventDefault(); // Evita el comportamiento predeterminado del navegador
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);

    // Verificar si se arrastraron múltiples archivos
    if (event.dataTransfer.files.length > 1) {
      alert("Solo puedes arrastrar un archivo");
      event.target.value = null;
      setFile(null);
      return;
    }

    // Guardar el archivo arrastrado
    setFile(event.dataTransfer.files[0]);
  };

  const handleFileUpload = async () => {
    const formData = new FormData();
    if (file) {
      formData.append("files", file); // Añadir el archivo seleccionado

      try {
        const response = await sendFilesFromAdmin(formData);
        console.log('response: ', response);
        if (response) {
          console.log([...formData]);
        }
      } catch (e) {
        alert(e);
      }
    } else {
      alert("No hay archivo para subir");
    }
  };

  const handleFileChange = (event) => {
    if (!event.target.files || event.target.files.length === 0) {
      return;
    }

    // Verificar si hay múltiples archivos seleccionados
    if (event.target.files.length > 1) {
      alert("Solo puedes seleccionar un archivo a la vez");
      event.target.value = null;
      setFile(null);
      return;
    }

    // Guardar el archivo seleccionado
    setFile(event.target.files[0]);
  };

  // Pasar la función handleFileUpload al componente padre
  useEffect(() => {
    if (typeof passFunctionToParent === 'function') {
      passFunctionToParent(handleFileUpload);
    }
  }, [passFunctionToParent, file]);

  useEffect(() => {
    console.log('Archivo actualizado:', file);
  }, [file]);

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`dropzone ${isDragging ? "dragging" : ""}`}
    >
      <p>
        {isDragging
          ? "Suelta el archivo aquí"
          : <iconify-icon style={{color:'#333', fontSize:'60px'}} icon="line-md:upload-loop"></iconify-icon>}
      </p>
      <input
        type="file"
        onChange={handleFileChange}
        style={{ display: "none" }}
        id="fileInput"
        name="files"
      />
      <label htmlFor="fileInput" className="upload-btn">
        Seleccionar Archivo
      </label>

      {/* Mostrar el archivo seleccionado */}
      {file && (
        <div>
          <h4>Archivo seleccionado:</h4>
          <p>{file.name}</p>
        </div>
      )}
    </div>
  );
};

export default DragAndDrop;
