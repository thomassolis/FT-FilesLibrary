import { Route } from "react-router-dom";
import Routes from "../Rutas/routes";
import HeaderFiles from "../files/headerFiles";

function NoFilesMessage(){    
    return(
<section className="w-full h-full flex flex-col">
    {/* Contenedor para Routes alineado a la izquierda y arriba */}
    <HeaderFiles/>
    <div className="w-full flex justify-start ml-4 ">
        <Routes />
    </div>

    {/* Mensaje centrado */}
    <div className="flex flex-col items-center justify-center flex-grow">
        <h1 className="font-serif text-2xl">Esta carpeta no cuenta con archivos</h1>
        <iconify-icon style={{ fontSize: '130px' }} icon="noto-v1:sad-but-relieved-face"></iconify-icon>
    </div>
</section>

        
    )
}

export default NoFilesMessage;