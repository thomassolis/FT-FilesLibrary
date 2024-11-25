import Title from "../title";
import FoalderSidebar from "./foalderSidebar";
import { useContext, useState } from "react";
import FilesContainer from "../files/filesContainer";
import Files from "../files/files";
import {FoldersFilesContext} from "../../context/Folders-Files/Folders_Files";
import { useNavigate } from "react-router-dom";

function SidebarContainer({foalderData, filesData}){  
    // const [selectedFolder, setSelectedFolder] = useState(null);
    // const [selectedFiles, setSelectedFiles] = useState([])

    const navigate = useNavigate()

    const {selectedFolder, setSelectedFolder} = useContext(FoldersFilesContext);

    const handleFolderClick = (foalder) =>{

        setSelectedFolder(foalder);  
        navigate(`/${foalder}`)
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
                {foalderData.map((foalder, index) => (
                    <div
                        key={index}
                        onClick={() => handleFolderClick(foalder)}
                        className="flex items-center justify-center"
                    >
                        <FoalderSidebar foalderName={foalder} isSelected={foalder === selectedFolder} />
                    </div>
                ))}
            </div>

        </div>
    );

    
}

export default SidebarContainer;