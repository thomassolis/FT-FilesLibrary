import { useState } from "react";
import SmallHistory from "./smallHistory";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authProvider";
import { useContext } from "react";

function History(){
    const navigate = useNavigate();

    const [changeSize, setChangeSize] = useState(false)
    const [expand, setExpand] = useState(false);

    const {userRole} = useContext(AuthContext);

    function toggleExpand(){
        setChangeSize(!changeSize);
        setExpand(!expand);
        
    }

    function expandHistory(){
        setExpand(true);
        if(expand){
            navigate('/completeHistory')
        }
    }

    return(
        <section 
            className={`w-full fixed bg-[rgba(255,237,0,1)] bottom-0 flex flex-col transition-all duration-500 
                ${changeSize ? 'h-[160px]' : 'h-[30px]'}`}
            >

            <div className="flex justify-between items-center">

                <div className="flex items-center">
                    <p style={{paddingLeft:'25px', transform: changeSize ? 'translateY(-2px)' : 'translateY(0)',           transition: 'transform 0.5s ease'}}>Historial de solicitudes</p>

                    <iconify-icon onClick={toggleExpand} style={{cursor:'pointer', transform: changeSize ? 'translateY(-2px)' : 'translateY(0)', transition: 'transform 0.5s ease'}} icon="ep:arrow-up-bold"></iconify-icon>
                </div>
                {/* onClick={expandHistory} */}

                {userRole === 'ADM' &&
                    <div>
                        <iconify-icon   iconify-icon style={{cursor:'pointer',  paddingRight:'10px',transform: changeSize ? 'translateY(0px)' : 'translateY(0)',        transition: 'transform 0.5s ease', color:'black'}} onClick={expandHistory} icon="lucide:expand"></iconify-icon>
                    </div>     
                }
  
            </div>
    

            {
                expand && <SmallHistory/>
            }
                       
        </section>
    )
}

export default History;