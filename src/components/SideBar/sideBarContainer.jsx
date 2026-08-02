import Title from "../title";
import FolderSidebar from "./folderSidebar";
import { useContext, useState } from "react";
import FilesContainer from "../files/filesContainer";
import Files from "../files/files";
import {FoldersFilesContext} from "../../context/Folders-Files/Folders_Files";
import { useNavigate } from "react-router-dom";

function SidebarContainer({FolderData, filesData}){  
    // const [selectedFolder, setSelectedFolder] = useState(null);
    // const [selectedFiles, setSelectedFiles] = useState([])

    const navigate = useNavigate()

    const {selectedFolder, setSelectedFolder} = useContext(FoldersFilesContext);

    const handleFolderClick = (Folder) =>{

        setSelectedFolder(Folder);  
        navigate(`/${Folder}`)
    }    

    return (
        <div className="w-[22%] bg-customSidebarColor flex flex-col gap-12 flex-shrink-0">
            {/* Parte no scrolleable */}
            <div>
                <Title />
            </div>
    
            {/* Parte scrolleable */}
            <div className="flex flex-col gap-6 pb-9 overflow-y-auto max-h-[70vh] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
                {/* Renderizar la lista de carpetas */}
                {FolderData.map((Folder, index) => (
                    <div
                        key={index}
                        onClick={() => handleFolderClick(Folder)}
                        className="flex items-center justify-center"
                    >
                        <FolderSidebar FolderName={Folder} isSelected={Folder === selectedFolder} />
                    </div>
                ))}
            </div>

        </div>
    );

    
}

export default SidebarContainer;