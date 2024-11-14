import SeeFile from "./seeFile";
import { useState } from "react";


function SeeFileWaterBrand({closeModal, fileName}){
    const [sendRequest, setSendRequest] = useState(false);



    function request(){
       
        setSendRequest(true);        
    }

    return(
        <div style={{position:'fixed', top:'50%', left:'50%',transform: 'translate(-50%, -50%)',width:'750px', height:'600px', backgroundColor:'white', display:'flex',alignItems:'center', justifyContent:'center', flexDirection:'column', boxShadow: '0px 0px 10px rgba(0,0,0,0.9)', borderRadius:'15px', zIndex:'100'}}>
            <iconify-icon style={{position:'absolute', top:'-8px', right:'-12px', color:'black', fontSize:'30px', cursor:'pointer'}} onClick={closeModal} icon="carbon:close-filled"></iconify-icon>
            <div>

            </div>

            <div>
                <p>¿Deseas solicitar este archivo para descargar sin marca de agua?</p>
                <button style={{backgroundColor:'green'}} onClick={request}>Solicitar</button>
            </div>

            {sendRequest && <SeeFile fileName={fileName} closeModal={closeModal}/>

            }
            
        </div>
    )
}

export default SeeFileWaterBrand;