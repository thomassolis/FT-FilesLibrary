import SeeFile from "./seeFile";
import { useState, useEffect } from "react";
import { previsualizarArchivos } from "../../api/files";
import { FadeLoader } from 'react-spinners';

function SeeFileWaterBrand({closeModal, fileName, fileId}){
    const [sendRequest, setSendRequest] = useState(false);
    const [pdfUrl, setPdfUrl] = useState(null);

    useEffect(() => {
        const pedirArchivos = async () => {
            try {
                const pdfBlob = await previsualizarArchivos({ fileId });
    
                if (!(pdfBlob instanceof Blob)) {
                    throw new Error('La respuesta no es un Blob válido.');
                }
    
                const pdfUrl = URL.createObjectURL(pdfBlob); // Crea una URL para el Blob
                setPdfUrl(pdfUrl);
            } catch (error) {
                console.error('Error al cargar el archivo:', error);
            }
        };
    
        pedirArchivos();
    
        // Limpieza de la URL del Blob cuando el componente se desmonte
        return () => {
            if (pdfUrl) {
                URL.revokeObjectURL(pdfUrl);
            }
        };
    }, [fileId]);
     

    function request(){
       
        setSendRequest(true);        
    }

    return(
        <div
        className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
        >
            <div className="bg-white w-3/4 max-w-4xl rounded-lg shadow-lg flex flex-col items-center justify-center p-6 relative h-full">
                <iconify-icon
                style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    color: 'black',
                    fontSize: '30px',
                    cursor: 'pointer',
                }}
                onClick={closeModal}
                icon="carbon:close-filled"
                ></iconify-icon>
                <h1 className="font-serif text-xl text-center mb-4">{fileName}</h1>
                {pdfUrl ? (
                <iframe
                    src={pdfUrl}
                    className="w-full rounded-lg"
                    style={{
                    height: '500px',
                    border: 'none',
                    }}
                    title="PDF Preview"
                ></iframe>
                ) : (
                    <FadeLoader size={15} />
                )}
                <div className="mt-5 text-center">
                <p className="font-serif">
                    ¿Deseas solicitar este archivo para descargar sin marca de agua?
                </p>
                <button
                    style={{
                    backgroundColor: 'green',
                    color: 'white',
                    padding: '10px 20px',
                    borderRadius: '5px',
                    marginTop: '10px',
                    cursor: 'pointer',
                    }}
                    onClick={request}
                >
                    Solicitar
                </button>
                </div>
                {sendRequest && (
                <SeeFile fileName={fileName} fileId={fileId} closeModal={closeModal} />
                )}
            </div>
        </div>        
    )
}

export default SeeFileWaterBrand;