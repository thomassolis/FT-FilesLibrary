import '../../Styles/completeHistoryStyle.css';
import logo from '../../images/MLC logo.png';
import { useState, useEffect } from 'react';
import { getOficialHistory } from '../../api/auth';

function CompleteHistory() {
    const [oficialHistory, setOficialHistory] = useState([]);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await getOficialHistory();
                console.log('response: ', response);
                setOficialHistory(response.data);  // Acceder a los datos dentro de "response.data"
            } catch (e) {
                console.log(e);
            }
        };

        fetchHistory();
        
    }, []);

    // Función para renderizar las filas de la tabla
    function renderRows() {
        return oficialHistory.map((data, i) => (
            <tr key={i}>
                <td>{data.event}</td>
                <td>{data.id}</td>
                <td>{data.timestamp}</td>
            </tr>
        ));
    }

    return (
        <section>
            <div style={{backgroundColor:'rgba(255, 237, 0, 1)'}} className='] w-full h-[5vw] fixed items-center flex'>
                <h1 style={{ marginLeft: '20px' }}>Historial de solicitudes</h1>
                <img src={logo} alt="logo" />
            </div>

            <div className='pt-20'>
                <table>
                    <thead>
                        <tr>
                            <th>Nombre del archivo requerido</th>
                            <th>Nombre del operador que desea el archivo</th>
                            <th>Comentario de pedido</th>
                            <th>Fecha del pedido</th>
                            <th>Nombre de gerente asignado</th>
                            <th>¿Fue aceptado por el gerente?</th>
                            <th>Comentario del gerente</th>
                            <th>Fecha de aceptación por gerencia</th>
                            <th>Nombre de administrador encargado</th>
                            <th>¿Fue aceptado por el administrador?</th>
                            <th>Nombre de administrador encargado</th>
                            <th>Comentario de administración</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderRows()} {/* Aquí se renderizan las filas */}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

export default CompleteHistory;
