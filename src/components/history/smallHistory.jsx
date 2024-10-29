import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/authProvider';
import { io } from "socket.io-client";
import { getHistoryData } from '../../api/auth';
import AprobacionGerencia from '../Modal/aprobacionGerencia';
import { getHistoryDataAdmin } from '../../api/auth';

const socket = io("/");

function SmallHistory() {
    const { userRole } = useContext(AuthContext);
    const [requestDataOPE, setRequestDataOPE] = useState([]); // Para solicitudes en tiempo real
    const [historial, setHistorial] = useState([]); // Para historial desde la API
    const [historialAdmin, setHistorialAdmin] = useState([]); // Para historial desde la API
    const [showModal, setShowModal] = useState(false);

    const [newHistorial, setNewHistorial] = useState([]); 
    const [newHistorialAdmin, setNewHistorialAdmin] = useState([]); 
    const [realTimeData, setRealTimeData] = useState([]);

    // Función para eliminar una solicitud aceptada o denegada
    function handleDeleteFromHistorial(fileName, OPEUserName) {
        console.log("Antes de eliminar:", newHistorial); // Log para verificar el estado antes de eliminar
        setNewHistorial((prevHistorial) => {
            const updatedHistorial = prevHistorial.filter(
                (item) => !(item.fileName === fileName && item.userName === OPEUserName)
            );
            console.log("Después de eliminar:", updatedHistorial); // Verificar después de eliminar
            return updatedHistorial;
        });
    }

    function handleDeleteFromHistorialAdmin(fileName, OPEUserName) {
        console.log("Antes de eliminar:", newHistorialAdmin); // Log para verificar el estado antes de eliminar
        setNewHistorialAdmin((prevHistorial) => {
            const updatedHistorialAdmin = prevHistorial.filter(
                (item) => !(item.fileName === fileName && item.userName === OPEUserName)
            );
            console.log("Después de eliminar:", updatedHistorialAdmin); // Verificar después de eliminar
            return updatedHistorialAdmin;
        });
    }

    // Función para renderizar filas de solicitudes en tiempo real
    function renderRows() {
        const rows = [];
        console.log('newhistorial', newHistorial);
        for (let i = 0; i < newHistorial.length; i++) {
            const data = newHistorial[i];
            console.log('data desde renderrows: ',data);
            console.log('FILEID: ', data.fileId);
            rows.push(
                <tr key={i}>
                    <td className='break-words'>{data.fileName}</td>
                    <td className='break-words'>{data.userName}</td>
                    <td className='break-words'>{data.textAreaValue}</td>
                    
                    <td>
                        <button className='inline-block mr-3 m-0 bg-red-700 w-24' 
                            onClick={() => setShowModal({ 
                                visible: true, 
                                approvedGER: false, 
                                fileName: data.fileName, 
                                OPEUserName: data.userName 
                            })}
                        >Denegar</button>


                        <button 
                            className='inline-block m-0 bg-green-900 w-24' 
                            onClick={() => setShowModal({
                                visible: true, 
                                approvedGER: true, 
                                fileName: data.fileName, 
                                OPEUserName: data.userName, 
                                OPEComment: data.textAreaValue,
                                fileId: data.fileId
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
        console.log('newHistorialAdmin', newHistorialAdmin);
        
        for(let i=0; i<newHistorialAdmin.length; i++){
            const data = newHistorialAdmin[i];
            console.log('data desde rows', data);
            rows.push(
                <tr key={i}>
                    <td className='break-words'>{data.fileName}</td>
                    <td className='break-words'>{data.OPEUserName}</td>
                    <td className='break-words'>{data.OPEComment}</td>
                    <td className='break-words'>{data.userName}</td>
                    <td className='break-words'>{data.textAreaValue}</td>
                    <td>
                        <button 
                            className='inline-block m-0 bg-red-700 w-24 mr-3' 
                            onClick={() => setShowModal({ visibleAdmin: true, approvedADM: false, fileName: data.fileName, OPEUserName: data.userName })}>Denegar</button>

                        <button 
                            className='inline-block m-0 bg-green-900 w-24' 
                            onClick={() => setShowModal({ visibleAdmin: true, approvedADM: true, fileName: data.fileName, OPEUserName: data.userName })}>Aceptar</button>
                    </td>
                </tr>
            );
        }
        return rows;
    }

    // Cargar historial desde la API
    useEffect(() => {
        const getHistory = async () => {
            try {
                const response = await getHistoryData();
                console.log('response desde historial: ', response);
                setHistorial(response);  // Actualizar el estado con los datos recibidos
            } catch (e) {
                console.error(e);
            }
        };
        getHistory();
    }, []);

    // Cargar historial desde la API para Admin
    useEffect(() => {
        const getHistory = async () => {
            try {
                const response = await getHistoryDataAdmin();
                console.log('response desde historialAdmin: ', response);
                setHistorialAdmin(response);  // Actualizar el estado con los datos recibidos
            } catch (e) {
                console.error(e);
            }
        };
        getHistory();
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
            console.log('Datos recibidos en tiempo real:', data);
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
                !prevHistorial.some(prevItem => prevItem.fileName === item.fileName && prevItem.userName === item.userName)
            );
            return [...prevHistorial, ...historialSinDuplicados];
        });
    }, [historial]);

    // Efecto para actualizar newHistorial cuando cambia el historial original desde la API
    useEffect(() => {
        setNewHistorialAdmin((prevHistorial) => {
            const historialSinDuplicados = historial.filter(item => 
                !prevHistorial.some(prevItem => prevItem.fileName === item.fileName && prevItem.userName === item.userName)
            );
            return [...prevHistorial, ...historialSinDuplicados];
        });
    }, [historialAdmin]); 

    return (
        <section style={{ overflowX: 'auto' }}>
            {userRole === 'ADM' && (
                <table style={{ width: '100vw', padding:'0', margin:'0'}} >
                    <thead>
                        <tr>
                            <th className='w-[16.6vw]'>Archivo requerido</th>
                            <th className='w-[16.6vw]'>Persona que desea el archivo (rol)</th>
                            <th className='w-[16.6vw]'>Comentario de pedido</th>           
                            <th className='w-[16.6vw]'>Gerente que aprobo solicitud</th>
                            <th className='w-[16.6vw]'>Comentario de gerente</th>
                            <th className='w-[16.6vw] ml-3'>Brindar permisos de lectura</th>
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
                    fileName={showModal.fileName}
                    OPEUserName={showModal.OPEUserName}
                    OPEComment={showModal.OPEComment}
                    onDecision={(fileName, userName) => handleDeleteFromHistorial(fileName, userName)}
                />
            )}
            {showModal.visibleAdmin && (
                <AprobacionGerencia
                    approvedADM={showModal.approvedADM}
                    onClose={() => setShowModal(false)}
                    fileId={showModal.fileId}
                    fileName={showModal.fileName}
                    OPEUserName={showModal.OPEUserName}
                    OPEComment={showModal.OPEComment}
                    onDecision={(fileName, userName) => handleDeleteFromHistorialAdmin(fileName, userName)}
                />
            )}
        </section>
    );
}

export default SmallHistory;
