import axios from './axios'; // Importa tu instancia de axios

//ENVIAR PETICIÓN PARA VER ARCHIVO DESDE OPERADOR 
export const CrearNuevaPeticion = async (data) =>{    
   
    try{
        const response = await axios.post('/solicitud/agregar/nueva',{            
            fileId: data.fileId,   
            motivo_solicitud: data.motivo_solicitud  ,
        });        
        return response.data;
    }catch(error){
        console.log("Error en CrearNuevaPeticion:", error);
        throw error;
    }
  }

export const APIaprobacionAdministrador = async(dataAdmin) =>{
    try{
        const response = await axios.post('solicitud/aprobacion/solicitud/administrador',{            
            comentarioAdministracion: dataAdmin.comentarioAdministracion,
            fileId: dataAdmin.fileId,                        
            approvedADM: dataAdmin.approvedADM,                 
            ID_Solicitudes: dataAdmin.ID_Solicitudes   
        });        
        return response.data;
    }catch(e){
        console.log('Error en APIaprobacionAdministrador', e);
        return {success: false}
    }
  }

  //APROBACIÓN O DENEGACIÓN DEL GERENTE
export const APIaprobacionGerencia = async (data) =>{    
    try{        
        const response = await axios.post('solicitud/aprobacion/solicitud/gerente',{
            comentarioGerente: data.comentarioGerente,
            approvedGER: data.approvedGER,
            ID_Solicitudes: data.ID_Solicitudes
        })
        return {success: true}
    }catch(e){
        console.log('Error en APIaprobacionGerencia', e);
        return {success: false}
    }
  }
