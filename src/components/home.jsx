import '../../src/Styles/homeStyle.css';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/authProvider';
import { getFilesData } from '../api/auth';
import FilesContainer from './files/filesContainer';
import SidebarContainer from './SideBar/sideBarContainer';
import History from './history/history';
import { PermissionsContext } from '../context/permissions/permissionsProvider';
import { FoldersFilesContext } from '../context/Folders-Files/Folders_Files';
import NewFileForm from './Modal/newFileForm';



function Home() {
    const { userRole } = useContext(AuthContext);
    const [foalderData, setFoalderData] = useState([]); // Estado que contiene el nombre de las carpetas
    const {filesData, setFilesData, selectedFolder, setSelectedFolder} = useContext(FoldersFilesContext);


    const { requestSeeFile, setRequestSeeFile } = useContext(PermissionsContext);

    const [adminForm, setAdminForm] = useState(false);
   

    const { foldersId, setFoldersId, foldersName, setFoldersName, filesId, setFilesId, filesName, setFilesName } = useContext(FoldersFilesContext);

    // Efect para cargar los archivos desde el backend
    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const response = await getFilesData(); // Llama a tu función asíncrona para obtener los archivos
                setFilesData(response); // Establece toda la data de carpetas
                console.log('response ', response)

                const foalders = Object.keys(response); // Obtiene los nombres de las carpetas
                setFoalderData(foalders); // Almacena los nombres de las carpetas
                console.log('foalderData: ', foalders);

            } catch (error) {
                console.error("ERROR:", error);
                setFilesData({});
                setFoalderData([]);
            }
        };

        fetchFiles(); // Carga los archivos al montar el componente
    }, []);
    console.log('Mi rol desde HOME es: ', userRole);

    //eFFECT PARA DEFINIR QUE LA PRIMERA CARPETA ESTÉ SIEMPRE ABIERTA
    useEffect(()=>{
        if(filesData){
            setSelectedFolder(Object.keys(filesData)[0]);
        }
    },[filesData])

    // Definir tareas según el rol del usuario
    useEffect(() => {
        if (userRole === 'OPE') {
            setRequestSeeFile(true); // Tarea de enviar solicitud de vista de archivo
        }
    }, [userRole, setRequestSeeFile]);


    function newFile(){
        setAdminForm(true);        
    }
    function closeAdminForm(){
        setAdminForm(false);        
    }


    // const receiveRequestOPE = (data)=>{
    //     setRequestDataOPE((state) => [...state, data])
    // }
        

    return (
        <section style={{ display: 'flex', flexDirection: 'column' }}>
            <iconify-icon style={{position:'absolute', top:'110px',right:'190px', fontSize:'30px', cursor:'pointer' }} onClick={newFile} icon="solar:add-circle-bold"></iconify-icon>
            <div style={{ backgroundColor: 'rgba(172, 207, 217, 1)', display: 'flex', width: '100%'}}>
                <SidebarContainer foalderData={foalderData} filesData = {filesData}/>

            
            <div style={{ marginLeft: '360px' }}>
                    {selectedFolder && filesData[selectedFolder].files?(
                        <FilesContainer fileData={filesData[selectedFolder].files} />
                ):(
                    <div style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', marginLeft:'240px', marginTop:'200px', paddingBottom:'250px'}}>
                        <h1>Esta carpeta no cuenta con archivos</h1>
                        <iconify-icon style={{fontSize:'130px'}} icon="noto-v1:sad-but-relieved-face"></iconify-icon>  
                        
                    </div>                                          
                )}

            </div>                

            {adminForm && <NewFileForm onClose={closeAdminForm}/>}

                
            </div>

            {requestSeeFile && userRole === "OPE"}

            {userRole === "ADM" && <History />}
            {userRole === "GER" && <History />}
            
            
        </section>
    );
}

export default Home;
