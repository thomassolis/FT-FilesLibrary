import '../../src/Styles/homeStyle.css'
import React, {useContext} from 'react';
import { AuthContext } from '../context/authProvider';

function Home(){
    const{userRole, userName, banTime} = useContext(AuthContext)
    return(
        <>
        <h1>Home</h1>
        <div>
            <p>User Role: {userRole}</p>
            <p>User Name: {userName}</p>
            <p>Ban Time: {banTime}</p>
        </div>
        </>
    )
}

export default Home;