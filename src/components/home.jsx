import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/authProvider';
import { getFilesData } from '../api/files';
import FilesContainer from './files/filesContainer';
import SidebarContainer from './SideBar/sideBarContainer';
import History from './history/history';
import { PermissionsContext } from '../context/permissions/permissionsProvider';
import { FoldersFilesContext } from '../context/Folders-Files/Folders_Files';
import NewFileForm from './Modal/newFileForm';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Files from './files/files';
import SkeletonFilesContainer from './skeleton/SkeletonFilesContainer';
import { FadeLoader } from 'react-spinners';
function Home() {
    const { userRole } = useContext(AuthContext);
    const [foalderData, setFoalderData] = useState([]);
    const { filesData, setFilesData, selectedFolder, setSelectedFolder } = useContext(FoldersFilesContext);
    const { requestSeeFile, setRequestSeeFile } = useContext(PermissionsContext);
    const [adminForm, setAdminForm] = useState(false);
    const { folder, subfolder, subsubfolder } = useParams();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const handleSelectSubFolder = (folderName) => {
        setSelectedFolder(folderName);     
    };

    useEffect(() => {
        const fetchFiles = async () => {
            try {                
                const response = await getFilesData();
                setFilesData(response.data);                

                const foalders = Object.keys(response.data);
                setFoalderData(foalders);
            } catch (error) {
                setFilesData({});
                setFoalderData([]);
            } finally {
                setLoading(false); // Cambia loading a false cuando termina la carga
            }
        };
        fetchFiles();
    }, []);

    useEffect(() => {
        
        if (filesData) {
            setSelectedFolder(Object.keys(filesData)[0]);
        }
    }, [filesData]);

    useEffect(() => {
        if (userRole === 'OPE') {
            setRequestSeeFile(true);
        }
    }, [userRole, setRequestSeeFile]);

    function newFile() {
        setAdminForm(true);
    }

    function closeAdminForm() {
        setAdminForm(false);
    }

    // Función para renderizar archivos dependiendo del nivel de carpeta
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
    

    return (
    <section id='soyyo' className='bg-customBlue flex min-h-screen'>
        {/* Mostrar la barra lateral */}
        <SidebarContainer foalderData={foalderData} filesData={filesData} onSelect={handleSelectSubFolder} />

        <div className='flex w-full'>
            {loading ? (
                <div className="flex justify-center items-center w-full h-screen">
                    <FadeLoader size={15}  /> {/* BeatLoader aparece mientras loading es true */}
                </div>
            ) : folder && subsubfolder && filesData[folder]?.[subfolder]?.[subsubfolder]?.files ? (
                // Mostrar archivos de la subsubcarpeta seleccionada
                <div className="col-span-4 w-full">
                    <FilesContainer fileData={renderFiles()} album={filesData[folder][subfolder][subsubfolder]} />
                </div>
            ) : folder && subfolder && filesData[folder]?.[subfolder]?.files ? (
                // Mostrar archivos de la subcarpeta seleccionada
                <div className="col-span-4 w-full">
                    <FilesContainer fileData={renderFiles()} album={filesData[folder][subfolder]} />
                </div>
            ) : selectedFolder && filesData[selectedFolder]?.files ? (
                // Mostrar archivos de la carpeta seleccionada
                <FilesContainer fileData={renderFiles()} album={filesData[selectedFolder]} />
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginLeft: '240px', marginTop: '200px', paddingBottom: '250px' }}>
                    <h1>Esta carpeta no cuenta con archivos</h1>
                    <iconify-icon style={{ fontSize: '130px' }} icon="noto-v1:sad-but-relieved-face"></iconify-icon>
                </div>
            )}

            {adminForm && <NewFileForm onClose={closeAdminForm} />}
        </div>

        {/* {requestSeeFile && userRole === "OPE"} */}

        {(userRole === "ADM" || userRole === "GER") && <History />}
    </section>
);

}

export default Home;
