import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/authProvider';
import { getFilesData } from '../api/auth';
import FilesContainer from './files/filesContainer';
import SidebarContainer from './SideBar/sideBarContainer';
import History from './history/history';
import { PermissionsContext } from '../context/permissions/permissionsProvider';
import { FoldersFilesContext } from '../context/Folders-Files/Folders_Files';
import NewFileForm from './Modal/newFileForm';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Files from './files/files';

function Home() {
    const { userRole } = useContext(AuthContext);
    const [foalderData, setFoalderData] = useState([]);
    const { filesData, setFilesData, selectedFolder, setSelectedFolder } = useContext(FoldersFilesContext);
    const { requestSeeFile, setRequestSeeFile } = useContext(PermissionsContext);
    const [adminForm, setAdminForm] = useState(false);
    const { subfolder } = useParams(); // Obtener el parámetro de la URL

    const [selectedSubFolder, setSelectedSubFolder] = useState(null); // Nuevo estado para la subcarpeta seleccionada
    const navigate = useNavigate();
    // Función para actualizar la subcarpeta seleccionada
    function handleSelectSubFolder(folderName) {
        setSelectedSubFolder(folderName);
    }

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const response = await getFilesData();
                setFilesData(response);
                console.log('filesData[selectedFolder][subfolder]: ', filesData[selectedFolder]?.[subfolder]);
                // console.log('soy nuevo',filesData[selectedFolder].files)
                const foalders = Object.keys(response);
                setFoalderData(foalders);
            } catch (error) {
                setFilesData({});
                setFoalderData([]);
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

    return (
        <section id='soyyo' className='bg-customBlue flex min-h-screen'>
    <SidebarContainer foalderData={foalderData} filesData={filesData} onSelect={handleSelectSubFolder} />

    <div className='flex justify-center w-full'>
        {subfolder && filesData[selectedFolder]?.files ? (
            // Mostrar archivos de la subcarpeta seleccionada
            <div>
                {filesData[selectedFolder]?.[subfolder] && (
                    <div className="col-span-4">
                        {/* Recorremos y mostramos los archivos de la subcarpeta */}
                        {filesData[selectedFolder][subfolder]?.files?.length > 0 ? (
                            <div className="grid grid-cols-4 gap-4">
                                <FilesContainer fileData={filesData[selectedFolder][subfolder].files} album={filesData[selectedFolder][subfolder]} />
                            </div>
                        ) : (
                            <p>No hay archivos en esta subcarpeta</p>                            
                        )}
                    </div>
                )}
            </div>
        ) : (
            // Renderizar FilesContainer si no estás en una subcarpeta
            selectedFolder && filesData[selectedFolder]?.files ? (
                <FilesContainer fileData={filesData[selectedFolder].files} album={filesData[selectedFolder]} />
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginLeft: '240px', marginTop: '200px', paddingBottom: '250px' }}>
                    <h1>Esta carpeta no cuenta con archivos</h1>
                    <iconify-icon style={{ fontSize: '130px' }} icon="noto-v1:sad-but-relieved-face"></iconify-icon>
                </div>
            )
        )}

        {/* Si no hay archivos en la subcarpeta, redirige a home */}
        {/* {subfolder && !filesData[selectedFolder]?.[subfolder]?.files && 
            alert("Esta carpeta no tiene contenido")
            
        } */}

        {/* Mensaje "test" si la subcarpeta está vacía */}
        {subfolder && filesData[selectedFolder]?.[subfolder]?.files?.length === 0 && <h1>test</h1>}

        {adminForm && <NewFileForm onClose={closeAdminForm} />}
    </div>

    {requestSeeFile && userRole === "OPE"}

    {(userRole === "ADM" || userRole === "GER") && <History />}
    </section>

    );
}

export default Home;
