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