import { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import '../../src/images/filesLibraryIcon.png'
import 'react-toastify/dist/ReactToastify.css';
import { enviarLogin } from "../api/auth";
import { AuthContext } from "../context/authProvider";
import logo from '../images/filesLibraryIcon.png'
import CountDown from "./countDown.jsx";
import { toast } from 'react-hot-toast';

function Login() {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const [userData, setUserData] = useState(null);

    // Credenciales Demo sugeridas para el Portafolio
    const [demoCredentials] = useState({
        email: "adm@gmail.com",
        password: "123"
    });

    const handleAutofillDemo = () => {
        setValue("email", demoCredentials.email, { shouldValidate: true });
        setValue("password", demoCredentials.password, { shouldValidate: true });
        toast.success("Credenciales demo cargadas", {
            icon: '⚡',
            style: {
                borderRadius: '8px',
                background: '#1e1b4b',
                color: '#fff',
            },
        });
    };

    //Verificación si el usuario está logeado para enviar al contexto
    const { setIsAuthenticated, isAuthenticated, isDisabled, setIsDisabled, setUserEmail } = useContext(AuthContext);
    const [timeBan, setTimeBan] = useState()
    const [loading, setLoading] = useState(false);

    const [showCountDown, setShowCountDown] = useState(false);

    // Leer si está autenticado desde sessionStorage cuando se cargue el componente
    useEffect(() => {
        const storedIsAuthenticated = sessionStorage.getItem("isAuthenticated");
        if (storedIsAuthenticated) {
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


    const isBan = () => {
        setIsDisabled(true);
        setShowCountDown(true);

    }

    const onSubmit = async (data) => {

        try {
            setLoading(true);
            const response = await enviarLogin(data); // Pasamos 'data' a enviarLogin            
            if (!response) {
                throw new Error('Response is undefined or null');
            }

            if (response.success) {
                setUserData(response.Data);  // Aquí actualizas el estado
                setUserEmail(response.Data.email);
                setIsAuthenticated(true);
            }
            else {
                toast.error(response.message)
            }
        } catch (error) {
            const errorCode = error.response?.status;
            switch (errorCode) {
                case 429:
                    toast.error(error.response?.data?.message || 'Demasiados intentos')
                    setTimeBan(error.response?.data?.segundosBan?.seconds);
                    isBan();
                    break;
                case 401:
                    toast.error(error.response?.data?.message || 'Credenciales inválidas')
                    break;
                case 500:
                    toast.error(error.response?.data?.message || 'Error del servidor')
                    break;
                default:
                    toast.error('Ha ocurrido un error')

            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="body" style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', padding: '20px', justifyContent: 'center', alignItems: 'center' }}>

            {/* Tarjeta Informativa de Portafolio / Credenciales Demo */}
            <div className="demo-card">
                <span className="demo-card-badge">Portafolio Personal</span>
                <h3 className="demo-card-title">🔑 Modo Demostración</h3>
                <p className="demo-card-desc">
                    Ingresa con las siguientes credenciales para probar las funcionalidades de la aplicación:
                </p>

                <div className="demo-card-box">
                    <div className="demo-card-row">
                        <span className="demo-card-label">Correo:</span>
                        <span className="demo-card-val">{demoCredentials.email}</span>
                    </div>
                    <div className="demo-card-row">
                        <span className="demo-card-label">Contraseña:</span>
                        <span className="demo-card-val">{demoCredentials.password}</span>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={handleAutofillDemo}
                    className="demo-card-btn"
                >
                    ⚡ Autocompletar Credenciales
                </button>
            </div>

            <div className="main">
                {/* Renderiza el ToastContainer una vez en tu aplicación */}

                <div className="signup">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <label aria-hidden="true" className="title">Files Library</label>
                        <input
                            type="email"
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
                            disabled={isDisabled}
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
                            disabled={isDisabled}
                        />
                        {errors.password && <span>{errors.password.message}</span>}

                        {/* {timeBan && <h1>Tiempo de baneo restante: {timeBan} segundos</h1> } */}

                        <button
                            className="flex items-center justify-center"
                            type="submit"
                            disabled={loading || isDisabled}
                        >
                            {loading ? (
                                <>
                                    <svg
                                        className="animate-spin h-5 w-5 mr-2"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8v8H4z"
                                        ></path>
                                    </svg>
                                    Cargando...
                                </>
                            ) : (
                                'Login'
                            )}
                        </button>
                    </form>

                    {   //Mostrar la cuenta regresiva si es true
                        showCountDown && <CountDown seconds={timeBan} message={'Vuelve a intentar luego de: '} />
                    }



                    <div className="login">
                        <img src={logo} alt="logo" />
                    </div>
                </div>
            </div>

        </section>

    );
}

export default Login;
