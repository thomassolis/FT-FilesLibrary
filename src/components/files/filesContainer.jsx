import Files from "./files";
// import logo from "../../images/MLC logo.png"
import HeaderFiles from "./headerFiles";
import '../../Styles/filesContainer.css'
import DragAndDrop from "../dragDrop";

function FilesContainer({fileData}){
    console.log('fileData desde fileontainer: ', fileData)
    return(
        <section style={{display:'flex', flexDirection:'column', paddingBottom:'90px'}}>
            <HeaderFiles/>
            <div style={{display:'grid', gridTemplateColumns:'150px 150px 150px 150px', backgroundColor:'rgba(172, 207, 217, 1)', alignItems:'center',justifyContent:'center', columnGap:'20px', rowGap:'30px', minHeight: '100vh', width:'100%', marginLeft:'60px', marginTop:'120px', gridTemplateRows:'80px 80px 80px 80px'}}>


            {fileData.map((file) =>(
                <Files key={file.id} fileName={file.name} fileId={file.id}/>
            ))}

            </div>
            
        </section>

    )
}
export default FilesContainer;