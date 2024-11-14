const SkeletonFilesContainer = () => (
    <div className="grid grid-cols-3 gap-4 p-4">
        <h1>Cargando</h1>
        {Array.from({ length: 6 }).map((_, index) => (            
            <div key={index} className="w-full h-24 bg-gray-200 rounded animate-pulse"></div>
        ))}
    </div>
);
export default SkeletonFilesContainer;