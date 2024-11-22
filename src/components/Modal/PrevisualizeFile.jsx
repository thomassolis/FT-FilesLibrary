import { useEffect, useState } from "react";
import { previsualizarArchivos } from "../../api/files";
import { FadeLoader } from 'react-spinners';
import CountDown from "../countDown";
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
                        paddingBottom:'20px'
                        }}
                        title="PDF Preview"
                    ></iframe>
                
                ) : (
                    <FadeLoader size={15}/>
                )}
                <CountDown seconds={300} className=""/>
                 
          

            </div>
        </div>
    );
}

export default PrevisualizeFile;
