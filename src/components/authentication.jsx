import { useForm } from "react-hook-form";
import '../Styles/authenticationStyle.css';
import { useNavigate } from 'react-router-dom'; 
import { useState, useEffect, useContext } from "react";
import { enviarVerificacion2pasos } from "../api/auth"; 
import React from 'react';
import { AuthContext } from "../context/authProvider";
import Home from "./home";

function Authentication() {
    // const {setIsBan} = AuthContext()
    const { register, handleSubmit, getValues, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [shouldNavigateHome, setShouldNavigateHome] = useState(false);
    const [shouldNavigateLogin, setShouldNavigateLogin] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false); //Valida si se deshabilita o no el input

    //Datos que vienen del backend 
    
    const {userRole, setUserRole, userName, setUserName, banTime, setBanTime } = useContext(AuthContext);

    //ir a home al pasar la verificación
    useEffect(() => {
                
        if (shouldNavigateHome) {
            const rol = userRole;
            navigate('/home'); //Va hacia la url con el rol
        }
    }, [shouldNavigateHome]);

    const isBan = () =>{    
        setIsDisabled(true);

        //Mostrando el tiempo de baneo en pantalla
        console.log('Tiempo de baneo desde función: ',timeBan)

        // <CountDown seconds={timeBan}/>

        setShowCountDown(true);
       
    }

    //Función que manejará el input en caso de un error 219
    const userBan = () => {
        setIsDisabled(true);
        const fieldName = "authentication";
        const value = getValues(fieldName); // Obtener el valor del input por su nombre
        console.log('fieldName: ',fieldName);
        console.log('value: ',value);
        
    };

    

    //Funcion al enviar el formulario
    const onSubmit = async (data) => {
        try {
            const response = await enviarVerificacion2pasos(data);
            
            if (response && response.success && response.status==200) {                    
                console.log(response);
                setShouldNavigateHome(true);                
                setUserRole(response.Data.userRol);
                setUserName(response.Data.userName);
                setBanTime(response.Data.banTime);
                // setIsBan(response.data.isBan);
            }

        } catch (error) {
            console.log(error.response);
            if (error.response) {
                const statusCode = error.response.status;
                // console.error(Error ${statusCode}:, error.response.data.message);
                
                switch (statusCode) {
                    case 429:
                        alert(error.response.data.message);                    
                        userBan();
                        setTimeBan(error.response.data.segundosBan.seconds);

                        isBan(); 
                        // setIsBan(true)
                        break;
                    case 401:
                        alert(error.response.data.message);
                        break;
                    case 500:
                        alert(error.response.data.message);
                        break;
                    case 200:
                        alert("Todo bien")
                        break;
                    case 404:
                        alert("Error 404")
                        break;
                    default:
                        alert('Ha ocurrido un error');
                        alert(error.response.data.message);
                        setShouldNavigateHome(true)
                }
            } else {
                console.error('Error en la conexión o sin respuesta del servidor:', error);
                alert('No se pudo conectar con el servidor. Inténtalo más tarde.');
            }
        }
    }
    
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
                        disabled = {isDisabled}                        
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