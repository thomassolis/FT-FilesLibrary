import React, {useState, createContext} from "react";


export const PermissionsContext =createContext();

export const PermissionsProvider = ({children}) =>{
    const [requestSeeFile, setRequestSeeFile] = useState(false);

    return(
        <PermissionsContext.Provider value={{requestSeeFile, setRequestSeeFile}}>
            {children}
        </PermissionsContext.Provider> 
    );
};

export default PermissionsContext;