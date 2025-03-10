import React, {useState, useEffect} from "react";
import Login from "./components/login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Authentication from "./components/authentication";
import Home from "./components/home";
import AuthProvider from "./context/authProvider";
import ProtectedRoute from "./components/protectedRoute";
import NotFound from "./components/notFound";
import CompleteHistory from "./components/history/completeHistory";
import { PermissionsProvider } from "./context/permissions/permissionsProvider";
import { FoldersFilesProvider } from "./context/Folders-Files/Folders_Files";
import { Toaster,toast } from 'react-hot-toast';
import ModalProvider from "./context/closeModals";

function App() {
  
  return (
    <AuthProvider> 
      <PermissionsProvider>
        <FoldersFilesProvider>
          <ModalProvider>
            <BrowserRouter>
                  <div> <Toaster position="top-center" reverseOrder={false} /> </div>
                  <Routes>

                      <Route path="/" element={<Login />} />

                      <Route element={<ProtectedRoute redirectTo="/" />}>
                        <Route path="/authentication" element={<Authentication />} />
                      </Route>

                      <Route element={<ProtectedRoute allowedRoles={['ADM', 'GER', 'OPE', 'CEO']} redirectTo="/" />}>
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
            </ModalProvider>
        </FoldersFilesProvider>          
      </PermissionsProvider>
  
    </AuthProvider>

  )
}

export default App;
