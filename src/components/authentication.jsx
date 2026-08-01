import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from "react";
import { enviarVerificacion2pasos } from "../api/auth";
import React from 'react';
import { AuthContext } from "../context/authProvider";
import Home from "./home";
import FoldersFilesContext from "../context/Folders-Files/Folders_Files";
import { Toaster, toast } from 'react-hot-toast';
import '../Styles/authenticationStyle.css';

function Authentication() {
    const { register, handleSubmit, getValues, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [shouldNavigateHome, setShouldNavigateHome] = useState(false);
    const [shouldNavigateLogin, setShouldNavigateLogin] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false); //Valida si se deshabilita o no el input

    //Datos que vienen del backend y se guardarán
    const { userRole, setUserRole, userName, setUserName, banTime, setBanTime, userEmail } = useContext(AuthContext);
    const { filesData, setFilesData, selectedFolder, setSelectedFolder } = useContext(FoldersFilesContext);
    const [FolderData, setFolderData] = useState([]);
    // Leer el userRole desde sessionStorage cuando se cargue el componente
    useEffect(() => {
        const storedUserRole = sessionStorage.getItem("userRole");
        if (storedUserRole) {
            // Restaura el userRole desde sessionStorage y lo guarda en el contexto
            setUserRole(storedUserRole);
        }
    }, [setUserRole]);



    // Navegar a home cuando sea necesario
    useEffect(() => {
        if (shouldNavigateHome) {
            navigate('/Home'); // Cambia la URL cuando selectedFolder está disponible
        } else if (!selectedFolder) {
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
            const response = await enviarVerificacion2pasos(data, userEmail);
            if (response && response.data?.success) {
                const role = response.data.data.nombre_rol;
                const name = response.data.data.nombre;
                const banTime = response.data.data.banTime;
                sessionStorage.setItem('userName', name);
                setUserRole(role);
                setUserName(name);
                setBanTime(banTime);
                sessionStorage.setItem("userRole", role);
                setShouldNavigateHome(true);
            } else {
                // Modo Portafolio: permitir ingreso con cualquier código
                setShouldNavigateHome(true);
            }
        } catch (error) {
            // Modo Portafolio: permitir ingreso con cualquier código si el backend no responde
            setShouldNavigateHome(true);
        }
    };

    return (
        <div className="body" style={{ position: 'relative' }}>
            {/* Aviso Flotante para el Portafolio */}
            <div className="demo-floating-notice">
                <span style={{ fontSize: '1.2rem' }}>💡</span>
                <span>
                    <strong>Modo Portafolio:</strong> Puedes ingresar cualquier código para continuar (2FA deshabilitado para demostración).
                </span>
            </div>

            <section className="authenticationContainer">
                <h1 className="authenticationTitle">Autenticación de 2 pasos</h1>
                <h3 style={{ color: "white" }}>Debe ingresar el código que se le envió en la aplicación authenticator</h3>
                <form onSubmit={handleSubmit(onSubmit)} name="form">
                    <input className="authenticationInput"
                        type="text"
                        {...register("authentication", {
                            required: {
                                value: true,
                                message: 'Debe de ingresar el código'
                            }
                        })}
                        placeholder="Ingrese cualquier código"
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