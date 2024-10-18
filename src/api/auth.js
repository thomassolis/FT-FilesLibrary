// usuarios.js
import axios from './axios'; // Importa tu instancia de axios


//1. LOGIN
        // ENVIAR CORREO Y CONTRASEÑA AL BACKEND
export const enviarLogin = async (data) => {

    const response = await axios.post('auth/login', {
        Email: data.email,
        Password: data.password
    });
    console.log('respuesta de login desde auth ',response.data);
    //console.log('response.data', response.data)
    return response.data;

}



//2. VERIFICACION DE 2 PASOS
        // ENVIAR CÓDIGO A BACKEND
export const enviarVerificacion2pasos = async (data) => {
    
        const response = await axios.post('auth/authentication', {
            authentication: data.authentication
        });
        console.log(response.data);
        return response.data;

}

//3. HOME PARA PEDIR INFORMACIÓN DE ARHIVOS DEPENDIENDO DEL ROL

export const getFilesData = async () => {
    try{
        // let variableRol = 'GER'
        // const response = await axios.get(`auth/get/files/${variableRol}`);
        const response = await axios.get(`auth/get/files/ADM`);
        // console.log(response);
        return response.data
    }catch(error){
        console.log("error buscando los datos");
    }

}

//4. ENVIAR INFORMACIÓN DE ARCHIVOS HACIA EL BACK PARA ASÍ SE PUEDA SABER QUE ARCHIVO EN ESPECÍFICO ES
export const sendFilesData = async(data) =>{
    try{
        const response = await axios.post('auth/send/files/data', {
            fileId: data.fileId,
            fileName: data.fileName,
            textAreaValue: data.textAreaValue
        });
        return response.data;
    }
    catch(error){
        console.error(error)

    }
}

//5. ENVIAR los ARCHIVOS que sube el administrador HACIA EL BACKend 
// 5. ENVIAR los ARCHIVOS que sube el administrador HACIA EL BACKEND
export const sendFilesFromAdmin = async (data) => {
    try {
      const response = await axios.post('auth/admin/files', data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert('Archivos subidos correctamente');
      return response;
    } catch (e) {
      console.error(e);
      alert('Error al subir los archivos');
    }
  };
  
  //5. HALANDO LOS DATOS DE LA RUTA PARA IMPRIMIRLOS EN EL HISTORIAL
  export const getHistoryData = async (data) =>{
    try{
        const response = await axios.get('auth/get/historial');        
        return response.data
    }catch(e){
        console.error(e)
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