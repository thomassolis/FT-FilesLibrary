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

//3. HOME PARA PEDIR ARHIVOS DEPENDIENDO DEL ROL

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