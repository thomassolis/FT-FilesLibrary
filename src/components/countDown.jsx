import { useEffect, useState, useRef } from "react";
import { AuthContext } from "../context/authProvider";
import { useContext } from "react";

const formatTime = (time) => {
    let minutes = Math.floor(time/60)
    let seconds = Math.floor(time - minutes * 60)

    if(minutes <= 10 ) minutes = minutes;
    if(minutes <= 10 ) seconds = seconds;
    return minutes + ':' + seconds
}

export default function CountDown({seconds, message}){
    const [countDown, setCountDown] = useState(seconds);
    const timerId = useRef()

    useEffect(() => {
        timerId.current = setInterval(() =>{
            setCountDown(prev=>prev-1)
        },1000)        
        return () => clearInterval(timerId.current)
    }, [])

    useEffect(()=>{
        if(countDown <= 0){
            clearInterval(timerId.current);            
        }
    }, [countDown])

    return(
        <div className="flex justify-center items-center gap-2">
            {/* {(userRole === 'ADM' || userRole === 'CEO') &&( */}
                
                <h4
                    style={{                                                
                        padding: '0',                        
                        color: '#de1212',
                    }}
                >
                    {message} 
                    {formatTime(countDown)} minutos 
                </h4>
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="#c10b0b" d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9,9,0,0,1,12,21Z"/><rect width="2" height="7" x="11" y="6" fill="#c10b0b" rx="1"><animateTransform attributeName="transform" dur="27s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/></rect><rect width="2" height="9" x="11" y="11" fill="#c10b0b" rx="1"><animateTransform attributeName="transform" dur="2.25s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/></rect></svg>
            

        </div>
                
    )
}



