import logo from "../../images/MLC logo.png"
import { useParams } from "react-router-dom";



function HeaderFiles(){
    const {subfolder} = useParams();

    
    return(
        <div className="bg-customBlue h-24 w-full flex items-center">

            <div className="bg-customBlue fixed w-full h-16 top-0">
                    
                    <input className="border-black border-solid pt-4 pb-4 rounded-lg fixed border ml-11" type="text" placeholder="Buscar" />                                   
                
                <img src={logo} alt="" style={{position:'fixed', right:'20px'}}/>
            </div>

        
        </div>
    )
}

export default HeaderFiles;


/*
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../images/MLC logo.png";

function HeaderFiles({ arregloArchivos }) {
    const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda
    const [filteredResults, setFilteredResults] = useState([]); // Estado para los resultados filtrados
    const navigate = useNavigate(); // Hook para redirigir al usuario

    // Función recursiva para buscar archivos en todas las capas
    const searchFilesInStructure = (structure, currentPath = "") => {
        const results = [];

        // Recorre todas las carpetas en la estructura actual
        for (const folderName in structure) {
            const folderPath = currentPath ? `${currentPath}/${folderName}` : folderName;

            // Verifica si el nombre de la carpeta coincide con el término de búsqueda
            const folderMatches = folderName.toLowerCase().includes(searchTerm);

            // Obtén los archivos dentro de la carpeta, si existen
            const files = structure[folderName]?.files || [];
            const matchedFiles = files.filter((file) =>
                file.name.toLowerCase().includes(searchTerm)
            );

            // Si hay coincidencias en archivos, agrégalos con la ruta completa
            matchedFiles.forEach((file) => {
                results.push({ name: file.name, path: `${folderPath}/${file.name}` });
            });

            // Si la carpeta coincide y no tiene archivos
            if (folderMatches && !files.length) {
                results.push({ name: folderName, path: folderPath });
            }

            // Si hay subcarpetas, realiza una búsqueda recursiva
            const subfolders = Object.keys(structure[folderName] || {}).filter(
                (key) => key !== "files"
            );
            subfolders.forEach((subfolder) => {
                const subfolderResults = searchFilesInStructure(
                    { [subfolder]: structure[folderName][subfolder] },
                    folderPath
                );
                results.push(...subfolderResults);
            });
        }

        return results;
    };

    // Maneja el cambio del input de búsqueda
    const handleSearchChange = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);

        // Si no hay término de búsqueda, no muestra resultados
        if (!value) {
            setFilteredResults([]);
            return;
        }

        // Busca en toda la estructura
        const results = searchFilesInStructure(arregloArchivos);
        setFilteredResults(results);
    };

    // Redirige a la ruta del archivo o carpeta seleccionada
    const handleNavigate = (path) => {
        navigate(path); // Navega a la ruta especificada
    };

    return (
        <div className="bg-customBlue h-24 w-full flex items-center">

            <div className="bg-customBlue fixed w-full h-16 top-0 flex items-center px-10 shadow-md">
                <input
                    className="border border-gray-300 rounded-lg px-4 py-2 w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                    placeholder="Buscar archivos o carpetas..."
                    value={searchTerm} // Conecta el estado del input
                    onChange={handleSearchChange} // Maneja el evento de cambio
                />
                <img
                    src={logo}
                    alt="Logo"
                    className="ml-auto h-10"
                    style={{ position: "fixed", right: "20px" }}
                />
            </div>

   
            <div className="mt-20 p-4">
                {filteredResults.length > 0 ? (
                    <ul className="bg-white rounded-lg shadow-md p-4">
                        {filteredResults.map((result, index) => (
                            <li
                                key={index}
                                className="cursor-pointer text-gray-700 hover:text-blue-500 hover:bg-gray-100 p-2 rounded"
                                onClick={() => handleNavigate(result.path)}
                            >
                                {result.name}
                            </li>
                        ))}
                    </ul>
                ) : (
                    searchTerm && (
                        <p className="text-gray-500 italic">No se encontraron resultados</p>
                    )
                )}
            </div>
        </div>
    );
}

export default HeaderFiles;

*/ 