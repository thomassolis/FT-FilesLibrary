// usuarios.js
import axios from './axios'; // Importa tu instancia de axios
// Función para obtener todos los usuarios
export const obtenerUsuarios = async () => {
    try {
        const response = await axios.get('/usuarios'); // Realiza la solicitud GET
        return response.data; // Devuelve los datos de la respuesta
    } catch (error) {
        console.error('Error al obtener los usuarios:', error); // Manejo de errores
        throw error; // Lanza el error para manejarlo donde se llame
    }
};
