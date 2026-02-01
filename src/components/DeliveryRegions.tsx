import { IoLocationOutline } from "react-icons/io5";
import { TbTruck } from "react-icons/tb";

export default function DeliveryRegions() {
  return (
    <div
      id="delivery-regions"
      className="bg-[#0f0f0f] w-full py-20 flex flex-col items-center px-4 sm:px-6"
    >

      <div className="flex items-center gap-2 bg-orange-500/20 px-4 py-1 rounded-full 
        text-xs sm:text-sm text-orange-600 font-semibold mb-4 mt-6">
        <TbTruck size={18} className="text-orange-600" />
        Área de Cobertura
      </div>

      <h1 className="text-xl sm:text-2xl lg:text-5xl font-black text-center text-white">
        Confira as <span className="text-orange-500">regiões atendidas</span>
      </h1>

      <p className="text-center text-xs sm:text-sm lg:text-base font-medium mt-3 
        text-white/80 max-w-xl">
        Estamos expandindo constantemente para levar{" "}
        <span className="font-bold">seu kit onde você estiver.</span>
      </p>

      {/* Cards container */}
      <div className="mt-10 flex flex-col gap-6 w-full max-w-3xl">

        {/* BH */}
        <div className="bg-[#141414] border border-orange-500/40 
          rounded-2xl p-5 sm:p-6">
          
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="flex items-center gap-2 text-sm font-bold text-white">
              <IoLocationOutline size={18} className="text-orange-600" />
              Belo Horizonte – MG
            </span>

            <span className="bg-orange-500 text-black text-[10px] font-bold 
              px-2 py-0.5 rounded-full">
              POPULAR
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              "Pampulha 🔥",
              "Itapoã 🔥",
              "Savassi 🔥",
              "Castelo",
              "Buritis",
              "Estoril",
              "Venda Nova",
            ].map((region) => (
              <span
                key={region}
                className="px-3 py-1 text-xs font-semibold rounded-full 
                  bg-orange-500/20 text-orange-400 border border-orange-500/40"
              >
                {region}
              </span>
            ))}
          </div>

          <p className="text-xs text-white/60 mt-4">
            Outras regiões podem estar disponíveis sob consulta.
          </p>
        </div>

        {/* Nova Lima */}
        <div className="bg-[#141414] border border-orange-500/40 
          rounded-2xl p-5 sm:p-6">

          <div className="flex items-center gap-2 mb-4">
            <IoLocationOutline size={18} className="text-orange-600" />
            <span className="text-sm font-bold text-white">
              Nova Lima – MG
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {["Vila da Serra 🔥", "Vale do Sereno", "Vila Castela"].map(
              (region) => (
                <span
                  key={region}
                  className="px-3 py-1 text-xs font-semibold rounded-full 
                    bg-orange-500/10 text-orange-400 border border-orange-500/30"
                >
                  {region}
                </span>
              )
            )}
          </div>

          <p className="text-xs text-white/60 mt-4">
            Outras regiões podem estar disponíveis sob consulta.
          </p>
        </div>

        {/* Contagem */}
        <div className="bg-[#141414] border border-orange-500/40 
          rounded-2xl p-5 sm:p-6">

          <div className="flex items-center gap-2 mb-4">
            <IoLocationOutline size={18} className="text-orange-600" />
            <span className="text-sm font-bold text-white">
              Contagem – MG
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {["Eldorado 🔥", "Cabral 🔥", "Camargos", "Cidade Industrial"].map(
              (region) => (
                <span
                  key={region}
                  className="px-3 py-1 text-xs font-semibold rounded-full 
                    bg-orange-500/10 text-orange-400 border border-orange-500/30"
                >
                  {region}
                </span>
              )
            )}
          </div>

          <p className="text-xs text-white/60 mt-4">
            Outras regiões podem estar disponíveis sob consulta.
          </p>
        </div>
      </div>
    </div>
  );
}
