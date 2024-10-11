import React, {useState, createContext} from 'react'

export const FoldersFilesContext = createContext();

export const FoldersFilesProvider = ({children}) =>{
    const [selectedFolder, setSelectedFolder] = useState(null);
    const [filesData, setFilesData] = useState({})

    return(
        <FoldersFilesContext.Provider value={{selectedFolder, setSelectedFolder, filesData, setFilesData}}>
            {children}
        </FoldersFilesContext.Provider>
    )

}

export default FoldersFilesContext;