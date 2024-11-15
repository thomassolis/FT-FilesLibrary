import axios from './axios'; // Importa tu instancia de axios

export const enviarLogin = async (data) => {
    const response = await axios.post('auth/login', {
        Email: data.email,
        Password: data.password
    });
    console.log('respuesta de login desde auth ',response.data);
    return response.data;

}

//2. VERIFICACION DE 2 PASOS
        // ENVIAR CÓDIGO A BACKEND
export const enviarVerificacion2pasos = async (data) => {
    try{
        const response = await axios.post('auth/authentication/2fa', {
            authentication: data.authentication,
            withCredentials: true
        });
        return response;
    }
    catch (error)
    {
        console.log(error)
    }


}




