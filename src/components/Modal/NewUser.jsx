import { useForm } from "react-hook-form";
import { CreateNewUser } from "../../api/creacionUsuarios";
import React from "react";
import { FadeLoader } from "react-spinners";
export const NewUser = ({ setCreateUser }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loading, setLoading] = React.useState(false);

    const onSubmit = async (data) => {
        try {
            setLoading(true); // Mostrar el spinner
            const response = await CreateNewUser(data);
            if (response.success) {
                setCreateUser(false);
            }
        } catch (error) {
            return []
        } finally {
            setLoading(false); // Ocultar el spinner después de la respuesta
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-[30%] text-center h-[80%]">
                <h2 className="text-xl font-bold mb-4">Crear Usuario</h2>

                {/* Spinner de carga */}
                {loading && (
                    <div className="flex justify-center items-center w-full h-screen">
                        <FadeLoader size={15} />
                    </div>
                )}

                {/* Formulario */}
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 text-left">
                    {/* Nombre */}
                    <div>
                        <label className="block text-sm font-medium">Nombre</label>
                        <input
                            type="text"
                            {...register("nombre", { required: "El nombre es obligatorio" })}
                            className="w-full border m-0 border-gray-300 rounded px-3 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={loading} // Deshabilitar el input cuando se está cargando
                        />
                        {errors.nombre && <p className="text-red-500 text-xs">{errors.nombre.message}</p>}
                    </div>

                    {/* Apellido (Opcional) */}
                    <div>
                        <label className="block text-sm font-medium">Apellido</label>
                        <input
                            type="text"
                            {...register("apellido")}
                            className="w-full border m-0 border-gray-300 rounded px-3 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={loading} // Deshabilitar el input cuando se está cargando
                        />
                    </div>

                    {/* Departamento (Select) */}
                    <div>
                        <label className="block text-sm font-medium">Departamento</label>
                        <select
                            {...register("departamento", { required: "Selecciona un departamento" })}
                            className="w-full border border-gray-300 rounded px-3 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={loading}  >
                            <option value="">Seleccione...</option>
                            <option value="TI">IT</option>
                            <option value="Recursos Humanos">Recursos Humanos</option>
                            <option value="Contabilidad">Finanzas</option>
                            <option value="Pricing">Pricing</option>
                            <option value="Ventas">Ventas</option>
                            <option value="Customer Service">Customer Service</option>
                            <option value="wcp">World Connecta</option>
                            <option value="Bodega">Bodega</option>
                        </select>
                        {errors.departamento && <p className="text-red-500 text-xs">{errors.departamento.message}</p>}
                    </div>

                    {/* Rol (Select) */}
                    <div>
                        <label className="block text-sm font-medium">Rol</label>
                        <select
                            {...register("rol", { required: "Selecciona un rol" })}
                            className="w-full border border-gray-300 rounded px-3 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={loading} // Deshabilitar el select cuando se está cargando
                        >
                            <option value="">Seleccione...</option>
                            <option value="CEO">Super Administrador</option>
                            <option value="ADM">Administrador</option>
                            <option value="GER">Gerencia</option>
                            <option value="OPE">Operador</option>
                        </select>
                        {errors.rol && <p className="text-red-500 text-xs">{errors.rol.message}</p>}
                    </div>

                    {/* Correo Electrónico */}
                    <div>
                        <label className="block text-sm font-medium">Correo Electrónico</label>
                        <input
                            type="email"
                            {...register("correo", {
                                required: "El correo es obligatorio",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: "Correo inválido"
                                }
                            })}
                            className="w-full m-0 border border-gray-300 rounded px-3 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={loading} // Deshabilitar el input cuando se está cargando
                        />
                        {errors.correo && <p className="text-red-500 text-xs">{errors.correo.message}</p>}
                    </div>

                    {/* Contraseña */}
                    <div>
                        <label className="block text-sm font-medium">Contraseña</label>
                        <input
                            type="password"
                            {...register("password", { required: "La contraseña es obligatoria" })}
                            className="w-full border m-0 border-gray-300 rounded px-3 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={loading} // Deshabilitar el input cuando se está cargando
                        />
                        {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
                    </div>

                    {/* Botones */}
                    <div className="flex justify-between mt-4 gap-4">
                        <button
                            type="button"
                            className="bg-red-500 text-white px-4 py-2 m-0 rounded"
                            onClick={() => setCreateUser(false)}
                            disabled={loading} // Deshabilitar el botón cuando se está cargando
                        >
                            Cerrar
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 m-0 rounded"
                            disabled={loading} // Deshabilitar el botón cuando se está cargando
                        >
                            Crear
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
