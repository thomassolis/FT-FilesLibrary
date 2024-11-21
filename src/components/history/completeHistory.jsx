import '../../Styles/completeHistoryStyle.css';
import logo from '../../images/MLC logo.png';
import { useState, useEffect } from 'react';
import { getOficialHistory } from '../../api/historial';

function CompleteHistory() {
    const [oficialHistory, setOficialHistory] = useState([]);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await getOficialHistory();
                
                setOficialHistory(response);  // Acceder a los datos dentro de "response.data"
                console.log('response para saber:', response)
            } catch (e) {
                console.log(e);
            }
        };

        fetchHistory();
        
    }, []);


    function renderRows() {
        // Validar que oficialHistory esté definido y que sea un array
        if (!Array.isArray(oficialHistory) || oficialHistory.length === 0) {
            return (
                <></>
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
        <section className='flex flex-col'>
            <div className=' w-full h-[5vw] fixed items-center flex justify-center bg-yellow-300'>
                <h1 className='ml-5 font-sans text-2xl'>Historial de solicitudes</h1>
                {/* <img src={logo} alt="logo" /> */}
            </div>

            <div className='pt-20'>                           
                <table>
                    <thead>
                        <tr>
                            <th className='sticky'>Nombre del archivo requerido</th>
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
