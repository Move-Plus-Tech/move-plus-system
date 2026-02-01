
export default function Store() {
  return (
    <div className="bg-gray-100 w-full py-10 flex flex-col items-center px-6 lg:px-0">

      <div className="bg-orange-500/20 px-4 py-1 rounded-full text-xs lg:text-sm 
        text-orange-600 font-semibold mb-4">
        Kits disponíveis
      </div>

      <h1 className="text-2xl sm:text-3xl lg:text-5xl font-black text-center text-black">
        Encontre seu próximo <span className="text-orange-500">desafio</span>
      </h1>

      <p className="text-center text-xs sm:text-sm lg:text-base font-medium mt-3 
        text-black/80 max-w-xl">
        Escolha a corrida parceira e <span className="font-bold">receba seu kit em casa</span>{" "}
        com toda a comodidade.
      </p>

      
    </div>
  );
}
