import { useContext, useState } from "react";
import AuthProvider, { AuthContext } from "../../context/authProvider";
import { useNavigate } from "react-router-dom";
import { NewUser } from "./NewUser";

function Logout({closeModal}){
    const navigate = useNavigate();
    const userName = sessionStorage.getItem('userName');
    const {userRole} = useContext(AuthContext);
    const [createUser, setCreateUser] = useState(false);

    function logout(){
        navigate('/')
    }
    
    return(
        <div style={{
                    position:'absolute', 
                    width:'270px', 
                    height:'200px', 
                    backgroundColor:'skyblue',
                    top:'7px',
                    left:'20px',
                    borderRadius:'20px',
                    display:'flex',
                    flexDirection:'column',
                    alignItems:'center',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.7)',
                    zIndex:50
                }}>

            <div style={{display:'flex', marginTop:'10px', gap:'170px'}}>
                <iconify-icon style={{color:'black', marginLeft:'20px',fontSize:"30px", cursor:'pointer'}} icon="duo-icons:user" ></iconify-icon>
                <iconify-icon style={{fontSize:"30px", marginRight:'20px', cursor:'pointer'}} onClick={closeModal} icon="iconamoon:close"></iconify-icon>
            </div>
            <h2 className="font-serif text-xl">{userName}</h2>
            <div className="flex flex-col w-full gap-2 mt-4 items-center justify-center  h-[90%]">                
                {userRole === 'CEO' ? ( 
                    <button style={{backgroundColor:'green'}} className="p-0 m-0" onClick={() => setCreateUser(true)}>Agregar Usuario</button>
                ) : (
                    <></>
                )}
                <button style={{backgroundColor:'red'}} className="p-0 m-0" onClick={logout}>Cerrar sesión</button>                
            </div>            

            {createUser && (
                <NewUser setCreateUser={setCreateUser}/>
            )}
        </div>
    )
}

export default Logout;