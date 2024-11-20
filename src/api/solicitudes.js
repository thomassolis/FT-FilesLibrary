import axios from './axios'; // Importa tu instancia de axios


//ENVIAR PETICIÓN PARA VER ARCHIVO DESDE OPERADOR 
export const CrearNuevaPeticion = async (data) =>{    
    alert(data.userName);    
    try{
        const response = await axios.post('/solicitud/agregar/nueva',{            
            fileId: data.fileId,   
            motivo_solicitud: data.motivo_solicitud  ,
        });        
        return response.data;
    }catch(e){
        console.log(e);
    }
  }

  export const enviarPeticionAdmin = async(dataAdmin) =>{
    try{
        const response = await axios.post('/solicitud/administracion',{            
            comentarioAdministracion: dataAdmin.comentarioAdministracion,
            fileId: dataAdmin.fileId,                        
            approvedADM: dataAdmin.approvedADM,                 
            ID_Solicitudes: dataAdmin.ID_Solicitudes   
        });        
        return response.data;
    }catch(e){
        console.log(e);
    }
  }


  
  //APROBACIÓN O DENEGACIÓN DEL GERENTE
  export const APIaprobacionGerencia = async (data) =>{    
    try{
        alert('entre')
        const response = await axios.post('solicitud/aprobacion/solicitud/gerente',{
            comentarioGerente: data.comentarioGerente,
            approvedGER: data.approvedGER,
            ID_Solicitudes: data.ID_Solicitudes
        })
    }catch(e){
        console.log('error:',e);
    }
  }

  