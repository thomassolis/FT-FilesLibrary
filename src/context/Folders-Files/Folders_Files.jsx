import React, {useState, createContext} from 'react'

export const FoldersFilesContext = createContext();

export const FoldersFilesProvider = ({children}) =>{
    const [foldersId, setFoldersId] = useState(null);
    const [foldersName, setFoldersName] = useState([]);

    const [filesId, setFilesId] = useState(null);
    const [filesName, setFilesName] = useState(null);

    return(
        <FoldersFilesContext.Provider value={{foldersId, setFoldersId, foldersName, setFoldersName, setFoldersName,filesId,setFilesId, filesName, setFilesName}}>
            {children}
        </FoldersFilesContext.Provider>
    )

}

export default FoldersFilesContext;