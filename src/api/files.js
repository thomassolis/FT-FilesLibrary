import axios from './axios';

export const getFilesData = async () => {
    try
    {
        const response = await axios.get(`/files/get/archivos/byuser`);
        return response.data
    }
    catch(error)
    {
        console.log("error buscando los datos");
    }

}