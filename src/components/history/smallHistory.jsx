import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/authProvider';
import { io } from "socket.io-client";
import { getHistoryDataGerente } from '../../api/historial';
import AprobacionGerencia from '../Modal/aprobacionGerencia';
import { getHistoryDataAdmin } from '../../api/historial';

const socket = io("/");

function SmallHistory() {
    const { userRole } = useContext(AuthContext);
    const [requestDataOPE, setRequestDataOPE] = useState([]); // Para solicitudes en tiempo real
    const [historial, setHistorial] = useState([]); // Para historial desde la API
    const [historialAdmin, setHistorialAdmin] = useState([]); // Para historial desde la API
    const [showModal, setShowModal] = useState({
        visible: false,
        approvedGER: false,
        Nombre_del_archivo: '',  // Valor inicial vacío
        OPEUserName: '',
        OPEComment: '',
        fileId: null
    });

    const [newHistorial, setNewHistorial] = useState([]); 
    const [newHistorialAdmin, setNewHistorialAdmin] = useState([]); 
    const [realTimeData, setRealTimeData] = useState([]);

    // Función para eliminar una solicitud aceptada o denegada
    function handleDeleteFromHistorial(ID_Solicitudes) {
        setNewHistorial((prevHistorial) => {
            const updatedHistorial = prevHistorial.filter((item) => item.ID_Solicitudes !== ID_Solicitudes);            
            return updatedHistorial;
        });
    }
    
    

    function handleDeleteFromHistorialAdmin(ID_Solicitudes) {
        setNewHistorialAdmin((prevHistorial) => {
            const updatedHistorial = prevHistorial.filter((item) => item.ID_Solicitudes !== ID_Solicitudes);         
            return updatedHistorial
        });
    }
    

    // Función para renderizar filas de solicitudes en tiempo real
    function renderRows() {
        const rows = [];
        
        for (let i = 0; i < newHistorial.length; i++) {
            const data = newHistorial[i];
            rows.push(
                <tr key={i}>
                    <td className='break-words'>{data.Nombre_del_archivo}</td>
                    <td className='break-words'>{data.Nombre_de_solicitante}</td>
                    <td className='break-words'>{data.motivo_solicitud}</td>
                    
                    <td>
                        <button className='inline-block mr-3 m-0 bg-red-700 w-24' 
                            onClick={() => setShowModal({ 
                                visible: true, 
                                approvedGER: false, 
                                Nombre_del_archivo: data.Nombre_del_archivo, 
                                OPEUserName: data.userName,
                                ID_Solicitudes: data.ID_Solicitudes
                            })}
                        >Denegar</button>


                        <button 
                            className='inline-block m-0 bg-green-900 w-24' 
                            onClick={() => setShowModal({
                                visible: true, 
                                approvedGER: true, 
                                Nombre_del_archivo: data.Nombre_del_archivo, 
                                OPEUserName: data.userName, 
                                OPEComment: data.textAreaValue,
                                fileId: data.fileId,
                                ID_Solicitudes: data.ID_Solicitudes
                            })}
                        >Aceptar</button>
                    </td>
                </tr>
            );
        }
        return rows;
    }

    function renderRowsAdmin(){
        const rows = [];
        
        for(let i=0; i<newHistorialAdmin.length; i++){
            const data = newHistorialAdmin[i];            
            rows.push(
                <tr key={i}>
                    <td className='break-words'>{data.Nombre_del_archivo}</td>
                    <td className='break-words'>{data.Nombre_de_solicitante}</td>
                    <td className='break-words'>{data.Rol_De_Solicitante}</td>
                    <td className='break-words'>{data.motivo_solicitud}</td>
                    <td className='break-words'>{data.Gerente_que_aprobo_solicitud}</td>
                    <td className='break-words'>{data.comentarioGerente}</td>
                    <td>
                        <button 
                            className='inline-block m-0 bg-red-700 w-24 mr-3' 
                            onClick={() => setShowModal({ visibleAdmin: true, approvedADM: false, Nombre_del_archivo: data.Nombre_del_archivo, OPEUserName: data.userName, fileId: data.fileId, ID_Solicitudes: data.ID_Solicitudes })}>Denegar</button>

                        <button 
                            className='inline-block m-0 bg-green-900 w-24' 
                            onClick={() => setShowModal({ visibleAdmin: true, approvedADM: true, Nombre_del_archivo: data.Nombre_del_archivo, OPEUserName: data.userName, fileId: data.fileId, ID_Solicitudes: data.ID_Solicitudes })}>Aceptar</button>
                    </td>
                </tr>
            );
        }
        return rows;
    }


    // Cargar historial desde la API para Admin
    useEffect(() => {
        if (userRole === 'ADM') {
            const getHistoryAdmin = async () => {
                try {
                    const response = await getHistoryDataAdmin(); 
                    console.log('Datos obtenidos para Admin:', response.data); // Debug
                    setHistorialAdmin(response.data); // Asegúrate de que los datos sean válidos
                } catch (e) {
                    console.error(e);
                }
            };
            getHistoryAdmin();
        }

        else if (userRole==='GER'){
            const getHistoryGerente = async () => {
                try {
                    const response = await getHistoryDataGerente(); 
                    
                    setHistorial(response.data); // Asegúrate de que los datos sean válidos
                } catch (e) {
                    console.error(e);
                }
            };
            getHistoryGerente();
        }
    }, []);
    

    // Escuchar eventos en tiempo real usando WebSocket
    useEffect(() => {
        const handleSocketMessage = (data) => {
            console.log('Datos recibidos en tiempo real:', data);
            setNewHistorial((prevHistorial) => [...prevHistorial, data]);                     
        };

        socket.on('message', handleSocketMessage);
   

        return () => {
            socket.off('message', handleSocketMessage);
        };
    }, []);

    useEffect(() => {
        const handleSocketMessageGerencia = (data) => {
            console.log('Datos recibidos en tiempo real para ADMIN:', data);
            setNewHistorialAdmin((prevHistorial) => [...prevHistorial, data]);
        };

        socket.on('messageGerencia', handleSocketMessageGerencia);

        return () => {
            socket.off('messageGerencia', handleSocketMessageGerencia);
        };
    }, []);

    // Efecto para actualizar newHistorial cuando cambia el historial original desde la API
    useEffect(() => {
        setNewHistorial((prevHistorial) => {
            const historialSinDuplicados = historial.filter(item => 
                !prevHistorial.some(prevItem => prevItem.Nombre_del_archivo === item.Nombre_del_archivo && prevItem.userName === item.userName)
            );
            return [...prevHistorial, ...historialSinDuplicados];
        });
    }, [historial]);

    // Efecto para actualizar newHistorial cuando cambia el historial original desde la API
    useEffect(() => {
        setNewHistorialAdmin((prevHistorial) => {
            const historialSinDuplicados = historialAdmin.filter(
                (item) => !prevHistorial.some(
                    (prevItem) => prevItem.ID_Solicitudes === item.ID_Solicitudes
                )
            );
            return [...prevHistorial, ...historialSinDuplicados];
        });
    }, [historialAdmin]);
    

    return (
        <section style={{ overflowX: 'auto' }}>
            {userRole === 'ADM' && (
                <table style={{ width: '97.5vw', padding:'0', margin:'0'}} >
                    <thead>
                        <tr>
                            <th className='w-[12vw]'>Archivo requerido</th>
                            <th className='w-[9vw]'>Solicitante</th>
                            <th className='w-[10vw]'>Rol de solicitante</th>
                            <th className='w-[14.2vw]'>Comentario de pedido</th>           
                            <th className='w-[9vw]'>Gerente que aprobó</th>
                            <th className='w-[14.2vw]'>Comentario de gerente</th>
                            <th className='w-[14.2vw]'>Brindar permisos de lectura</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderRowsAdmin()}
                    </tbody>
                </table>
            )}

            {userRole === 'GER' && (
                <table style={{ width: '100vw', padding:'0', margin:'0'}}>
                    <thead>
                        <tr>
                            <th className='w-[20vw]'>Archivo requerido</th>
                            <th className='w-[15vw]'>Operador que desea el archivo</th>
                            <th className='w-[35vw]'>Comentario de pedido</th>
                            <th className='w-[30vw]'>Brindar permisos de lectura</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderRows()}
                    </tbody>
                </table>
            )}

            {showModal.visible && (
                <AprobacionGerencia
                    approvedGER={showModal.approvedGER}
                    onClose={() => setShowModal(false)}
                    fileId={showModal.fileId}
                    ID_Solicitudes = {showModal.ID_Solicitudes}
                    Nombre_del_archivo={showModal.Nombre_del_archivo}
                    OPEUserName={showModal.OPEUserName}
                    OPEComment={showModal.OPEComment}
                    onDecision={(Nombre_del_archivo, userName, ID_Solicitudes) => handleDeleteFromHistorial(Nombre_del_archivo, userName)}

                />
            )}
            {showModal.visibleAdmin && (
                <AprobacionGerencia
                    approvedADM={showModal.approvedADM}
                    onClose={() => setShowModal(false)}
                    fileId={showModal.fileId}
                    ID_Solicitudes = {showModal.ID_Solicitudes}
                    Nombre_del_archivo={showModal.Nombre_del_archivo}
                    OPEUserName={showModal.OPEUserName}
                    OPEComment={showModal.OPEComment}
                    onDecision={(Nombre_del_archivo, userName, ID_Solicitudes) => handleDeleteFromHistorialAdmin(Nombre_del_archivo, userName)}
                />
            )}
        </section>
    );
}

export default SmallHistory;
