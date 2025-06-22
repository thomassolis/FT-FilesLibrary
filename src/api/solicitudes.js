import axios from './axios'; // Importa tu instancia de axios
import { toast } from "react-hot-toast";

//ENVIAR PETICIÓN PARA VER ARCHIVO DESDE OPERADOR 
export const CrearNuevaPeticion = async (data) =>{    
   
    try{
        const response = await axios.post('/solicitud/agregar/nueva',{            
            fileId: data.fileId,   
            motivo_solicitud: data.motivo_solicitud  ,
        });                
        return response.data;
    }catch(error){
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
        toast.error(e.message || 'Hay un error en la aprobación');  
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
        if(response.data.success){
            return toast.success(response.data.message)
        }else {
            return toast.error(response.data.message)
        }        
        
    }catch(error){
        toast.error(error.response.data.message || 'Hubo un error en la aprobación');
    }
  }
