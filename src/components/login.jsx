import React, {useState, useEffect, useContext} from "react";
import { useForm } from "react-hook-form" 
import '../Styles/loginStyle.css'
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import '../../src/images/MLC logo.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { enviarLogin } from "../api/auth";
import { AuthContext } from "../context/authProvider";

function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    
    const [userData, setUserData] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    //Inicialmente deshabilitado
    const [inputsDisabled, setInputsDisabled] = useState(false); // Por defecto, inputs habilitados

    //Estado que hará los input deshabilitados
  

    //Variables que vienen del contexto
    // const {isBan} = useContext(counterContext)

    // useEffect(()=>{
    //     if(isBan){
    //         alert("ups fuiste baneado!!!!!")
    //     }
    // },[isBan])

    const {setIsAuthenticated, isAuthenticated} = useContext(AuthContext);

    // Este useEffect se ejecuta cada vez que userData cambia
    useEffect(() => {
        if (userData) {
            console.log('userData actualizada:', userData);
            navigate('/authentication');
        }
    }, [userData]); // Se ejecuta cuando `userData` cambia

    const onSubmit = async (data) => {
        console.log('data', data);
        try {
            const response = await enviarLogin(data); // Pasamos 'data' a enviarLogin
            
            if (!response) {
                throw new Error('Response is undefined or null');
            }
            //conexion buena front <-> back
            console.log('response', response);
    
            if (response.success) {
                setUserData(response.Data);  // Aquí actualizas el estado
                setIsAuthenticated(true);
            } else {
                setErrorMessage(response.data.message);
                toast.error(response.message);
            }
        } catch (error) {
            //conexion se interrumpio front <-> back(error 400 a 500)
            toast.error(response.message);
        }
    };

    return (
        <section className="body">
            <div className="main">  	
                {/* Renderiza el ToastContainer una vez en tu aplicación */}
                <ToastContainer />
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
                                },
                                maxLength: {
                                    value: 30,
                                    message: "El usuario debe tener menos caracteres para ser aceptado"
                                }
                            })}
                            placeholder="email"                    
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
                                },
                                maxLength: {
                                    value: 12,
                                    message: "La contraseña debe tener menos caracteres para ser aceptada"
                                }
                            })} 
                            placeholder="contraseña"                                                 
                        />
                        {errors.password && <span>{errors.password.message}</span>}

                        <button type="submit">Login</button>
                    </form>
                    

                    <div className="login">

                    </div>
                </div>
            </div>
        </section>
    );
}

export default Login;
