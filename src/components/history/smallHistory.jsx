import '../../Styles/completeHistoryStyle.css';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/authProvider';
import { io } from "socket.io-client";
import { getHistoryData } from '../../api/auth';
import { Axios } from 'axios';
const socket = io("/");

function SmallHistory() {
    const { userRole } = useContext(AuthContext);
    const [requestDataOPE, setRequestDataOPE] = useState([]); // Para solicitudes en tiempo real
    const [historial, setHistorial] = useState([]); // Para historial desde la API

    const [newHistorial, setNewHistorial] = useState([]); 
    const [realTimeData, setRealTimeData] = useState([]);
    // Función para renderizar filas de solicitudes en tiempo real
    function renderRows() {
        const rows = [];
        console.log('newhistorial', newHistorial);
        for (let i = 0; i < newHistorial.length; i++) {
            const data = newHistorial[i];
            console.log('data desde renderrows: ',data)
            rows.push(
                <tr key={i}>
                    <td>{data.fileName}</td>
                    <td>{data.userName}</td>
                    <td>{data.textAreaValue}</td>
                    <td style={{ display: 'flex', gap: '20px' }}>
                        <button style={{ margin: '0', marginTop: '10px', marginLeft: '110px', backgroundColor: 'red', width: '90px' }}>Denegar</button>
                        <button style={{ margin: '0', marginTop: '10px', backgroundColor: 'green', width: '90px' }}>Aceptar</button>
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

// Escuchar eventos en tiempo real usando WebSocket
useEffect(() => {
    const handleSocketMessage = (data) => {
        console.log('Datos recibidos en tiempo real:', data);

        // Actualizar el historial con los nuevos datos en tiempo real
        setNewHistorial((prevHistorial) => [...prevHistorial, data]);

        // Comprobación en los logs
        console.log('Historial actualizado con datos en tiempo real: ', data);
    };

    socket.on('message', handleSocketMessage);

    // Limpieza del socket cuando el componente se desmonte
    return () => {
        socket.off('message', handleSocketMessage); // Desuscribirse del evento para evitar fugas de memoria
    };
}, []);  // No necesitamos dependencias aquí ya que el historial se actualizará usando el estado previo

// Efecto para actualizar newHistorial cuando cambia el historial original desde la API
useEffect(() => {
    // Actualizar newHistorial cuando cambia el historial original desde la API
    setNewHistorial((prevHistorial) => {
        // Filtrar para no agregar elementos que ya existen
        const historialSinDuplicados = historial.filter(item => 
            !prevHistorial.some(prevItem => prevItem.fileName === item.fileName && prevItem.userName === item.userName)
        );
        return [...prevHistorial, ...historialSinDuplicados];
    });
}, [historial]);  // Escucha cambios en historial para combinarlo con datos en tiempo real



    return (
        <section style={{ overflowX: 'auto' }}>


            {userRole === 'ADM' && (
                <table style={{ width: '120%', paddingRight: '150px' }}>
                    <thead>
                        <tr>
                            <th scope="col">Nombre del archivo requerido</th>
                            <th scope="col">Nombre del operador que desea el archivo</th>
                            <th scope="col">Comentario de pedido</th>
                            <th scope="col">¿Desea brindar permisos de lectura al operador?</th>
                        </tr>
                    </thead>
                    <tbody>
                        {historial.map((data, index) => (
                            <tr key={index}>
                                <td>{data.fileName}</td>
                                <td>{data.userName}</td>
                                <td>{data.textAreaValue}</td>
                                <td style={{ display: 'flex', gap: '20px' }}>
                                    <button style={{ margin: '0', marginTop: '10px', marginLeft: '110px', backgroundColor: 'red', width: '90px' }}>Denegar</button>
                                    <button style={{ margin: '0', marginTop: '10px', backgroundColor: 'green', width: '90px' }}>Aceptar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {userRole === 'GER' && (
                <table style={{ width: '130%', paddingRight: '90px' }}>
                    <thead>
                        <tr>
                            <th scope="col" style={{ width: '430px' }}>Nombre del archivo requerido</th>
                            <th scope="col" style={{ width: '430px' }}>Nombre del operador que desea el archivo</th>
                            <th scope="col" style={{ width: '430px' }}>Comentario de pedido</th>
                            <th scope="col" style={{ width: '430px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>¿Desea brindar permisos de lectura al operador?</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderRows()}
                    </tbody>
                </table>
            )}
        </section>
    );
}

export default SmallHistory;
