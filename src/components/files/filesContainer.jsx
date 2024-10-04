import Files from "./files";
// import logo from "../../images/MLC logo.png"
import HeaderFiles from "./headerFiles";

function FilesContainer({fileData}){
    return(
        <section style={{display:'flex', flexDirection:'column'}}>
            <HeaderFiles/>
            <div style={{display:'grid', gridTemplateColumns:'150px 150px 150px 150px', backgroundColor:'rgba(172, 207, 217, 1)', alignItems:'center',justifyContent:'center', columnGap:'20px', rowGap:'30px', minHeight: '100vh', width:'100%', marginLeft:'60px', marginTop:'90px' }}>


            {fileData.map((file, index) =>(
                <Files key={index} fileName={file}/>
            ))}


            </div>
        </section>

    )
}
export default FilesContainer;