import React, {useState, useEffect} from "react";
import axios from '../src/api/axios'
import Login from "./components/login";
import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Authentication from "./components/authentication";
import Home from "./components/home";
import AuthProvider from "./context/authProvider";
import ProtectedRoute from "./components/protectedRoute";

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
    <AuthProvider>
  <BrowserRouter>
    <Routes>
      {/* Ruta pública que no requiere autenticación */}

      <Route path="/" element={<Login />} />

      {/* Ruta de autenticación accesible solo si se ha iniciado sesión */}
      <Route element={<ProtectedRoute redirectTo="/" />}>
        <Route path="/authentication" element={<Authentication />} />
      </Route>

      {/* Rutas protegidas que requieren un rol */}
      <Route element={<ProtectedRoute allowedRoles={['ADM', 'GER', 'USER']} redirectTo="/" />}>
        <Route path="/home" element={<Home />} />
        
      </Route>
      <Route path="*" element={<Login />} />
      
    </Routes>
  </BrowserRouter>
</AuthProvider>

  )
}

export default App;
