import { sendFilesData } from "../../api/files";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/authProvider";
import { Toaster, toast } from "react-hot-toast";
import FoldersFilesContext from "../../context/Folders-Files/Folders_Files";
import { CrearNuevaPeticion } from "../../api/solicitudes";


function SeeFile({ closeModal, fileId, fileName }) {
    
    const [textAreaValue, setTextAreaValue] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);  // Agregar estado de procesamiento
    const { userName, userRole } = useContext(AuthContext);
    const { selectedFolder } = useContext(FoldersFilesContext);
    
    function handleChange(e) {
        setTextAreaValue(e.target.value);
    }
    
    const sendRequest = async (e) => {        
        e.preventDefault();
        setIsProcessing(true); // Bloquea el botón al comenzar el proceso
        
        try {
            const data = {            
                motivo_solicitud: textAreaValue,
                fileId: fileId                     
            };                              
            const response = await CrearNuevaPeticion(data);           

            if (response.data) {              
                toast.success("Su solicitud se ha enviado con éxito, en caso de que se apruebe podrá ver el archivo en su correo electrónico.");
            }
            
            closeModal();  // Cerrar el modal
        } catch (error) {            
            toast.error('Hay un error al enviar los datos.');
        } finally {
            setIsProcessing(false);  // Habilita el botón una vez finalizado el proceso
        }
    }

    return (
        <div id='PRUEBA' style={{
            position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            width: '964px', height: '350px', backgroundColor: 'white', display: 'flex',
            alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
            boxShadow: '0px 0px 10px rgba(0,0,0,0.9)', borderRadius: '15px'
        }}>
            <h1>Justifica por qué quieres enviar una petición para poder descargar el archivo "{fileName}"</h1>

            <form onSubmit={sendRequest}>
                <textarea
                    style={{ width: '600px' }}
                    className="h-40 border-black border"
                    placeholder="Explica por qué deseas ver el archivo"
                    onChange={handleChange}
                    value={textAreaValue}
                    required
                />
                <div style={{ display: 'flex', gap: '30px' }}>


                </div>
                <div style={{ display: 'flex', gap: '30px' }}>
                    <button
                        style={{ backgroundColor: 'red' }}
                        onClick={closeModal}
                    >
                        CANCELAR
                    </button>
                    <button
                        className={`rounded px-4 py-2 text-white flex items-center justify-center 
                            ${isProcessing ? "bg-gray-500 cursor-not-allowed" : "bg-green-900 hover:bg-green-700"}`}
                        type="submit"
                        disabled={isProcessing}  // Deshabilita el botón si está en proceso
                    >
                        {isProcessing ? (
                                <>
                                <svg
                                    className="animate-spin h-5 w-5 mr-2"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                    ></circle>
                                    <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v8H4z"
                                    ></path>
                                </svg>
                                Procesando...
                                </>
                            ) : (
                                "ACEPTAR"
                            )}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default SeeFile;
