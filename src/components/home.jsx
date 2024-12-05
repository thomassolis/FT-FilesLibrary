import React, { useContext, useEffect, useState, useRef } from 'react';
import { AuthContext } from '../context/authProvider';
import { getFilesData } from '../api/files';
import FilesContainer from './files/filesContainer';
import SidebarContainer from './SideBar/sideBarContainer';
import History from './history/history';
import { PermissionsContext } from '../context/permissions/permissionsProvider';
import { FoldersFilesContext } from '../context/Folders-Files/Folders_Files';
import NewFileForm from './Modal/newFileForm';
import { useParams } from "react-router-dom";
import { FadeLoader } from 'react-spinners';
import NoFilesMessage from './Modal/NoFilesMessage';
import { useNavigate } from 'react-router-dom'; 

function Home() {
    const navigate = useNavigate();
    const { userRole } = useContext(AuthContext);
    const [FolderData, setFolderData] = useState([]);
    const { filesData, setFilesData, selectedFolder, setSelectedFolder } = useContext(FoldersFilesContext);
    const { setRequestSeeFile } = useContext(PermissionsContext);
    const [adminForm, setAdminForm] = useState(false);
    const { folder, subfolder, subsubfolder } = useParams();
    const [loading, setLoading] = useState(true);
    const isFirstRender = useRef(true); // Para rastrear el primer renderizado
    
    
    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const response = await getFilesData();
                setFilesData(response.data);
                const Folders = Object.keys(response.data);
                setFolderData(Folders);
                
                // Si es el primer renderizado, realizar la navegación
                if (isFirstRender.current && Folders.length > 0) {
                    navigate(`/${Folders[0]}`);
                    isFirstRender.current = false; // Cambiamos la referencia para futuras ejecuciones
                }
                

            } catch (error) {
                setFilesData({});
                setFolderData([]);
            } finally {
                setLoading(false);
            }
        };
        fetchFiles();
    }, [setFilesData]);



    useEffect(() => {
        if (userRole === 'OPE') {
            setRequestSeeFile(true);
        }
    }, [userRole, setRequestSeeFile]);

    const renderFiles = () => {
        if (folder && filesData[folder]) {
            if (subsubfolder && filesData[folder][subfolder]?.[subsubfolder]?.files) {
                return filesData[folder][subfolder][subsubfolder].files;
            } else if (subfolder && filesData[folder]?.[subfolder]?.files) {
                return filesData[folder][subfolder].files;
            } else if (filesData[folder]?.files) {
                return filesData[folder].files;
            }
        }
        return [];
    };

    const hasSubfolders = () => {
        console.log('filesData desde HOME: ',filesData)
        if (folder && filesData[folder]) {
            if (subsubfolder) {
                return Object.keys(filesData[folder][subfolder]?.[subsubfolder] || {}).filter(
                    key => key !== 'files'
                ).length > 0;
            } else if (subfolder) {
                return Object.keys(filesData[folder][subfolder] || {}).filter(
                    key => key !== 'files'
                ).length > 0;
            } else {
                return Object.keys(filesData[folder] || {}).filter(
                    key => key !== 'files'
                ).length > 0;
            }
        }
        return false;
    };

    const filesToRender = renderFiles();
    const subfoldersExist = hasSubfolders();

    const newFile = () => {
        setAdminForm(true);
    };

    const closeAdminForm = () => {
        setAdminForm(false);
    };


    return (
        <section id='soyyo' className='bg-customBlue flex min-h-screen'>
            <SidebarContainer FolderData={FolderData} filesData={filesData} onSelect={setSelectedFolder} />
    
            <div className='flex w-full'>
                {loading ? (
                    <div className="flex justify-center items-center w-full h-screen">
                        <FadeLoader size={15} />
                    </div>
                ) : filesToRender.length > 0 || subfoldersExist ? (
                    // Mostrar los archivos o subcarpetas si existen
                    <div className="col-span-4 w-full">
                        <FilesContainer
                            fileData={filesToRender}
                            album={filesData[folder]?.[subfolder]?.[subsubfolder] || filesData[folder]?.[subfolder] || filesData[folder]}
                            arregloArchivos={filesData} //Data de todos los archivos
                        />
                    </div>
                ) : (
                    // Mostrar mensaje de "No hay archivos ni subcarpetas"
                    <NoFilesMessage />
                )}
            </div>
    
            {adminForm && <NewFileForm onClose={closeAdminForm} />}
    
            {(userRole === "ADM" || userRole === "GER") && <History />}
        </section>
    );
}

export default Home;