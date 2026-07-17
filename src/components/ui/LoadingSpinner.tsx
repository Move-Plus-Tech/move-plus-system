export default function LoadingSpinner() {
    return (
        <div className="flex flex-col items-center justify-center">
   
            <div className="relative w-12 h-12">
                <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
                <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#FF4D1C] border-r-[#FF4D1C] animate-spin"></div>
            </div>
            
            <p className="text-gray-500 mt-4 font-medium">Aguarde...</p>
        </div>
    );
}
