import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getFilesData } from "../../api/files";
import PrevisualizeFile from "../Modal/PrevisualizeFile";
import { AuthContext } from "../../context/authProvider";
import { useContext } from "react";
import FoldersFilesContext from "../../context/Folders-Files/Folders_Files";
import SeeFileWaterBrand from "../Modal/seeFileWaterBrand";
import SeeFile from "../Modal/seeFile";
import { ModalContext } from "../../context/closeModals";
import logo from "../../images/MLC logo.png";
import { useNavigate } from "react-router-dom";
import _ from "lodash"; // Para debounce

const HeaderFiles = () => {
  const { subfolder } = useParams();
  const [searchTerm, setSearchTerm] = useState(""); // Estado para la barra de búsqueda
  const [filteredResults, setFilteredResults] = useState([]); // Resultados filtrados
  const [fileData, setFileData] = useState(null); // Datos de los archivos
  const [selectedFile, setSelectedFile] = useState(null); // Archivo seleccionado
  const [isLoading, setIsLoading] = useState(true); // Estado de carga
  const { userRole } = useContext(AuthContext);
  const {selectedFolder, setSelectedFolder} = useContext(FoldersFilesContext)
  const {
    modalSeeFile,
    setModalSeeFile,
    modalSeeFileWaterBrand,
    setModalSeeFileWaterBrand,
    previsualizeFile,
    setPrevisualizeFile,
  } = useContext(ModalContext);
  const Navigate = useNavigate()

  useEffect(() => {
    const fetchFiles = async () => {
      setIsLoading(true);
      const response = await getFilesData();
      setFileData(response.data);
      setIsLoading(false); // Archivos cargados
    };
    fetchFiles();
  }, []);

  const searchFilesInStructure = (structure, searchTerm, currentPath = "") => {
    const results = [];
    for (const folderName in structure) {
      const folderPath = currentPath ? `${currentPath}/${folderName}` : folderName;
      const files = structure[folderName]?.files || [];
      const matchedFiles = files.filter((file) =>
        file.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      matchedFiles.forEach((file) => {
        results.push({
          id: file.id,
          name: file.name,
          path: `${folderPath}/${file.name}`,
        });
      });
      const subfolders = Object.keys(structure[folderName] || {}).filter(
        (key) => key !== "files"
      );
      subfolders.forEach((subfolder) => {
        const subfolderResults = searchFilesInStructure(
          { [subfolder]: structure[folderName][subfolder] },
          searchTerm,
          folderPath
        );
        results.push(...subfolderResults);
      });
    }
    return results;
  };

  const handleSearchChange = _.debounce((value) => {
    if (isLoading) return; // Ignora entradas si está cargando


    if (!value || !fileData) {
      setFilteredResults([]);
      return;
    }
    const results = searchFilesInStructure(fileData, value);
    setFilteredResults(results);
  }, 300); // Espera 300ms después de que el usuario deje de escribir

  const onSearchInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    handleSearchChange(value);
  };

  const handleFileClick = (file) => {
    setSelectedFile(file);
    if(userRole === 'ADM' || userRole === 'CEO'){
        setPrevisualizeFile(true);
    } else if(userRole === 'GER'){
        setModalSeeFileWaterBrand(true);
    }else{
        setModalSeeFile(true)
    }
    
  };

  const closeModal = () => {
    if (userRole === "ADM" || userRole === 'CEO') setPrevisualizeFile(false);
    else if (userRole === "GER") setModalSeeFileWaterBrand(false);
    else if (userRole === "OPE") setModalSeeFile(false);
  };


  const renderModal = () => {
    if ((userRole === "ADM" || userRole === 'CEO') && previsualizeFile) {
      return (
        <PrevisualizeFile
          fileId={selectedFile.id}
          fileName={selectedFile.name}
          closeModal={closeModal}
        />
      );
    }
    if (userRole === "GER" && modalSeeFileWaterBrand) {
      return (
        <SeeFileWaterBrand
          fileId={selectedFile.id}
          fileName={selectedFile.name}
          closeModal={closeModal}
        />
      );
    }
    if (userRole === "OPE" && modalSeeFile) {
      return (
        <SeeFile
          fileId={selectedFile.id}
          fileName={selectedFile.name}
          closeModal={closeModal}
        />
      );
    }
    return null; // Si no hay condiciones que cumplir, no mostrar nada.
  };

  // function handleClick(){
  //   Navigate(`/${selectedFolder}`);
  // }
  

  return (

    <div className="bg-customBlue h-24 w-full flex items-center">
      <div className="bg-customBlue fixed w-full h-16 top-0">
        {isLoading ? (
            <>
                <input
                    className="fixed w-1/3 pt-4 pb-4 ml-56 bg-gray-200 rounded-lg border border-black border-solid cursor-not-allowed max-[765px]:ml-28  max-[517px]:ml-16  max-[417px]:ml-2"
 
                    value={searchTerm}
                    onChange={handleSearchChange}
                    type="text"
                    placeholder="Cargando..."
                />
                <img src={logo} alt="Logo" style={{ position: "fixed", right: "20px", cursor:"pointer" }}/>
            </>          
        ) : (
          <>
            <input
              className="border-black border-solid pt-4 pb-4 rounded-lg fixed border ml-56 w-1/3 max-[765px]:ml-28 max-[517px]:ml-16 max-[417px]:ml-2"
              type="text"
              placeholder="Buscar archivo"
              value={searchTerm}
              onChange={onSearchInputChange}
            />
            <img src={logo} alt="Logo" style={{ position: "fixed", right: "20px", cursor:"pointer" }} />
          </>
        )}
        {filteredResults.length > 0 && (
          <ul className="absolute top-14 bg-white rounded-lg shadow-md p-4 w-1/3 ml-56">
            {filteredResults.map((file, index) => (
                <li
                    key={file.id || index}
                    className="relative cursor-pointer text-gray-700 hover:text-blue-500 hover:bg-gray-100 p-2 rounded"
                    onClick={() => handleFileClick(file)}
                    >
                    {file.name}
                    <span className="text-slate-500 absolute bottom-0 right-0 truncate">
                        {file.path}
                    </span>
                </li>

            ))}
          </ul>
        )}
        {selectedFile && renderModal()}

      </div>
    </div>
  );
};

export default HeaderFiles;
