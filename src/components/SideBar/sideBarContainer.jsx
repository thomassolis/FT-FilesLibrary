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

    // console.log('desde sidebar: ',foalderData);

    return(
        <div className="w-[22%] bg-customSidebarColor flex flex-col gap-12 flex-shrink-0">

            <div>
                <Title/>
            </div>


            <div className="flex flex-col gap-6">
                {/* Renderizar la lista de carpetas */}
                {foalderData.map((foalder, index) => (
                    <div key={index} onClick={() => handleFolderClick(foalder)} className="flex items-center justify-center">
                        <FoalderSidebar foalderName={foalder} />
                    </div>
                ))}
            </div>            
        </div>
    )
}

export default SidebarContainer;