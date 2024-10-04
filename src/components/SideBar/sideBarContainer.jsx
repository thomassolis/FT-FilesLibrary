import Title from "../title";
import FoalderSidebar from "./foalderSidebar";

function SidebarContainer({foalderData}){
    console.log('desde sidebar: ',foalderData);

    return(
        <div style={{width:'25vw', height:'100%', backgroundColor:'rgba(0, 0, 112, 1)', display:'flex', flexDirection:'column', gap:'30px', position:'fixed'}}>
            <div>
                <Title/>
            </div>

            <div style={{display:'flex', flexDirection:'column', gap:'30px'}}>   


                {foalderData.map((foalder,index) =>(
                    <FoalderSidebar key={index} foalderName={foalder}/>                    
                ))}              



            </div>
            
        </div>
    )
}

export default SidebarContainer;