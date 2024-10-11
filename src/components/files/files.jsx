import React from "react";
import { Icon } from '@iconify/react';  // Importa Icon desde la librería
import { AuthContext } from "../../context/authProvider";
import PermissionsContext from "../../context/permissions/permissionsProvider";
import { useContext, useState } from "react";
import SeeFile from "../Modal/seeFile";
import SeeFileWaterBrand from "../Modal/seeFileWaterBrand";

function Files({fileId, fileName}){

    const {requestSeeFile, setRequestSeeFile} = useContext(PermissionsContext)
    const {userRole, setUserRole} = useContext(AuthContext);

    const [modalSeeFile, setModalSeeFile] = useState(false);
    const [modalSeeFileWaterBrand, setModalSeeFileWaterBrand] = useState(false);

    const handleOpenFile = () =>{
       
        if(userRole === 'OPE' && requestSeeFile===true){
            setModalSeeFile(true);
        }
        if(userRole === 'GER'){
            setModalSeeFileWaterBrand(true);
          
        }
    }

    const close =() =>{
        if(modalSeeFile && userRole == 'OPE'){
            setModalSeeFile(false);
        }else if(modalSeeFileWaterBrand){
            setModalSeeFileWaterBrand(false);        
        }
        
    }

    return(
        <div style={{backgroundColor:'rgba(172, 207, 217, 1)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
            {/* <iconify-icon style={{margin:'0', padding:'0',width:'90px', color:'black', fontSize:'70px'}} icon="vscode-icons:file-type-pdf2"></iconify-icon> */}
            <Icon style={{width:'90px', color:'black', height:'70px', cursor:'pointer'}} icon="fluent:document-pdf-32-regular" onClick={handleOpenFile}/>             
            <p style={{margin:'0px', padding:'0'}}>{fileName}</p>

            {modalSeeFile && <SeeFile closeModal={close} fileId={fileId} fileName={fileName}/>

            }

            {modalSeeFileWaterBrand && <SeeFileWaterBrand closeModal={close} fileName={fileName}/>

            }
        </div>
    )
}
export default Files;