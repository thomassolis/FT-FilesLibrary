import axios from 'axios'
const instance= axios.create({
    baseURL: 'https://localhost:3000/api/', // Establece la URL base para todas las solicitudes.
    withCredentials: true // Las solicitudes deben incluir credenciales
})

export default instance 
