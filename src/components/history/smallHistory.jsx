import '../../Styles/completeHistoryStyle.css'
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/authProvider';

import { io } from "socket.io-client";
const socket = io("/")


function SmallHistory(){
    const {userRole} = useContext(AuthContext);
    const [requestDataOPE, setRequestDataOPE] = useState([])

    function renderRows(){
        const rows = [];
        for (let i = 0; i < requestDataOPE.length; i++) {
            const data = requestDataOPE[i];
            rows.push(
                <tr key={i}>
                    <td>{data.fileName}</td>
                    <td>{data.userName}</td>
                    <td>{data.textAreaValue}</td>                    
                    <td style={{display:'flex', gap:'20px'}}>
                        <button style={{margin:'0', marginTop:'10px', marginLeft:'110px', backgroundColor:'red', width:'90px'}}>Denegar</button> 
                        <button style={{margin:'0', marginTop:'10px', backgroundColor:'green', width:'90px'}}>Aceptar</button>
                    </td>
                    
                    
                </tr>
            );
        }
        return rows;
    }


    useEffect(()=>{
        // CUANDO ESCUCHES UN EVENTO LLAMADO MESSAGE VAMOS A RECIBIR UN MENSAGE
        /*
        socket.on('message', data =>{
            console.log('soy un mensaje: ', data);
            setRequestDataOPE(data);
            receiveRequestOPE(data);            
        }) 
            // Limpieza del socket cuando el componente se desmonte
        return () => {
            socket.off('message'); // Desuscribirse del evento para evitar fugas de memoria
        };
        }, []);

        function receiveRequestOPE(data){
             
        }*/
        socket.on('message', (data) => {
            console.log('Soy un mensaje: ', data);
            // Agrega los nuevos datos al array existente en el estado
            setRequestDataOPE((prevState) => [...prevState, data]);
        });

        // Limpieza del socket cuando el componente se desmonte
        return () => {
            socket.off('message'); // Desuscribirse del evento para evitar fugas de memoria
        };
        }, []);
    return(
        <section style={{overflowX: 'auto'}}>
            {requestDataOPE.length > 0 && userRole === 'ADM' && 
                 
                <table style={{width:'120%', paddingRight:'150px'}}> 
                    <thead>
                        <tr>
                            <th scope="col">Nombre del archivo requerido</th>
                            <th scope="col">Nombre del operador que desea el archivo</th>
                            <th scope="col">Comentario de pedido</th>
                            <th scope="col">¿Desea brindar permisos de lectura al operador?</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td scope="col">Nombre del archivo requerido</td>
                            <td scope="col">Nombre del operador que desea el archivo</td>
                            <td scope="col">Comentario de pedido</td>
                            <td scope="col">¿Desea brindar permisos de lectura al operador?</td>
                        </tr>
                    </tbody>
                </table>
                    

            }   




                    {requestDataOPE.length > 0 && userRole === 'GER' && 
                        <table style={{width:'130%', paddingRight:'90px'}}> 
                            <thead>
                                <tr>
                                    <th scope="col" style={{width:'430px'}}>Nombre del archivo requerido</th>
                                    <th scope="col" style={{width:'430px'}}>Nombre del operador que desea el archivo</th>
                                    <th scope="col" style={{width:'430px'}}>Comentario de pedido</th>
                                    <th scope="col" style={{width:'430px', display:'flex', alignItems:'center', justifyContent:'center'}}>¿Desea brindar permisos de lectura al operador?</th>
                                </tr>
                            </thead>
                            <tbody>
                                {renderRows()}
                            </tbody>
                        </table>
                    }
                
        </section>

        
        
    )
}

export default SmallHistory;