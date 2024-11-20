import { sendFilesData } from "../../api/files";
import { useContext, useState, useEffect } from "react";
import { io } from "socket.io-client";
const socket = io("/")
import { AuthContext } from "../../context/authProvider";
import { Toaster,toast } from "react-hot-toast";
import FoldersFilesContext from "../../context/Folders-Files/Folders_Files";
import { enviarPeticion } from "../../api/solicitudes";


function SeeFile({closeModal, fileId, fileName}){
    
    const [textAreaValue, setTextAreaValue] = useState()
    const {userName, userRole}=useContext(AuthContext);
    const {selectedFolder} = useContext(FoldersFilesContext);

    console.log('Mi fileId desde gerencia y marca de agua es: ', fileId);
    

    function handleChange(e){
        setTextAreaValue(e.target.value);
    }
    

    const sendRequest = async(e)=>{        
        e.preventDefault();
        
        const data = {
            Nombre_de_solicitante: userName,
            motivo_solicitud: textAreaValue,
            fileId: fileId,
            Nombre_del_archivo: fileName,
            folder: selectedFolder
        };
        console.log(data);
        try{            

            console.log('Aqui')
            const response = await enviarPeticion(data);
            // console.log('data desde seefileee:', data)
            console.log('Aqui2')
            if(userRole=='OPE'){
                socket.emit('message', data);            
            }
            else{
                socket.emit('messageGerencia', data);
            }

            console.log('data emitida en el socket: ', data);
            toast.success("Su solicitud se ha enviado con éxito, en caso de que se apruebe podrá ver el archivo en su correo electrónico.")            
            closeModal();


        }catch(error){
            toast.error('hay un error al enviar los datos.');
        }
    }


    return(
            <div id='PRUEBA' style={{position:'fixed', top:'50%', left:'50%',transform: 'translate(-50%, -50%)',width:'964px', height:'350px', backgroundColor:'white', display:'flex',alignItems:'center', justifyContent:'center', flexDirection:'column', boxShadow: '0px 0px 10px rgba(0,0,0,0.9)', borderRadius:'15px'}}>
                <h1>¿Estás seguro que deseas enviar una solicitud para ver el archivo "{fileName}"?</h1>

                <form action="" onSubmit={sendRequest}>
                    <textarea 
                        style={{width:'600px'}} 
                        className="h-40 border-black border"
                        placeholder="Explica por que deseas ver el archivo" 
                        onChange={handleChange}
                        value={textAreaValue}
                        required>

                    </textarea>

                    <div style={{display:'flex', gap:'30px'}}>
                        <button style={{backgroundColor:'green'}} type="submit">ACEPTAR</button>
                        <button style={{backgroundColor:'red'}} onClick={closeModal}>CANCELAR</button>
                    </div>
                </form>                
                
            </div>
        
    )
}

export default SeeFile