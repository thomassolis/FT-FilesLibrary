import { useNavigate, useParams } from "react-router-dom";

function SubFolder({ folderName, onSelect, isSelected }) {
    const { folder, subfolder, subsubfolder } = useParams(); // Obtenemos los parámetros de la URL
    const navigate = useNavigate();


    function handleClick() {
        if (onSelect) {
            onSelect(folderName); // Pasar el folderName a onSelect para Home
        }
        // Construimos la nueva ruta en función de si estamos en una carpeta o subcarpeta
        const newPath = subfolder ? `/${folder}/${subfolder}/${folderName}` : `/${folder}/${folderName}`;
        navigate(newPath); 
    }

    return (
        <div onClick={handleClick} className={`flex justify-center items-center font-bold cursor-pointer  w-full m-3`}>
            <iconify-icon style={{ fontSize: '25px' }} icon="fxemoji:folder"></iconify-icon>
            <p className="ml-2 w-full truncate">{folderName}</p>            
        </div>
    );
}

export default SubFolder;
