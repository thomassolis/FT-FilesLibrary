import Files from "./files";
import HeaderFiles from "./headerFiles";
import '../../Styles/filesContainer.css';
import SubFolder from "./subFolder";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SkeletonFolder from "../skeleton/skeletonFolder";
import Routes from "../Rutas/routes";

function FilesContainer({ fileData, album, arregloArchivos }) {
    const [selectedSubFolder, setSelectedSubFolder] = useState(null);    
    const navigate = useNavigate();
    // Obtenemos las claves del objeto album que no son 'files' (las carpetas)
    const folders = Object.keys(album).filter(key => key !== 'files');
    const files = album.files || []; // Archivos en la carpeta actual
    const [loading, setLoading] = useState(true);
    const {folder, subfolder, subsubfolder} = useParams();

    // Verificar si hay más subcarpetas dentro de cada subcarpeta
    folders.forEach(folderName => {
        const subAlbum = album[folderName];
    });

    //Uso de Skeleton
    useEffect(() => {
        // Si folders y files no tienen elementos, cambia loading a false
        if (folders.length > 0 || files.length > 0 || (!folders.length && !files.length)) {
            setLoading(false);
        }
    }, [folders, files]);

    

    return (
        <div className="pb-10 w-full flex flex-col">
            <HeaderFiles arregloArchivos={arregloArchivos} fileData={fileData}/>                
            {/* Renderizamos las carpetas y subcarpetas */}
            <div className="pl-4">
                <Routes/>            

                <div id="Grid-Folders" className={ `grid grid-cols-4 gap-4 items-center mt-4 content-center mb-9 w-[90%] ${subsubfolder ? 'mt-12' : ''} `}>
                    {loading ? (
                        Array(5).fill().map((_, index) => (
                            <SkeletonFolder key={index} />
                        ))
                    ) : (
                        folders.length > 0 ? (
                            folders.map((folderName) => {
                                const isSelected = folderName === selectedSubFolder;
                                return (
                                    <div
                                        key={folderName}
                                        id="subfolder"
                                        className={ `border border-black rounded border-dashed flex justify-center p-2 w-[100%] hover:bg-slate-400 cursor-pointer ${isSelected ? 'bg-slate-400' : ''} `}
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
                        ) : (
                            <p></p>
                        )
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