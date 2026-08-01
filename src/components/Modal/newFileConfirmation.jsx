function NewFileConfirmation({ onClose, executeUpload }) {
    return (
        <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '964px', height: '350px', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', boxShadow: '0px 0px 10px rgba(0,0,0,0.9)', borderRadius: '15px' }}>
            <h1>El archivo 'nombre' se subirá a Files Library con los permisos:</h1>
            <p>permiso#1</p>
            <p>permiso#2</p>

            <div style={{ display: 'flex', gap: '30px' }}>
                <button style={{ backgroundColor: 'red', width: '140px' }} onClick={onClose}>Cancelar</button>
                <button style={{ backgroundColor: 'green' }} onClick={executeUpload} >Confirmar</button>
            </div>
        </div>
    )
}

export default NewFileConfirmation;