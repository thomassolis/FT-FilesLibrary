import Files from "./files";
import HeaderFiles from "./headerFiles";
import '../../Styles/filesContainer.css';
import SubFolder from "./subFolder";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SkeletonFolder from "../skeleton/skeletonFolder";


function FilesContainer({ fileData, album }) {
    const [selectedSubFolder, setSelectedSubFolder] = useState(null);
    const [showRoute , setShowRoute] = useState(false);

    // Obtenemos las claves del objeto album que no son 'files' (las carpetas)
    const folders = Object.keys(album).filter(key => key !== 'files');
    const files = album.files || []; // Archivos en la carpeta actual
    const [loading, setLoading] = useState(true);
    const {folder, subfolder, subsubfolder} = useParams();
    // Verificar si hay más subcarpetas dentro de cada subcarpeta
    folders.forEach(folderName => {
        console.log(subsubfolder)
        const subAlbum = album[folderName];
    });

    //Uso de Skeleton
    useEffect(() => {
        // Si `folders` y `files` no tienen elementos, cambia `loading` a false
        if (folders.length > 0 || files.length > 0 || (!folders.length && !files.length)) {
            setLoading(false);
        }
    }, [folders, files]);
    

    return (
        <div className="pb-10 w-full flex flex-col ml-4">
            <HeaderFiles />                
            {/* Renderizamos las carpetas y subcarpetas */}
            <div className="flex justify-center flex-col">
                {folder && !subfolder &&
                    <h1 className="font-serif text-2xl ">{folder}</h1>
                }
                {folder && subfolder && !subsubfolder &&
                    <h1 className="font-serif text-2xl ">{folder} / {subfolder}</h1>
                }
                {folder && subfolder && subsubfolder &&
                    <h1 className="font-serif text-2xl ">{folder} / {subfolder} / {subsubfolder}</h1>
                }

                <div 
                    id="Grid-Folders" 
                    className={`grid grid-cols-5 gap-4 items-center mt-4 content-center w-[90%] ${subsubfolder ? 'mt-12' : ''}`}
                >
                    {loading ? (
                        // Renderiza los skeletons mientras carga
                        Array(5).fill().map((_, index) => (
                            <SkeletonFolder key={index} />
                        ))
                    ) : (
                        // Renderiza las carpetas reales cuando ya están cargadas
                        folders.map((folderName) => {
                            const isSelected = folderName === selectedSubFolder;
                            return (
                                <div 
                                    key={folderName} 
                                    id="subfolder" 
                                    className={`border border-black rounded border-dashed flex justify-center p-2 w-[100%] hover:bg-slate-400 cursor-pointer ${isSelected ? 'bg-slate-400' : ''}`}
                                    onClick={() => setSelectedSubFolder(folderName)}
                                >
                                    <SubFolder 
                                        folderName={folderName} 
                                        album={album} 
                                        onSelect={() => setSelectedSubFolder(folderName)} 
                                    />
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        
            {/* Renderizamos los archivos */}
            <div className="w-full">
                <div id="Grid-Archivos" className="grid grid-cols-4 items-center content-center gap-y-8">
                    {fileData.map((file) => (
                        <Files key={file.id} fileName={file.name} fileId={file.id} className="break-words" />
                    ))}
                </div>
            </div>
            
        </div>
    );
}

export default FilesContainer;