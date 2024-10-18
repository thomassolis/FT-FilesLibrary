import { useNavigate } from "react-router-dom";

function SubFolder({ folderName, album, onSelect }) {
    const navigate = useNavigate();

    function handleClick() {
        console.log('onSelect:',onSelect);
        if (onSelect) {
            onSelect(folderName); // Pasar el folderName a onSelect
        }
        navigate(`/home/${folderName}`); // Navegar a la ruta con la carpeta seleccionada
    }

    return (
        <div onClick={handleClick} className="flex justify-center items-center font-bold cursor-pointer border border-black rounded border-dashed p-4 w-auto m-3 hover:bg-slate-400">
            <iconify-icon style={{fontSize:'25px'}} icon="fxemoji:folder"></iconify-icon>
            <p className="ml-2">{folderName}</p>            
        </div>
    );
}

export default SubFolder;
