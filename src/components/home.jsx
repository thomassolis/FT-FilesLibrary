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
import { FadeLoader } from 'react-spinners';
import NoFilesMessage from './Modal/NoFilesMessage';

function Home() {
    const { userRole } = useContext(AuthContext);
    const [foalderData, setFoalderData] = useState([]);
    const { filesData, setFilesData, selectedFolder, setSelectedFolder } = useContext(FoldersFilesContext);
    const { setRequestSeeFile } = useContext(PermissionsContext);
    const [adminForm, setAdminForm] = useState(false);
    const { folder, subfolder, subsubfolder } = useParams();
    const [loading, setLoading] = useState(true);

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
                setLoading(false);
            }
        };
        fetchFiles();
    }, [setFilesData]);

    useEffect(() => {
        if (filesData) {
            setSelectedFolder(Object.keys(filesData)[0]);
        } else {
            console.log('No hay archivos');
        }
    }, [filesData, setSelectedFolder]);

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
            <SidebarContainer foalderData={foalderData} filesData={filesData} onSelect={setSelectedFolder} />
    
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
