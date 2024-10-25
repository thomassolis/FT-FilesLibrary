import { AuthContext } from "../../context/authProvider";
import { useContext, useState } from "react";
import { postAprobacionGerencia } from "../../api/auth";
import { io } from "socket.io-client";

import { Toaster, toast } from "react-hot-toast";



const socket = io("/");

function AprobacionGerencia({ approvedGER, onClose, fileName, OPEUserName, OPEComment, onDecision, fileId, approvedADM }) 
{
    const [textAreaValue, setTextAreaValue] = useState('');
    const { userName, userRole } = useContext(AuthContext);

    console.log(approvedADM)
    console.log(userRole)


    function handleChange(e) {
        setTextAreaValue(e.target.value);
    }

    const aprobacion = async (e) => {
        e.preventDefault();

        const data = {
            userName: userName,
            textAreaValue: textAreaValue,  
            fileId: fileId,          
            fileName: fileName,
            OPEUserName: OPEUserName,
            OPEComment: OPEComment,
            approvedGER: approvedGER
        };

        try {                                    

            if(approvedGER === true){
                await postAprobacionGerencia(data);
                socket.emit('messageGerencia', data);
            }            

            // Llamamos a la función para eliminar el registro del historial
            onDecision(fileName, OPEUserName);
            onClose(); // Cerrar el modal
        } catch (error) {
            toast.error('Hay un error en la aprobación')            
        }
    };

    return (
        <div style={{position:'fixed', top:'50%', left:'50%',transform: 'translate(-50%, -50%)',width:'964px', height:'350px', backgroundColor:'white', display:'flex',alignItems:'center', justifyContent:'center', flexDirection:'column', boxShadow: '0px 0px 10px rgba(0,0,0,0.9)', borderRadius:'15px'}}>
            <iconify-icon style={{position:'absolute', top:'10px', right:'10px', fontSize:'20px', cursor:'pointer'}} onClick={onClose} icon="zondicons:close"></iconify-icon>

            {userRole==='GER' && approvedGER === true ? (
                <div>
                    <h1>¿Estás seguro que deseas brindarle permiso de descarga?</h1>
                    <form className="w-full flex flex-col items-center" onSubmit={aprobacion}>
                        <textarea 
                            className="w-[90%] border h-28 border-black " 
                            placeholder="Escribe una justificación"
                            onChange={handleChange}
                            value={textAreaValue}
                            required
                        />
                        <div className="flex gap-5">
                            <button className="bg-green-900 w-24" type="submit">Enviar</button>
                        </div>
                    </form>
                </div>
            ) : approvedGER === false && (
                <div>
                    <h1>¿Estás seguro que NO deseas brindar permiso?</h1>
                    <form className="w-full flex flex-col items-center" onSubmit={aprobacion}>
                        <textarea 
                            className="w-[90%] border h-28 border-black" 
                            placeholder="Escribe una justificación"
                            onChange={handleChange}
                            value={textAreaValue}
                            required
                        />
                        <div className="flex gap-5">
                            <button className="bg-green-900 w-24" type="submit">Enviar</button>
                        </div>
                    </form>
                </div>
            )}

            {userRole === 'ADM' && approvedADM === true && (
                <div>
                    <h1>¿Estás seguro que deseas brindarle permiso de descarga desde Admin?</h1>
                    <form className="w-full flex flex-col items-center" onSubmit={aprobacion}>
                        <textarea 
                            className="w-[90%] border h-28 border-black " 
                            placeholder="Escribe una justificación"
                            onChange={handleChange}
                            value={textAreaValue}
                            required
                        />
                        <div className="flex gap-5">
                            <button className="bg-green-900 w-24" type="submit">Enviar</button>
                        </div>
                    </form>
                </div>
            )}

            {userRole === 'ADM' && approvedADM === false && (
                <div>
                    <h1>¿Estás seguro que NO deseas brindar permiso?</h1>
                    <form className="w-full flex flex-col items-center" onSubmit={aprobacion}>
                        <textarea 
                            className="w-[90%] border h-28 border-black" 
                            placeholder="Escribe una justificación"
                            onChange={handleChange}
                            value={textAreaValue}
                            required
                        />
                        <div className="flex gap-5">
                            <button className="bg-green-900 w-24" type="submit">Enviar</button>
                        </div>
                    </form>
                </div>
            )}

        </div>
    );
}

export default AprobacionGerencia;
