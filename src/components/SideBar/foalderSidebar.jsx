function FoalderSidebar({ foalderName, isSelected }) {    
    return (
        <div 
            style={{ width: '90%', height: '70px', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} 
            className={`bg-customYellow hover:bg-yellow-200 ${isSelected ? 'bg-yellow-200' : 'bg-customYellow text-black'}`}  // Condición para el color
        >
            <iconify-icon style={{ fontSize: '20px' }} icon="material-symbols:folder-open"></iconify-icon>
            <p style={{ fontSize: '20px' }}>{foalderName}</p>      
        </div>
    );
}

export default FoalderSidebar;
