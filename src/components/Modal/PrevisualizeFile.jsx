import { useEffect, useState } from "react";
import { previsualizarArchivos } from "../../api/files";

function PrevisualizeFile({ closeModal, fileName, fileId }) {
    const [pdfUrl, setPdfUrl] = useState(null);

    useEffect(() => {
        const pedirArchivos = async () => {
            try {                
                const pdfBlob = await previsualizarArchivos({ fileId });
                const pdfUrl = URL.createObjectURL(pdfBlob); // Crea una URL para el blob
                setPdfUrl(pdfUrl);
            } catch (error) {
                console.log(error);
            }
        };
        pedirArchivos();

        // Limpieza de la URL del blob cuando el componente se desmonte
        return () => {
            if (pdfUrl) {
                URL.revokeObjectURL(pdfUrl);
            }
        };
    }, [fileId]);    

    return (
        <div style={{
            position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', 
            width: '750px', height: '600px', backgroundColor: 'white', display: 'flex',
            alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
            boxShadow: '0px 0px 10px rgba(0,0,0,0.9)', borderRadius: '15px', zIndex: '100'
        }}>
            <iconify-icon
                style={{ position: 'absolute', top: '-8px', right: '-12px', color: 'black', fontSize: '30px', cursor: 'pointer' }}
                onClick={closeModal}
                icon="carbon:close-filled">
            </iconify-icon>
            <div>
                <h1>{fileName}</h1>
                {pdfUrl ? (
                    <iframe
                        src={pdfUrl}
                        style={{ width: '100%', height: '500px' }}
                        title="PDF Preview"
                    ></iframe>
                ) : (
                    <p>Cargando archivo...</p>
                )}
            </div>
        </div>
    );
}

export default PrevisualizeFile;
