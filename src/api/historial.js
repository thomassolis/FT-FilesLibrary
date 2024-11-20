import axios from './axios'; // Importa tu instancia de axios

//5. HALANDO LOS DATOS DE LA RUTA PARA IMPRIMIRLOS EN EL HISTORIAL
export const getHistoryData = async (data) =>{
try{
    const response = await axios.get('solicitud/ver/pendientes/gerencia');        
    console.log('response desde historial: ',response)
    return response.data
}catch(e){
    console.error(e)
}
}

export const getOficialHistory = async() =>{
    try{
        const response = await axios.get('files/get/oficialHistory')
        return response.data;  // Retornar la respuesta completa
    }catch(e){
        console.log(e);
    }
  }

    //6. HALANDO LOS DATOS DE LA RUTA PARA IMPRIMIRLOS EN EL HISTORIAL DE PARTE DE ADMIN
    export const getHistoryDataAdmin = async (data) =>{
        try{
            const response = await axios.get('files/get/historial');        
            return response.data
        }catch(e){
            console.error(e)
        }
    }
    