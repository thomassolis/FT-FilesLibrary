import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom'; 
import { useState, useEffect, useContext } from "react";
import { enviarVerificacion2pasos } from "../api/auth"; 
import React from 'react';
import { AuthContext } from "../context/authProvider";
import Home from "./home";
import FoldersFilesContext from "../context/Folders-Files/Folders_Files";
import { Toaster, toast } from 'react-hot-toast';
import { getFilesData } from "../api/files";

function Authentication() {
    const { register, handleSubmit, getValues, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [shouldNavigateHome, setShouldNavigateHome] = useState(false);
    const [shouldNavigateLogin, setShouldNavigateLogin] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false); //Valida si se deshabilita o no el input
    
    //Datos que vienen del backend y se guardarán
    const { userRole, setUserRole, userName, setUserName, banTime, setBanTime } = useContext(AuthContext);
    const { filesData, setFilesData, selectedFolder, setSelectedFolder } = useContext(FoldersFilesContext);
    const [foalderData, setFoalderData] = useState([]);
    // Leer el userRole desde sessionStorage cuando se cargue el componente
    useEffect(() => {
        const storedUserRole = sessionStorage.getItem("userRole");
        if (storedUserRole) {
            // Restaura el userRole desde sessionStorage y lo guarda en el contexto
            setUserRole(storedUserRole);
        }
    }, [setUserRole]);

    //useEffect para traer el objeto de los archivospara así seleccionar el folder en el que comenzará abiera la aplicación dentro del Home
    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const response = await getFilesData();
                console.log('response desde el autenticador: ', response.data);
                setFilesData(response.data);
                const foalders = Object.keys(response.data);
                setFoalderData(foalders);
            } catch (error) {
                setFilesData({});
                setFoalderData([]);
            } 
        };
        fetchFiles();        
    }, []);

    useEffect(() => {
        if (filesData) {
            setSelectedFolder(Object.keys(filesData)[0]);
            console.log('selectedFolder: ',selectedFolder)
        } else {
            console.log('No hay archivos');
        }
    }, [filesData, setSelectedFolder]);
    

    // Navegar a home cuando sea necesario
useEffect(() => {
    if (shouldNavigateHome) {  
        navigate('/FOLDER2'); // Cambia la URL cuando selectedFolder está disponible
    }else if(!selectedFolder){
        console.log('Esperando que se seleccione una carpeta')
    }
}, [shouldNavigateHome, selectedFolder, navigate]);

    //Función que manejará el input en caso de un error 219
    const userBan = () => {
        setIsDisabled(true);
        const fieldName = "authentication";
        const value = getValues(fieldName); // Obtener el valor del input por su nombre
    };

        // Función al enviar el formulario
        const onSubmit = async (data) => {
            try {
                const response = await enviarVerificacion2pasos(data);                
                if (response && response.data.success && response.status === 200) {                            
                    setShouldNavigateHome(true);
                    

                    const role = response.data.data.nombre_rol;
                    const name = response.data.data.nombre;
                    const banTime = response.data.data.banTime;
                    sessionStorage.setItem('userName', name);
                    // Guardar userRole en el state de React y en sessionStorage
                    setUserRole(role);
                    setUserName(name);
                    setBanTime(banTime);
                    
                    sessionStorage.setItem("userRole", role);                    
                }
    
            } catch (error) {                
                if (error.response) {
                    const statusCode = error.response.status;
                    switch (statusCode) {
                        case 429:
                            toast.error(error.response.data.message);
                            userBan();
                            setTimeBan(error.response.data.segundosBan.seconds);
                            setIsDisabled(true);
                            break;
                        case 401:
                            toast.error(error.response.data.message);
                            break;
                        case 500:
                            toast.error(error.response.data.message);
                            break;
                        case 403:
                            toast.error(error.response.data.message);
                        case 200:
                            alert("Todo bien");
                            break;                            
                        case 404:
                            alert("Error 404");
                            break;
                        default:
                            toast.error(error.response.data.message);
                            setShouldNavigateHome(true);
                    }
                } else {
                    console.error('Error en la conexión o sin respuesta del servidor:', error);
                    alert('No se pudo conectar con el servidor. Inténtalo más tarde.');
                }
            }
        };
    
        return (
            <div className="body">
                <section className="authenticationContainer">
                    <h1 className="authenticationTitle">Autenticación de 2 pasos</h1>
                    <h3 style={{color: "white"}}>Debe ingresar el código que se le envió al correo electrónico para poder entrar al sistema</h3>
                    <form onSubmit={handleSubmit(onSubmit)} name="form">
                        <input className="authenticationInput"
                            type="text"
                            {...register("authentication", {
                                required: {
                                    value: true,
                                    message: 'Debe de ingresar el código que se le envió a su correo electrónico'
                                }
                            })}
                            placeholder="Código"
                            disabled={isDisabled}
                        />
                        <button type="submit">Ingresar</button>
                        {
                            errors.authentication && <span className="authenticationSpan">{errors.authentication.message}</span>
                        }
                    </form>
                </section>
            </div>
        );
    }
    
    export default Authentication;