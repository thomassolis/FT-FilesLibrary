import { sendFilesData } from "../../api/auth";
import { useContext, useState, useEffect } from "react";
import { io } from "socket.io-client";
const socket = io("/")
import { AuthContext } from "../../context/authProvider";
import { postAprobacionGerencia } from "../../api/auth";
import { Toaster,toast } from "react-hot-toast";
import FoldersFilesContext from "../../context/Folders-Files/Folders_Files";



function SeeFile({closeModal, fileId, fileName}){
    
    const [textAreaValue, setTextAreaValue] = useState()
    const {userName, userRole}=useContext(AuthContext);
    const {selectedFolder} = useContext(FoldersFilesContext);

 
    

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
        try{            
            // console.log('data desde seefileee:', data)
            const response = await postAprobacionGerencia(data);
            // console.log('data desde seefileee:', data)

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
            toast.error('hay un error');
        }
    }


    return(
            <div style={{position:'fixed', top:'50%', left:'50%',transform: 'translate(-50%, -50%)',width:'964px', height:'350px', backgroundColor:'white', display:'flex',alignItems:'center', justifyContent:'center', flexDirection:'column', boxShadow: '0px 0px 10px rgba(0,0,0,0.9)', borderRadius:'15px'}}>
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