import logo from "../../images/MLC logo.png"
function HeaderFiles(){
    
    return(
        <div style={{display:'flex', backgroundColor:'rgba(172, 207, 217, 1)',height:'90px', position:'fixed', width:'100%', top:'0'}}>
            <iconify-icon style={{position:'absolute', top:'33px'}} icon="ic:baseline-search"></iconify-icon>
            <input style={{border:"1px solid black", paddingTop:'15px', paddingBottom:'15px', borderRadius:'10px', width:'700px', position:'fixed' }} type="text" placeholder="Buscar"                 
            />
            <img src={logo} alt="" style={{position:'fixed', right:'20px'}}/>
        </div>
    )
}

export default HeaderFiles;