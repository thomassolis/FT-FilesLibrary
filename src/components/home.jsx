import '../../src/Styles/homeStyle.css';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/authProvider';
import { getFilesData } from '../api/auth';
import Files from './files/files';
import FilesContainer from './files/filesContainer';
import SidebarContainer from './SideBar/sideBarContainer';
import History from './history/history';
import { PermissionsContext } from '../context/permissions/permissionsProvider';
import {FoldersFilesContext} from '../context/Folders-Files/Folders_Files';


function Home() {
    const { userRole, userName, banTime } = useContext(AuthContext);
    const [fileData, setFileData] = useState([]); //Estado que contiene el nombre de los archivos ingresados
    const [foalderData, setFoalderData] = useState([]); //Estado que contiene el nombre de las carpetas

    const {requestSeeFile, setRequestSeeFile} = useContext(PermissionsContext);

    const {foldersId, setFoldersId, foldersName, setFoldersName,filesId,setFilesId, filesName, setFilesName} = useContext(FoldersFilesContext); //VIERNES: CONTEXTO EL CUAL GUARDARÁ LA INFO DE LOS ARCHIVOS Y FOLDERS PARA AL ENVIARLOS QUE VAYAN CON NOMBRE Y

    //console.log('requestSeeFile ', requestSeeFile)
    console.log('userRole:', userRole);
    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const response = await getFilesData(); // Llama a tu función asíncrona                
                console.log('response de prueba desde HOME: ',response)

                setFoldersName(response);
                console.log('foldersName', foldersName);
                
                


                // Verifica si 'files' es un arreglo y establece el estado
                if (response && Array.isArray(response.avisos.files)) {
                    setFileData(response.avisos.files); // Establece fileData con response.files      
                    console.log('ENTRE AL IF');

                    const foalders = Object.keys(response); //obtiene los valores de un objeto y los coloca en un arreglo
                    setFoalderData(foalders);
                    console.log('foalderData: ',foalders)
                } else {
                    console.error("No se encontraron archivos en la respuesta o no es un arreglo.");
                    setFileData([]); // Maneja el estado de error
                }
            } catch (error) {
                console.error("ERROR:", error); // Imprime el error para diagnóstico
                setFileData([]); // Maneja el estado de error
            }
        };

        fetchFiles(); // Llama a la función para cargar los archivos al montar el componente
    }, []);

    //DEFINIENDO QUE TAREAS TENDRÁN LOS USUARIOS DEPENDIENDO DEL ROL
    useEffect(()=>{
        if(userRole == 'OPE'){
            setRequestSeeFile(true); //Tarea de enviar solicitud de vista de archivo
        }
    })

    return (
            <section style={{display:'flex', flexDirection:'column'}}>
                <div style={{backgroundColor:'rgba(172, 207, 217, 1)', display:'flex', width:'100%'}}>
                    <SidebarContainer foalderData={foalderData} />

                    
                    <div style={{marginLeft:'360px'}}>
                        <ul>
                            <FilesContainer fileData={fileData}/>
                        </ul>
                    </div>
                </div>
                {
                    requestSeeFile && userRole === "OPE"                    
                } 
                {
                    userRole === "ADM" && <History/>               
                }

                
            </section>            
   


    );
}

export default Home;