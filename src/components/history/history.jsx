import { useState } from "react";
import SmallHistory from "./smallHistory";
import { useNavigate } from "react-router-dom";

function History(){
    const navigate = useNavigate();

    const [changeSize, setChangeSize] = useState(false)
    const [expand, setExpand] = useState(false);

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
        <section style={{width:'110%', 
            height: changeSize ? '260px': '30px', 
            transition: 'height 0.5s ease',
            position:'fixed', 
            backgroundColor:'rgba(255, 237, 0, 1)', 
            bottom:'0px',             
            display:'flex', 
            flexDirection:'column',            
            }}>

            <div style={{display:'flex',justifyContent:'space-between', alignItems:'center'}}>

                <div style={{display:'flex', alignItems:'center'}}>
                    <p style={{marginLeft:'25px', transform: changeSize ? 'translateY(-2px)' : 'translateY(0)',           transition: 'transform 0.5s ease'}}>Historial de solicitudes</p>

                    <iconify-icon onClick={toggleExpand} style={{cursor:'pointer', transform: changeSize ? 'translateY(-2px)' : 'translateY(0)', transition: 'transform 0.5s ease'}} icon="ep:arrow-up-bold"></iconify-icon>
                </div>
                {/* onClick={expandHistory} */}
                <div>
                    <iconify-icon   iconify-icon style={{marginRight:'140px', cursor:'pointer', transform: changeSize ? 'translateY(0px)' : 'translateY(0)',        transition: 'transform 0.5s ease', color:'black'}} onClick={expandHistory} icon="lucide:expand"></iconify-icon>
                </div>       
            </div>
    

            {
                expand && <SmallHistory/>
            }
                       
        </section>
    )
}

export default History;