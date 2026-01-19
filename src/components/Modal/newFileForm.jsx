
import NewFileConfirmation from "./newFileConfirmation";
import { useState, useCallback } from "react";
import React from "react";

function NewFileForm({onClose}){
    const [confirmationUploadFile, setConfirmationUploadFile] = useState(false);
    const [uploadFileFunction, setUploadFileFunction] = useState(null);
    const [checkedItems, setCheckedItems] = useState({
        item1: false,
        item2: false,
    })    

    {/* // Pasar la función handleFileUpload al componente padre al montar el componente */}
    const handleFunctionFromChild1  = useCallback((fn) => {
        setUploadFileFunction(() => fn);
    }, []);

    function handleCheckboxChange(event){
        const {name, checked} = event.target;
        setCheckedItems({
            ...checkedItems,
            [name]: checked,
            
        });
        
    };

    // Obtener los elementos seleccionados
    const selectedItems = Object.keys(checkedItems).filter(item => checkedItems[item]);


    return(
        <div style={{position:'fixed', top:'50%', left:'50%',transform: 'translate(-50%, -50%)',width:'964px', height:'550px', backgroundColor:'white', display:'flex',alignItems:'center', justifyContent:'center', flexDirection:'column', boxShadow: '0px 0px 10px rgba(0,0,0,0.9)', borderRadius:'15px'}}>
            <h3 style={{left:'0px'}}>Arrastre o seleccione los archivos que desea colocar aquí:</h3>
            <iconify-icon style={{position:'absolute', top:'10px', right:'10px', fontSize:'20px', cursor:'pointer'}} onClick={onClose} icon="zondicons:close"></iconify-icon>

            {/* Paso 1: El padre recibe la función desde DragAndDrop */}           
            <DragAndDrop passFunctionToParent={handleFunctionFromChild1}/> 


            <h1>Favor llene la siguiente información para mayor seguridad:</h1>
            <form style={{display:'flex', flexDirection:'column'}}>
                <div style={{display:'flex', justifyContent:'start', alignItems:'end'}}>
                    <input 
                        id="validation1" 
                        type="checkbox" 
                        name="operadorTrue"
                        onChange={handleCheckboxChange}
                        checked = {checkedItems.operadorTrue}
                    />
                    <label htmlFor="validation1">Permitir que el operador pueda solicitar acceso</label>      
                </div>
                          
                <div style={{display:'flex'}}>
                    <input 
                        id="validation2" 
                        type="checkbox" 
                        name="gerenteTrue"
                        onChange={handleCheckboxChange}
                        checked = {checkedItems.gerenteTrue}
                    />
                    <label htmlFor="validation2">Permitir que los gerentes puedan previsualizar los archivos</label>      
                </div>
            </form>
            <button style={{width:'190px', backgroundColor:'green'}} onClick={()=>setConfirmationUploadFile(true)}>Subir</button>

            {/* Mostrar los valores de los checkboxes */}
            <h1>Seleccionados: {selectedItems.join(', ') || 'Ninguno'}</h1>
            

            {/* Paso 2: El padre pasa la función al segundo hijo */}
            {confirmationUploadFile && 
                <NewFileConfirmation 
                    onClose={()=>setConfirmationUploadFile(false)} 
                    executeUpload={uploadFileFunction}
                />
            }
        </div>

    )
}

export default NewFileForm;