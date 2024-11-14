
import { AuthContext } from "../../context/authProvider";
import { useContext } from "react";


const {isDisabled, setIsDisabled} = useContext(AuthContext);

export const isBan = (setIsDisabled) =>{    
    setIsDisabled(true);
}