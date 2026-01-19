import { useEffect, useState } from "react";
import { previsualizarArchivos } from "../../api/files"; // Asegúrate de que esta función solicite el link
import { FadeLoader } from "react-spinners";
import { useContext } from "react";
import CountDown from "../countDown";
import { ModalContext } from "../../context/closeModals";
import { AuthContext } from "../../context/authProvider";



function PrevisualizeFile({ fileName, fileId }) {
  const [pdfUrl, setPdfUrl] = useState(null); // Ahora se espera un enlace
  const { setPrevisualizeFile } = useContext(ModalContext);
  const {userRole} = useContext(AuthContext);
  function closeModal() {
    setPrevisualizeFile(false);
  }

  useEffect(() => {
    const pedirArchivos = async () => {
      try {
        const response = await previsualizarArchivos({ fileId, userRole }); // Asegúrate de que esta función devuelva { 
        // success: true, link: "url" }    
        if (response.success && response.link) {
          setPdfUrl(response.link); // Guarda el enlace embebible en el estado
        } else {
          throw new Error("No se pudo obtener el enlace del archivo");
        }
      } catch (error) {
        console.error("Error al solicitar archivo:", error);
      }
    };

    pedirArchivos();
  }, [fileId]);

  return (
    <div
      id="ADMIN"
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
    >
      <div className="bg-white w-3/4 max-w-4xl rounded-lg shadow-lg flex flex-col items-center justify-center p-6 relative h-full">
        <iconify-icon
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            color: "black",
            fontSize: "30px",
            cursor: "pointer",
          }}
          onClick={closeModal}
          icon="carbon:close-filled"
        ></iconify-icon>

        <h1 className="font-serif text-xl text-center mb-4">{fileName}</h1>
        {pdfUrl ? (
          <iframe
            src={pdfUrl} // Usa el enlace proporcionado por el backend
            className="w-full rounded-lg"
            style={{
              height: "500px",
              border: "none",
              paddingBottom: "20px",
            }}
            title="PDF Preview"
          ></iframe>
        ) : (
          <FadeLoader size={15} />
        )}
        <CountDown seconds={300} message="El archivo será eliminado en: " />
      </div>
    </div>
  );
}

export default PrevisualizeFile;
