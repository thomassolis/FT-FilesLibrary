import React, {useState, useEffect} from "react";
import axios from '../src/api/axios'
import Login from "./components/login";
import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Authentication from "./components/authentication";
import Home from "./components/home";
import AuthProvider from "./context/authProvider";
import ProtectedRoute from "./components/protectedRoute";
import NotFound from "./components/notFound";
import CompleteHistory from "./components/history/completeHistory";
import { PermissionsProvider } from "./context/permissions/permissionsProvider";
import { FoldersFilesProvider } from "./context/Folders-Files/Folders_Files";
import NewSubFolder from "./components/NewSubFolder";
import { Toaster,toast } from 'react-hot-toast';

function App() {
  
  return (
    //Proveedor de datos del usuario
    <AuthProvider> 
      {/*Proveedor de permisos que tienen los usuarios dentro de los archivos */}      
      <PermissionsProvider>
        {/* PROVEEDOR DE DATOS DEL FOLDER Y ARCHIVOS */}
        <FoldersFilesProvider>
          <BrowserRouter>
                <div> <Toaster position="top-center" reverseOrder={false} /> </div>
                <Routes>
                  {/* Ruta pública que no requiere autenticación */}

                    <Route path="/" element={<Login />} />

                    {/* Ruta de autenticación accesible solo si se ha iniciado sesión */}
                    <Route element={<ProtectedRoute redirectTo="/" />}>
                      <Route path="/authentication" element={<Authentication />} />
                    </Route>

                    {/* Rutas protegidas que requieren un rol */}
                    <Route element={<ProtectedRoute allowedRoles={['ADM', 'GER', 'OPE']} redirectTo="/" />}>
                      <Route path="/:folder" element={<Home />} />        
                      <Route path="/:folder/:subfolder" element={<Home />} />  
                      <Route path="/:folder/:subfolder/:subsubfolder" element={<Home />} /> 

                    </Route>

                  <Route>
                    <Route path="/completeHistory" element={<CompleteHistory/>} />
                  </Route>

                    <Route path="*" element={<NotFound />} />
                  
                </Routes>
            </BrowserRouter>
        </FoldersFilesProvider>          
      </PermissionsProvider>
  
    </AuthProvider>

  )
}

export default App;
