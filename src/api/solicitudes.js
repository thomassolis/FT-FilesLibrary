import axios from './axios'; // Importa tu instancia de axios

export const enviarPeticion = async (data) =>{
    console.log('Entre a solicitudes');
    try{
        const response = await axios.post('solicitud/agregar/nueva',{
            userName: data.userName,
            comentarioGerente: data.comentarioGerente,
            comentarioAdministracion: data.comentarioAdministracion,
            fileId: data.fileId,
            fileName: data.Nombre_del_archivo,
            OPEUserName: data.OPEUserName,
            OPEComment: data.OPEComment,
            folder: data.folder,
            approvedGER: data.approvedGER,     
            approvedADM: data.approvedADM,     
            motivo_solicitud: data.motivo_solicitud
        });
        console.log('respuesta de login desde files ',response);
        return response.data;
    }catch(e){
        console.log(e);
    }
  }

  
  export const postRequestDataForSeeFile = async (data)=>{
    console.log('data: ',data)
    try{
        const response = await axios.post('auth/post/historialdata',{
            userName: data.userName,
            textAreaValue: data.textAreaValue,
            fileId: data.fileId,
            fileName: data.fileName                        
        });
        console.log('respuesta de login desde auth ',response.data);
        //console.log('response.data', response.data)
        return response.data;
        
    }catch(e){
        console.log('error:',e);
    }
  }


  