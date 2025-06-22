import axios from './axios'; // Importa tu instancia de axios
import { Toaster,toast } from 'react-hot-toast';

export const CreateNewUser = async(data) =>{

    try{
        const response = await axios.post('users/create/newUser', data);
        if (response.data.success){
            toast.success(response.data.message);
            return response.data;
        }else{
            toast.error(response.data.message);            
        }

    }catch(error){
        toast.error('Ha ocurrido un error a la hora de crear el usuario');
    }
    
}