import axios from './axios'; // Importa tu instancia de axios

export const postAprobacionGerencia = async (data) =>{
    try{
        const response = await axios.post('solicitud/agregar/nueva',{
            userName: data.userName,
            comentarioGerente: data.comentarioGerente,
            comentarioAdministracion: data.comentarioAdministracion,
            fileId: data.fileId,
            fileName: data.fileName,
            OPEUserName: data.OPEUserName,
            OPEComment: data.OPEComment,
            folder: data.selectedFolder,
            approvedGER: data.approvedGER,     
            approvedADM: data.approvedADM,     
            motivo_solicitud: data.motivo_solicitud
        });
        console.log('respuesta de login desde files ',response.data);
        return response.data;
    }catch(e){
        console.log(e);
    }
  }