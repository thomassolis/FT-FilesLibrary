import React from "react";
import axios from '../api/axios'
import { useForm } from "react-hook-form" 
import '../Styles/loginStyle.css'
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

function Login(){
    const {register, handleSubmit,
        formState:{
            errors
        }
    } = useForm();

    console.log('errores:',errors);

    const onSubmit = async(data)=>{
        console.log(data);
        try{
            const response = await axios.post('/login',{
                Email: data.Email,
                Password: data.Password
            })
            // useNavigate('/authentication');
            // Captura los datos del usuario que vienen en la respuesta del backend
            const { token, name, email, role } = response.data;

            // Guarda el token en localStorage
            localStorage.setItem('token', token);

            // Guarda los datos del usuario en localStorage
            localStorage.setItem('user', JSON.stringify({ name, email, role }));

            // Redirige al usuario a la página de autenticación o dashboard
            navigate('/authentication');
        }
        catch{

        }
    };

    return(
        <div className="main">  	
            <div className="signup">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label aria-hidden="true">MLC Library</label>
                    <input 
                        type="email" 
                        {...register("Email",{

                            required: {
                                value: true,
                                message:"Nombre de usuario requerido"
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
                    {
                        errors.Email && <span>{errors.Email.message}</span> //Si existe Email en el objeto errors imprimirse lo que dice en message
                    }

                    <input 
                        type="password" 
                        {...register("Password",{
                            required:{
                                value:true,
                                message: "Contraseña requerida" 
                            },
                            minLength:{
                                value: 3,
                                message: "La contraseña debe tener más caracteres para ser aceptada"
                            },
                            maxLength:{
                                value: 12,
                                message: "La contraseña debe tener menos caracteres para ser aceptada"
                            }
                            
                        },)} 
                        placeholder="contraseña"                                                 
                    />
                    {
                        errors.Password && <span>{errors.Password.message}</span>
                    }

                    <button type="submit">Login</button>
                </form>
            </div>

            <div className="login">
				<form>
					<label aria-hidden="true">Login</label>				
				</form>
			</div>
        </div>
    )
}

export default Login;