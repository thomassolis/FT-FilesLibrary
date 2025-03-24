import { AuthContext } from "../../context/authProvider";
import { useContext, useState } from "react";
import {APIaprobacionGerencia } from "../../api/solicitudes";
import { APIaprobacionAdministrador } from "../../api/solicitudes";
import { toast } from "react-hot-toast";

function AprobacionGerencia({ approvedGER, onClose, Nombre_del_archivo, OPEUserName, OPEComment, onDecision, fileId, approvedADM, ID_Solicitudes }) 
{  
    const [textAreaValue, setTextAreaValue] = useState('');
    const [textAreaValueAdmin, setTextAreaValueAdmin] = useState('');
    const { userName, userRole } = useContext(AuthContext); 
    const [isProcessing, setIsProcessing] = useState(false); //Bloquea el botón
    
    function handleChange(e) {
        setTextAreaValue(e.target.value);
    }
    function handleChangeAdmin(e) {
        setTextAreaValueAdmin(e.target.value);
    }

    const aprobacionGerencia = async (event) => {
        event.preventDefault();
        setIsProcessing(true); // Bloquea el botón
    
        const data = {
            comentarioGerente: textAreaValue,
            approvedGER: approvedGER,
            ID_Solicitudes: ID_Solicitudes,
        };
    
        try {
            const response = await APIaprobacionGerencia(data);
            console.log('response desde APIaprobacionGerencia')
            onDecision(ID_Solicitudes);
            onClose(); // Cerrar el modal           
        } catch (error) {
            toast.error('Hay un error en la aprobación');
        } finally {
            setIsProcessing(false); // Habilita el botón nuevamente
        }
    };
    

    const aprobacionAdmin =async(e)=>{     
        e.preventDefault();
        setIsProcessing(true); //Bloquea el botón
        const dataAdmin = {                
            fileId: fileId,                                                      
            approvedADM: approvedADM ,
            comentarioAdministracion:  textAreaValueAdmin,
            ID_Solicitudes: ID_Solicitudes               
        };

        try{
            const adminResponse = await APIaprobacionAdministrador(dataAdmin);   
            onDecision(ID_Solicitudes);
            onClose(); // Cerrar el modal

            if(adminResponse.success){
                toast.success(adminResponse.message);
            }else{
                toast.error(adminResponse.message);
            }
        }catch(e){
            console.error('Hay un error en la aprobación', e)  
        }
    }

    return (
        <div style={{position:'fixed', top:'50%', left:'50%',transform: 'translate(-50%, -50%)',width:'964px', height:'350px', backgroundColor:'white', display:'flex',alignItems:'center', justifyContent:'center', flexDirection:'column', boxShadow: '0px 0px 10px rgba(0,0,0,0.9)', borderRadius:'15px'}}>
            <iconify-icon style={{position:'absolute', top:'10px', right:'10px', fontSize:'20px', cursor:'pointer'}} onClick={onClose} icon="zondicons:close"></iconify-icon>

            <h1>{approvedGER}</h1>

            {userRole==='GER' && approvedGER === true ? (
                <div>
                    <h1>¿Estás seguro que deseas brindarle permiso de descarga?</h1>
                    <form className="w-full flex flex-col items-center" onSubmit={aprobacionGerencia}>
                        <textarea 
                            className="w-[90%] border h-28 border-black " 
                            placeholder="Escribe una justificación"
                            onChange={handleChange}
                            value={textAreaValue}
                            required
                        />
                        <div className="flex gap-5">
                        <button
                            className={`rounded px-4 py-2 text-white flex items-center pr-12 pl-12 justify-center 
                                ${isProcessing ? "bg-gray-500 cursor-not-allowed" : "bg-green-900 hover:bg-green-700"}`}
                            type="submit"
                            disabled={isProcessing}
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
                                "Enviar"
                            )}
                        </button>         

                        </div>
                    </form>
                </div>
            ) : userRole==='GER' && approvedGER === false && (
                <div>
                    <h1>¿Estás seguro que NO deseas brindar permiso para descargar el archivo?</h1>
                    <form className="w-full flex flex-col items-center" onSubmit={aprobacionGerencia}>
                        <textarea 
                            className="w-[90%] border h-28 border-black" 
                            placeholder="Escribe una justificación"
                            onChange={handleChange}
                            value={textAreaValue}
                            required
                        />
                        <div className="flex gap-5">
                            <button className={`w-24 rounded
                                        ${isProcessing ? "bg-gray-500 cursor-not-allowed" : "bg-green-900 hover:bg-green-700"}`}

                                    type="submit"
                                    disabled={isProcessing} // Bloquea el botón
                                >
                                Enviar
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {(userRole === 'ADM' || userRole === 'CEO') && approvedADM === true && (
                <div className="flex flex-col justify-center items-center">
                    <h1>¿Estás seguro que deseas brindarle permiso de descarga?</h1>
                    <form className="w-full flex flex-col items-center" onSubmit={aprobacionAdmin}>
                        <textarea 
                            className="w-[90%] border h-28 border-black max-w-screen-md" 
                            placeholder="Escribe una justificación"
                            onChange={handleChangeAdmin}
                            value={textAreaValueAdmin}
                            required
                        />                        
                        <div className="flex gap-5 flex-col items-center justify-center w-full">
                        <button
                            className={`rounded px-4 py-2 text-white flex items-center justify-center 
                                ${isProcessing ? "bg-gray-500 cursor-not-allowed" : "bg-green-900 hover:bg-green-700"}`}
                            type="submit"
                            disabled={isProcessing}
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
                                "Enviar"
                            )}
                        </button>                              
                            
                        </div>
                    </form>
                    
                </div>
            )}

            {(userRole === 'ADM' || userRole === 'CEO') && approvedADM === false && (
                <div >
                    <h1>¿Estás seguro que NO deseas brindar permiso para descargar el archivo?</h1>
                    <form className="w-full flex flex-col items-center" onSubmit={aprobacionAdmin}>
                        <textarea 
                            className="w-[90%] border h-28 border-black" 
                            placeholder="Escribe una justificación"
                            onChange={handleChangeAdmin}
                            value={textAreaValueAdmin}
                            required
                        />
                        <div className="flex gap-5">
                            <button className={`w-24 rounded
                                ${isProcessing ? "bg-gray-500 cursor-not-allowed" : "bg-green-900 hover:bg-green-700"}`}

                                type="submit"
                                disabled={isProcessing} // Bloquea el botón
                                >
                                Enviar
                            </button>
                        </div>
                    </form>
                </div>
            )}

        </div>
    );
}

export default AprobacionGerencia;
