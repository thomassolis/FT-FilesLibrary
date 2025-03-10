import { useParams, useNavigate } from "react-router-dom";



function Routes(){
    const {folder, subfolder, subsubfolder} = useParams();
    const navigate = useNavigate()
    return(
            <div className="">
                {folder && !subfolder && (
                    <h1 className="font-serif text-2xl">
                        <a onClick={() => navigate(`/${folder}`)} className="cursor-pointer text-blue-800">{folder}</a>
                    </h1>
                )}
                {folder && subfolder && !subsubfolder && (
                    <h1 className="font-serif text-2xl">
                        <a onClick={() => navigate(`/${folder}`)} className="cursor-pointer text-blue-800">{folder}</a> / 
                        <a onClick={() => navigate(`/${folder}/${subfolder}`)} className="cursor-pointer text-blue-800">{subfolder}</a>
                    </h1>
                )}
                {folder && subfolder && subsubfolder && (
                    <h1 className="font-serif text-2xl " >
                        <a onClick={() => navigate(`/${folder}`)} className="cursor-pointer text-blue-800">{folder}</a> / 
                        <a onClick={() => navigate(`/${folder}/${subfolder}`)} className="cursor-pointer text-blue-800">{subfolder}</a> / 
                        <a onClick={() => navigate(`/${folder}/${subfolder}/${subsubfolder}`)} className="cursor-pointer text-blue-800">{subsubfolder}</a>
                    </h1>
                )}

            </div>
    )
}

export default Routes;