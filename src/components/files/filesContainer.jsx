import Files from "./files";
// import logo from "../../images/MLC logo.png"
import HeaderFiles from "./headerFiles";
import '../../Styles/filesContainer.css'
import DragAndDrop from "../dragDrop";
import SubFolder from "./subFolder";
import { useState } from "react";


function FilesContainer({fileData, album}){
    const [selectedSubFolder, setSelectedSubFolder] = useState(null);
    const folders = Object.keys(album).filter(key => key !== 'files'); // Filtra todas las claves que no sean 'files'
    const files = album.files || []; // Toma solo el arreglo de archivos en la carpeta actual

    console.log('fileData desde fileontainer: ', fileData)
    console.log('album: ', album);
    return(
        <div  className="pb-10 w-full flex flex-col">
            <HeaderFiles/>

             {/*RENDERIZA SUBCARPETAS Y SUS ARCHIVOS*/}
            <div id="Grid-Folders" className="grid grid-cols-5 items-center content-center  ml-6">
                {folders.map((folderName)=>(
                    <div key={folderName} id="subfolder">
                        <SubFolder folderName={folderName} album={album} onSelect={() => setSelectedSubFolder(folderName)} />
                    </div>    
                ))}
            </div>



            <div id="Grid-Archivos" className="grid grid-cols-4 items-center content-center gap-y-8 ml-6 ">
                {fileData.map((file) => (
                    <Files key={file.id} fileName={file.name} fileId={file.id} className="break-words"/>
                ))}
            </div>

            
        </div>

    )
}
export default FilesContainer;