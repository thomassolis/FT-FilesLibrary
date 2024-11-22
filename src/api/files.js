// usuarios.js
import axios from './axios'; // Importa tu instancia de axios


export const comprobarDrive = async (data) => {
    const response = await axios.get('/files/get/archivos/byuser');
    console.log('respuesta de la solicitud de Archivo  ',response.data);
    //console.log('response.data', response.data)
    return response.data;

}

export const previsualizarArchivos = async ({ fileId }) => {    
    try {
        const response = await axios.get(
            `files/get/archivos/copia/byuser/${fileId}`,
            { responseType: 'blob' } // Esto asegura que la respuesta sea un Blob
        );
        return response.data; // Debe ser un Blob si el backend responde correctamente
    } catch (error) {
        console.error('Error al solicitar archivo:', error);
        throw error;
    }
};


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
  
  //4. ENVIAR INFORMACIÓN DE ARCHIVOS HACIA EL BACK PARA ASÍ SE PUEDA SABER QUE ARCHIVO EN ESPECÍFICO ES
export const sendFilesData = async(data) =>{
    try{
        const response = await axios.post('solicitud/aprobacion/solicitud/gerente', {
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

//3. HOME PARA PEDIR INFORMACIÓN DE ARHIVOS DEPENDIENDO DEL ROL

export const getFilesData = async () => {
    try{
        const response = await axios.get(`/files/get/archivos/byuser`);
        return response.data
    }catch(error){
        console.log("error buscando los datos");
    }

}
