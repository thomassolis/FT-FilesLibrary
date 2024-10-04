function FoalderSidebar({key,foalderName}){
    console.log('key ',key)
    console.log('foalderName',foalderName)
    return(
        <div style={{backgroundColor:'rgba(249, 198, 0, 1)', width:'100%', height:'70px', borderRadius:'20px', display:'flex', alignItems:'center', justifyContent:'center'}}>
            <iconify-icon style={{fontSize:'20px'}} icon="material-symbols:folder-open"></iconify-icon>
            <p style={{fontSize:'20px'}}>{foalderName}</p>      
        </div>
    )
}

export default FoalderSidebar