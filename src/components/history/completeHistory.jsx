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
                
                setOficialHistory(response);  // Acceder a los datos dentro de "response.data"
            } catch (e) {
                console.log(e);
            }
        };

        fetchHistory();
        
    }, []);

    // Función para renderizar las filas de la tabla
    // function renderRows() {
    //     return oficialHistory.map((data, i) => (
    //         <tr key={i}>
    //             <td>{data.Nombre_del_archivo}</td>
    //             <td>{data.id}</td>
    //             <td>{data.timestamp}</td>
    //         </tr>
    //     ));
    // }

    function renderRows() {
        // Validar que oficialHistory esté definido y que sea un array
        if (!Array.isArray(oficialHistory) || oficialHistory.length === 0) {
            return (
                <tr>
                    <td colSpan="3">No hay datos disponibles</td>
                </tr>
            );
        }
    
        // Si oficialHistory tiene datos, renderizar las filas
        return oficialHistory.map((data, i) => (
            <tr key={i}>
                <td className='break-words'>{data.Nombre_del_archivo}</td>
                <td className='break-words'>{data.Nombre_de_solicitante}</td>
                <td className='break-words'>{data.Rol_De_Solicitante}</td>
                <td className='break-words'>{data.motivo_de_la_solicitud}</td>
                <td className='break-words'>{data.fecha_solicitud}</td>
                <td className='break-words'>{data.Gerente_que_aprobo_solicitud}</td>
                <td className='break-words'>{data.aprobacion_gerencia}</td>
                <td className='break-words'>{data.Comentario_gerente}</td>
                <td className='break-words'>{data.fecha_aprobacion_gerente}</td>
                <td className='break-words'>{data.nombre_administrador}</td>
                <td className='break-words'>{data.aprobacion_administracion}</td>
                <td className='break-words'>{data.Comentario_administracion}</td>
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
                            <th>Nombre del solicitante</th>
                            <th>Rol de solicitante</th>
                            <th>Comentario del solicitante</th>
                            <th>Fecha del pedido</th>
                            <th>Nombre de gerente asignado</th>
                            <th>¿Fue aceptado por el gerente?</th>
                            <th>Comentario del gerente</th>
                            <th>Fecha de aceptación por gerencia</th>
                            <th>Nombre de administrador encargado</th>
                            <th>¿Fue aceptado por el administrador?</th>
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
