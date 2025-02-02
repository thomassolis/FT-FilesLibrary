import React, {useState, useEffect, useContext} from "react";
import { useForm } from "react-hook-form" 

import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import '../../src/images/MLC logo.png'
import 'react-toastify/dist/ReactToastify.css';
import { enviarLogin } from "../api/auth";
import { AuthContext } from "../context/authProvider";
import logo from '../images/MLC logo.png'
import CountDown from "./countDown.jsx";
import { Toaster,toast } from 'react-hot-toast';
function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    
    const [userData, setUserData] = useState(null);

    //Verificación si el usuario está logeado para enviar al contexto
    const {setIsAuthenticated, isAuthenticated, isDisabled, setIsDisabled, setUserEmail} = useContext(AuthContext);    
    const [timeBan, setTimeBan] = useState()


    const [showCountDown, setShowCountDown] = useState(false);

    // Leer si está autenticado desde sessionStorage cuando se cargue el componente
    useEffect(()=>{
        const storedIsAuthenticated = sessionStorage.getItem("isAuthenticated");
        if(storedIsAuthenticated){
            setIsAuthenticated(storedIsAuthenticated)
        }
    }, [setIsAuthenticated]);

    useEffect(() => {
        sessionStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
    }, [isAuthenticated]);
    

    // Este useEffect se ejecuta cada vez que userData cambia
    useEffect(() => {
        if (userData) {            
            navigate('/authentication');
        }
    }, [userData]); // Se ejecuta cuando `userData` cambia


    const isBan = () =>{    
        setIsDisabled(true);        
        setShowCountDown(true);
       
    }

    const onSubmit = async (data) => {        
        
        try {
            const response = await enviarLogin(data); // Pasamos 'data' a enviarLogin
            if (!response) {
                throw new Error('Response is undefined or null');
            }
    
            if (response.success) {
                setUserData(response.Data);  // Aquí actualizas el estado
                setUserEmail(response.Data.email);
                setIsAuthenticated(true);          
            }
        } catch (error) {                        
            const errorCode = error.response.status;
            switch(errorCode){
                case 429:
                    toast.error(error.response.data.message)                    
                    setTimeBan(error.response.data.segundosBan.seconds);
                    isBan();        
                    break;
                case 401:
                    toast.error(error.response.data.message)                    
                    break;
                case 500:
                    toast.error(error.response.data.message)                    
                    break;
                default:
                    toast.error('Ha ocurrido un error')
                    
            }


        }
    };

    return (
        <section className="body">
            <div className="main">  	
                {/* Renderiza el ToastContainer una vez en tu aplicación */}
                
                <div className="signup">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <label aria-hidden="true" className="title">MLC Library</label>
                        <input 
                            type="email"
                            // disabled = {isBan}

                           
                            {...register("email", {
                                required: {
                                    value: true,
                                    message: "Nombre de usuario requerido"
                                },
                                minLength: {
                                    value: 3,
                                    message: "El usuario debe tener más caracteres para ser aceptado"
                                }
                            })}
                            placeholder="email"
                            disabled = {isDisabled}                    
                        />
                        {errors.email && <span>{errors.email.message}</span>}

                        <input 
                            type="password" 
                            
                            {...register("password", {
                                required: {
                                    value: true,
                                    message: "Contraseña requerida"
                                },
                                minLength: {
                                    value: 3,
                                    message: "La contraseña debe tener más caracteres para ser aceptada"
                                }
                              
                            })} 
                            placeholder="contraseña"   
                            disabled = {isDisabled}
                        />
                        {errors.password && <span>{errors.password.message}</span>}

                        {/* {timeBan && <h1>Tiempo de baneo restante: {timeBan} segundos</h1> } */}

                        <button type="submit">Login</button>
                    </form>

                    {   //Mostrar la cuenta regresiva si es true
                        showCountDown && <CountDown seconds={timeBan}/>
                    }
            
                    

                    <div className="login">                        
                            <img src={logo} alt="logo"/>
                    </div>
                </div>
            </div>

        </section>
        
    );
}

export default Login;
