import { sendFilesData } from "../../api/auth";
import { useContext, useState, useEffect } from "react";
import { io } from "socket.io-client";
const socket = io("/")
import { AuthContext } from "../../context/authProvider";

function SeeFile({closeModal, fileId, fileName}){

    const [textAreaValue, setTextAreaValue] = useState()
    const {userName}=useContext(AuthContext);
    

    function handleChange(e){
        setTextAreaValue(e.target.value);
    }
    
    
    const sendRequest = async(e) =>{
        e.preventDefault();
        const data = {
            userName: userName,
            textAreaValue: textAreaValue,
            fileId: fileId,
            fileName: fileName
        }        

        socket.emit('message', data);
        // try{
        //     const response = await sendFilesData({fileId, fileName, textAreaValue});
        //     console.log('respuesta', response);
        //     // console.log('response desde seeFile:', response)
        // }catch(error){
        //     console.log('error')
        // }

        alert("Su solicitud se ha enviado con éxito, en caso de que se apruebe podrá ver el archivo en su correo electrónico.")

        closeModal();
    }

    
    // useEffect(()=>{
    //     // CUANDO ESCUCHES UN EVENTO LLAMADO MESSAGE VAMOS A RECIBIR UN MENSAGE
    //     socket.on('message', data =>{
    //         console.log('soy un mensaje: ', data);
    //     }) 
    // }, [])

    return(
            <div style={{position:'fixed', top:'50%', left:'50%',transform: 'translate(-50%, -50%)',width:'964px', height:'350px', backgroundColor:'white', display:'flex',alignItems:'center', justifyContent:'center', flexDirection:'column', boxShadow: '0px 0px 10px rgba(0,0,0,0.9)', borderRadius:'15px'}}>
                <h1>¿Estás seguro que deseas enviar una solicitud para ver el archivo "{fileName}"?</h1>

                <form action="" onSubmit={sendRequest}>
                    <textarea 
                        style={{width:'600px', height:'150px'}} 
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