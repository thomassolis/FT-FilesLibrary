function NoFilesMessage(){
    return(
        <div className="flex flex-col items-center justify-center w-full">
            <h1 className="font-serif text-2xl">Esta carpeta no cuenta con archivos</h1>
            <iconify-icon style={{ fontSize: '130px' }} icon="noto-v1:sad-but-relieved-face"></iconify-icon>
        </div>                
    )
}

export default NoFilesMessage;