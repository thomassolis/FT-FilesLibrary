import React, {useState, useEffect} from "react";
import axios from '../src/api/axios'
import Login from "./components/login";
import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Authentication from "./components/authentication";

function App() {
  const [data,setData] = useState();

  const getData = async()=>{
    const response = await axios.get("http://localhost:5000/getData");
    setData(response.data);
  }

  useEffect(()=>{
    getData();
  },[]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}></Route> 
        <Route path="/authentication" element={<Authentication/>}></Route>         
      </Routes>
      {/* <Login/> */}
    </BrowserRouter>
  )
}

export default App
