import { AuthContext } from "../../context/authProvider";
import { useContext, useState } from "react";
import { CrearNuevaPeticion, APIaprobacionGerencia } from "../../api/solicitudes";
import { io } from "socket.io-client";
import { enviarPeticionAdmin } from "../../api/solicitudes";
import { Toaster, toast } from "react-hot-toast";



const socket = io("/");

function AprobacionGerencia({ approvedGER, onClose, Nombre_del_archivo, OPEUserName, OPEComment, onDecision, fileId, approvedADM, ID_Solicitudes }) 
{
    const [textAreaValue, setTextAreaValue] = useState('');
    const [textAreaValueAdmin, setTextAreaValueAdmin] = useState('');
    const { userName, userRole } = useContext(AuthContext);    
    function handleChange(e) {
        setTextAreaValue(e.target.value);
    }
    function handleChangeAdmin(e) {
        setTextAreaValueAdmin(e.target.value);
    }

    const aprobacionGerencia = async (event) => {
        event.preventDefault();

        const data = {
            // userName: userName,
            comentarioGerente: textAreaValue,  
            // fileId: fileId,          
            // Nombre_del_archivo: Nombre_del_archivo,
            // OPEUserName: OPEUserName,
            // OPEComment: OPEComment,
            approvedGER: approvedGER,
            // approvedADM: approvedADM ,
            // comentarioAdministracion:  textAreaValueAdmin,
            ID_Solicitudes: ID_Solicitudes            
        };


        try {                                    

            await APIaprobacionGerencia(data);            

            if(approvedGER === true){
                //Solo emitir a admin en caso que el gerente lo haya aprobado
                socket.emit('messageGerencia', data);
            }            

            // Llamamos a la función para eliminar el registro del historial
            onDecision(ID_Solicitudes);
            onClose(); // Cerrar el modal
        } catch (error) {
            console.log(error)
            toast.error('Hay un error en la aprobación');            
        }
    };

    const aprobacionAdmin =async(e)=>{     
        e.preventDefault();
        const dataAdmin = {                
            fileId: fileId,                                                      
            approvedADM: approvedADM ,
            comentarioAdministracion:  textAreaValueAdmin,
            ID_Solicitudes: ID_Solicitudes               
        };

        console.log(textAreaValueAdmin);
        console.log(fileId);
        console.log(ID_Solicitudes);
        try{
            await enviarPeticionAdmin(dataAdmin);
        }catch(e){
            toast.error('Hay un error en la aprobación')  
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
                            <button className="bg-green-900 w-24" type="submit">Enviar</button>
                        </div>
                    </form>
                </div>
            ) : userRole==='GER' && approvedGER === false && (
                <div>
                    <h1>¿Estás seguro que NO deseas brindar permiso?</h1>
                    <form className="w-full flex flex-col items-center" onSubmit={aprobacionGerencia}>
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
                    <form className="w-full flex flex-col items-center" onSubmit={aprobacionAdmin}>
                        <textarea 
                            className="w-[90%] border h-28 border-black " 
                            placeholder="Escribe una justificación"
                            onChange={handleChangeAdmin}
                            value={textAreaValueAdmin}
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
                    <h1>¿Estás seguro que NO deseas brindar permiso desde Admin?</h1>
                    <form className="w-full flex flex-col items-center" onSubmit={aprobacionAdmin}>
                        <textarea 
                            className="w-[90%] border h-28 border-black" 
                            placeholder="Escribe una justificación"
                            onChange={handleChangeAdmin}
                            value={textAreaValueAdmin}
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
