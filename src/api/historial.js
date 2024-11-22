import axios from './axios'; // Importa tu instancia de axios

//5. HALANDO LOS DATOS DE LA RUTA PARA IMPRIMIRLOS EN EL HISTORIAL
export const getHistoryDataGerente = async (data) =>{
    try{
        const response = await axios.get('solicitud/ver/pendientes/gerencia');            
        return response.data
    }catch(e){
        console.error(e)
    }
}

    //6. HALANDO LOS DATOS DE LA RUTA PARA IMPRIMIRLOS EN EL HISTORIAL DE PARTE DE ADMIN
export const getHistoryDataAdmin = async () =>{
    try{
        const response = await axios.get('solicitud/ver/pendientes/administrador');
        return response.data
    }catch(e){
        console.error(e)
    }
}


    
export const getOficialHistory = async() =>{
    try{
        const response = await axios.get('solicitud/ver/historial/solicitudes/administrador')
        return response.data;
    }catch(e){
        console.log(e);
    }
}