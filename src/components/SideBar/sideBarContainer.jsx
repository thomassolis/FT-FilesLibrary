import Title from "../title";
import FoalderSidebar from "./foalderSidebar";
import { useContext, useState } from "react";
import FilesContainer from "../files/filesContainer";
import Files from "../files/files";
import {FoldersFilesContext} from "../../context/Folders-Files/Folders_Files";


function SidebarContainer({foalderData, filesData}){  
    // const [selectedFolder, setSelectedFolder] = useState(null);
    // const [selectedFiles, setSelectedFiles] = useState([])

    const {selectedFolder, setSelectedFolder} = useContext(FoldersFilesContext);

    const handleFolderClick = (foalder) =>{
        console.log('folder seleccionado: ', foalder)
        setSelectedFolder(foalder);             
    }

    console.log('desde sidebar: ',foalderData);

    return(
        <div style={{width:'25vw', height:'100%', backgroundColor:'rgba(0, 0, 112, 1)', display:'flex', flexDirection:'column', gap:'30px', position:'fixed'}}>
            <div>
                <Title/>
            </div>


            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                {/* Renderizar la lista de carpetas */}
                {foalderData.map((foalder, index) => (
                    <div key={index} onClick={() => handleFolderClick(foalder)}>
                        <FoalderSidebar foalderName={foalder} />
                    </div>
                ))}
            </div>

            {/* {selectedFolder && filesData[selectedFolder].files?(
                filesData[selectedFolder].files.map((file)=>(
                    <FilesContainer fileData={filesData[selectedFolder].files}/>

                    // <Files key={file.id} fileName={file.name} fileId={file.id}/>
                ))
            ):(
                <p>No files available</p>            
            )} */}
            
        </div>
    )
}

export default SidebarContainer;