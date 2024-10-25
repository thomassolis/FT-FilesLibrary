import Files from "./files";
import HeaderFiles from "./headerFiles";
import '../../Styles/filesContainer.css';
import SubFolder from "./subFolder";
import { useState } from "react";
import { useParams } from "react-router-dom";

function FilesContainer({ fileData, album }) {
    const [selectedSubFolder, setSelectedSubFolder] = useState(null);
    

    // Obtenemos las claves del objeto album que no son 'files' (las carpetas)
    const folders = Object.keys(album).filter(key => key !== 'files');
    const files = album.files || []; // Archivos en la carpeta actual

    const {subfolder, subsubfolder} = useParams();
    console.log(subfolder)


    console.log(subsubfolder)
    // Verificar si hay más subcarpetas dentro de cada subcarpeta
    folders.forEach(folderName => {
        console.log(subsubfolder)
        const subAlbum = album[folderName];
    });

    return (
        <div className="pb-10 w-full flex flex-col">

            {!subsubfolder &&
                <HeaderFiles />
            }
            

            {/* Renderizamos las carpetas y subcarpetas */}
            <div className="flex items-center justify-center ">
                <div id="Grid-Folders" 
                    className={`grid grid-cols-5 gap-4 items-center content-center w-[90%] ${
                        subsubfolder ? 'mt-12' : ''
                    }`}>
                    {folders.map((folderName) => (
                        <div key={folderName} id="subfolder" className="border border-black rounded border-dashed flex p-2 w-[100%]">
                            <SubFolder 
                                folderName={folderName} 
                                album={album} 
                                onSelect={() => setSelectedSubFolder(folderName)} 
                                isSelected={selectedSubFolder === folderName} 
                            />
                        </div>
                    ))}
                </div>
            </div>
            


            {/* Renderizamos los archivos */}
            <div id="Grid-Archivos" className="grid grid-cols-4 items-center content-center gap-y-8 ml-6">
                {fileData.map((file) => (
                    <Files key={file.id} fileName={file.name} fileId={file.id} className="break-words" />
                ))}
            </div>
        </div>
    );
}

export default FilesContainer;