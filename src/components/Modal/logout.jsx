import { useContext } from "react";
import { AuthContext } from "../../context/authProvider";
import { useNavigate } from "react-router-dom";

function Logout({closeModal}){
    const navigate = useNavigate();
    const {userName} = useContext(AuthContext);

    console.log(closeModal)

    function logout(){
        navigate('/')
    }
    
    return(
        <div style={{
                position:'absolute', 
                width:'250px', 
                height:'200px', 
                backgroundColor:'skyblue',
                top:'23px',
                left:'55px',
                borderRadius:'20px',
                display:'flex',
                flexDirection:'column',
                alignItems:'center',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.7)'
                }}>

            <div style={{display:'flex', marginTop:'10px', gap:'140px'}}>
                <iconify-icon style={{color:'black', marginLeft:'20px',fontSize:"30px", cursor:'pointer'}} icon="duo-icons:user" ></iconify-icon>
                <iconify-icon style={{fontSize:"30px", marginRight:'20px', cursor:'pointer'}} onClick={closeModal} icon="iconamoon:close"></iconify-icon>
            </div>
            <h2> Hola {userName}</h2>
            <button style={{backgroundColor:'red'}} onClick={logout}>Cerrar sesión</button>
        </div>
    )
}

export default Logout;