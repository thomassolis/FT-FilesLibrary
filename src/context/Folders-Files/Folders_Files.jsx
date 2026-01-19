import React, {useState, useEffect, createContext} from 'react'

export const FoldersFilesContext = createContext();

export const FoldersFilesProvider = ({children}) =>{
    const [selectedFolder, setSelectedFolder] = useState(null);
    const [filesData, setFilesData] = useState({})
    
    useEffect(()=>{
        sessionStorage.setItem('selectedFolder', JSON.stringify(selectedFolder));
    },[selectedFolder])
    
    return(
        <FoldersFilesContext.Provider value={{selectedFolder, setSelectedFolder, filesData, setFilesData}}>
            {children}
        </FoldersFilesContext.Provider>
    )

}

export default FoldersFilesContext;