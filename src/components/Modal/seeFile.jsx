function SeeFile({closeModal}){

    function sendRequest(){
        alert("Su solicitud se ha enviado con éxito, en caso de que se apruebe podrá ver el archivo en su correo electrónico.")

        closeModal();
    }

    return(
            <div style={{position:'fixed', top:'50%', left:'50%',transform: 'translate(-50%, -50%)',width:'964px', height:'350px', backgroundColor:'white', display:'flex',alignItems:'center', justifyContent:'center', flexDirection:'column', boxShadow: '0px 0px 10px rgba(0,0,0,0.9)', borderRadius:'15px'}}>
                <h1>¿Estás seguro que deseas enviar una solicitud para ver el archivo "nombre de archivo"?</h1>
                <textarea style={{width:'600px', height:'150px'}} placeholder="Explica por que deseas ver el archivo" required></textarea>

                <div style={{display:'flex', gap:'30px'}}>
                    <button style={{backgroundColor:'green'}} onClick={sendRequest}>ACEPTAR</button>
                    <button style={{backgroundColor:'red'}} onClick={closeModal}>CANCELAR</button>
                </div>
                
            </div>
        
    )
}

export default SeeFile