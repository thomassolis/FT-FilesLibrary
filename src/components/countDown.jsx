import { useEffect, useState, useRef } from "react";


const formatTime = (time) => {
    let minutes = Math.floor(time/60)
    let seconds = Math.floor(time - minutes * 60)

    if(minutes <= 10 ) minutes = minutes;
    if(minutes <= 10 ) seconds = seconds;
    return minutes + ':' + seconds
}

export default function CountDown({seconds}){
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
        <h4 style={{'marginLeft':'70px','marginTop':'25px', 'padding':'0', 'position':'absolute', 'color': '#de1212'}}> Try again in: {formatTime(countDown)} minutes</h4>
    )
}



