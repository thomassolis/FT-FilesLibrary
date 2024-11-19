import React from "react";
import { Icon } from '@iconify/react';  // Importa Icon desde la librería
import { AuthContext } from "../../context/authProvider";
import PermissionsContext from "../../context/permissions/permissionsProvider";
import { useContext, useState } from "react";
import SeeFile from "../Modal/seeFile";
import SeeFileWaterBrand from "../Modal/seeFileWaterBrand";
import PrevisualizeFile from "../Modal/PrevisualizeFile";

function Files({fileId, fileName}){

    const {requestSeeFile, setRequestSeeFile} = useContext(PermissionsContext)
    const {userRole, setUserRole} = useContext(AuthContext);

    const [modalSeeFile, setModalSeeFile] = useState(false);
    const [modalSeeFileWaterBrand, setModalSeeFileWaterBrand] = useState(false);
    const [previsualizeFile, setPrevisualizeFile] = useState(false);

    const handleOpenFile = () =>{
       
        if(userRole === 'OPE' && requestSeeFile===true){
            setModalSeeFile(true);
        }
        if(userRole === 'GER'){
            setModalSeeFileWaterBrand(true);
          
        }
        if(userRole === 'ADM'){
            setPrevisualizeFile(true);          
        }
    }

    const close =() =>{
        if(modalSeeFile && userRole == 'OPE'){
            setModalSeeFile(false);
        }else if(modalSeeFileWaterBrand && userRole == 'GER'){
            setModalSeeFileWaterBrand(false);                    
        }else if(previsualizeFile){
            setPrevisualizeFile(false);
        }
        
    }

    return(
        <div className="flex flex-col items-center justify-center p-1">

            <iconify-icon className="w-24 h-16 cursor-pointer" style={{fontSize:'60px'}} onClick={handleOpenFile} icon="vscode-icons:file-type-pdf2"></iconify-icon>
            
            {/* <Icon icon="fluent:document-pdf-32-regular" className="w-24 h-16 cursor-pointer" onClick={handleOpenFile}/>              */}
            <p className="w-full break-words whitespace-pre-wrap overflow-hidden text-center">{fileName}</p>

            {modalSeeFile && <SeeFile closeModal={close} fileId={fileId} fileName={fileName}/>}

            {modalSeeFileWaterBrand && (                         
                <SeeFileWaterBrand closeModal={close} fileName={fileName} fileId={fileId} />     
                                                                                     
            )}


            {previsualizeFile && <PrevisualizeFile closeModal={close} fileName={fileName} userRole={userRole} fileId={fileId}/>}
        </div>
    )
}
export default Files;