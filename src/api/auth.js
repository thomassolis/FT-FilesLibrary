// usuarios.js
import axios from './axios'; // Importa tu instancia de axios


//1. LOGIN
        // ENVIAR CORREO Y CONTRASEÑA AL BACKEND
export const enviarLogin = async (data) => {
    try {
        const response = await axios.post('/login', {
            Email: data.Email,
            Password: data.Password
        });
        //console.log('response.data', response.data)
        return response.data;
    } catch (error) {
        console.error('Error during API call:', error);
        alert('Algo ha salido mal con el servidor');
        return null; // Retornamos null para manejar mejor los errores
    }
}



//2. VERIFICACION DE 2 PASOS
        // ENVIAR CÓDIGO A BACKEND
export const enviarVerificacion2pasos = async (data) => {
    
        const response = await axios.post('/authentication', {
            authentication: data.authentication
        });
        console.log(response.data);
        return response.data;

}
