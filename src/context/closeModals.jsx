import React, { createContext, useState, useContext } from "react";

// Crear el contexto
export const ModalContext = createContext();

// Proveedor del contexto
export const ModalProvider = ({ children }) => {
  const [previsualizeFile, setPrevisualizeFile] = useState(false);
  const [modalSeeFileWaterBrand, setModalSeeFileWaterBrand] = useState(false);
  const [modalSeeFile, setModalSeeFile] = useState(false);

  return (
    <ModalContext.Provider
      value={{
        previsualizeFile,
        setPrevisualizeFile,
        modalSeeFileWaterBrand, 
        setModalSeeFileWaterBrand,
        modalSeeFile,
        setModalSeeFile
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;