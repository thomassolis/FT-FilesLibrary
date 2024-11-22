import '../../Styles/completeHistoryStyle.css';
import logo from '../../images/MLC logo.png';
import { useState, useEffect } from 'react';
import { getOficialHistory } from '../../api/historial';
import { useNavigate } from 'react-router-dom';

function CompleteHistory() {
    const [oficialHistory, setOficialHistory] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await getOficialHistory();
                console.log(response)
                setOficialHistory(response.Data);  // Acceder a los datos dentro de "response.data"
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
            return <></>;
        }
    
        // Si oficialHistory tiene datos, renderizar las filas
        return oficialHistory.map((data, i) => (
            <tr
                key={i}
                className={i % 2 === 0 ? 'bg-gray-100' : 'bg-white'} // Alternar colores de filas
            >
                <td className="break-words border border-gray-300 px-4 py-2">{data.Nombre_del_archivo}</td>
                <td className="break-words border border-gray-300 px-4 py-2">{data.Nombre_de_solicitante}</td>
                <td className="break-words border border-gray-300 px-4 py-2">{data.Rol_De_Solicitante}</td>
                <td className="break-words border border-gray-300 px-4 py-2">{data.motivo_de_la_solicitud}</td>
                <td className="break-words border border-gray-300 px-4 py-2">
                    {new Date(data.fecha_solicitud).toLocaleString('es-ES', {
                        dateStyle: 'short',
                        timeStyle: 'short',
                    })}
                </td>
                <td className="break-words border border-gray-300 px-4 py-2">{data.Gerente_que_aprobo_solicitud}</td>
                <td className="break-words border border-gray-300 px-4 py-2">
                    {data.aprobacion_gerencia ? <p className='text-lime-700 font-bold'>Aprobado</p>  : <p className='text-red-700 font-bold'>No Aprobado</p> }
                </td>
                <td className="break-words border border-gray-300 px-4 py-2">{data.Comentario_gerente}</td>
                <td className="break-words border border-gray-300 px-4 py-2">
                    {new Date(data.fecha_aprobacion_gerente).toLocaleString('es-ES', {
                        dateStyle: 'short',
                        timeStyle: 'short',
                    })}
                </td>
                <td className="break-words border border-gray-300 px-4 py-2">{data.nombre_administrador}</td>                
                <td className="break-words border border-gray-300 px-4 py-2">{data.Comentario_administracion}</td>
                <td className="break-words border border-gray-300 px-4 py-2">
                    {data.aprobacion_administracion ? <p className='text-lime-700 font-bold'>Aprobado</p>  : <p className='text-red-700 font-bold'>No Aprobado</p> }
                </td>
            </tr>
        ));
    }
    
    function navigateHome(){
        navigate('/Home');
    }    
    
    return (
        <section className="flex flex-col">
            {/* Encabezado fijo */}
            <div className="w-full h-[5vw] fixed items-center flex justify-center bg-white z-10 shadow">
                <h1 className="font-sans text-2xl">Historial de solicitudes</h1>
                <img src={logo} alt="" className='absolute right-6 w-20 cursor-pointer' onClick={navigateHome}/>
            </div>

            {/* Contenedor de la tabla con margen superior */}
            <div className="pt-[5vw] overflow-auto h-[80vh]">
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead className="bg-blue-200">
                        <tr>
                            <th className="sticky top-0 border px-4 py-2 bg-blue-300">Nombre del archivo requerido</th>
                            <th className="sticky top-0 border px-4 py-2 bg-blue-300">Nombre del solicitante</th>
                            <th className="sticky top-0 border px-4 py-2 bg-blue-300">Rol de solicitante</th>
                            <th className="sticky top-0 border px-4 py-2 bg-blue-300">Comentario del solicitante</th>
                            <th className="sticky top-0 border px-4 py-2 bg-blue-300">Fecha del pedido</th>
                            <th className="sticky top-0 border px-4 py-2 bg-blue-300">Nombre de gerente asignado</th>
                            <th className="sticky top-0 border px-4 py-2 bg-blue-300">¿Fue aceptado por el gerente?</th>
                            <th className="sticky top-0 border px-4 py-2 bg-blue-300">Comentario del gerente</th>
                            <th className="sticky top-0 border px-4 py-2 bg-blue-300">Fecha de aceptación por gerencia</th>
                            <th className="sticky top-0 border px-4 py-2 bg-blue-300">Nombre de administrador encargado</th>                            
                            <th className="sticky top-0 border px-4 py-2 bg-blue-300">Comentario de administración</th>
                            <th className="sticky top-0 border px-4 py-2 bg-blue-300">¿Fue aceptado por el administrador?</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderRows()} {/* Aquí se renderizan las filas alternando colores */}
                    </tbody>
                </table>
            </div>
        </section>


    );
}

export default CompleteHistory;
