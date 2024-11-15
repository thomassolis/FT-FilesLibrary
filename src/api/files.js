// usuarios.js
import axios from './axios'; // Importa tu instancia de axios


export const comprobarDrive = async (data) => {
    const response = await axios.get('/files/get/archivos/byuser');
    console.log('respuesta de la solicitud de Archivo  ',response.data);
    //console.log('response.data', response.data)
    return response.data;

}

export const previsualizarArchivos = async (data) => {
    try {
        const response = await axios.post('files/post/solicitarArchivo', {
            fileId: data.fileId
        }, {
            responseType: 'blob' // Especifica que la respuesta es un blob
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
