import { FiBox } from "react-icons/fi";
import { TbTruck } from "react-icons/tb";
import { LuHouse } from "react-icons/lu";

export default function HowItWorks() {
  return (
    <div className="bg-white w-full py-10 flex flex-col items-center px-6 lg:px-0">

      <div className="bg-orange-500/20 px-4 py-1 rounded-full text-xs lg:text-sm 
        text-orange-600 font-semibold mb-4">
        Como funciona
      </div>

      <h1 className="text-2xl sm:text-3xl lg:text-5xl font-black text-center text-black">
        Simples como <span className="text-orange-500">1, 2, 3</span>
      </h1>

      <p className="text-center text-xs sm:text-sm lg:text-base font-medium mt-3 
        text-black/80 max-w-xl">
        Em poucos passos você resolve a logística do seu kit e foca no que importa:{" "}
        <span className="font-bold">sua performance.</span>
      </p>

      {/* Cards + Lines */}
      <div className="relative flex flex-col lg:flex-row gap-10 mt-10 mb-6 
        w-full max-w-6xl items-center">

        {/* Linha vertical — mobile */}
        <div className="absolute lg:hidden left-1/2 -translate-x-1/2 
          top-10 bottom-10 w-px bg-orange-500/40 z-0" />

        {/* Card 01 */}
        <div className="relative z-10 flex flex-col w-full max-w-sm items-center justify-center
          hover:shadow-lg transition bg-white rounded-xl px-6 py-8 border border-gray-400/30">

          <h1 className="absolute text-3xl lg:text-4xl font-black text-orange-500/20 right-6 top-4">
            01
          </h1>

          <div className="flex items-center mb-5 bg-gradient-to-r 
            from-orange-400 via-orange-500 to-orange-600 w-14 h-14 rounded-lg">
            <FiBox size={32} className="text-white m-auto" />
          </div>

          <h1 className="text-lg lg:text-xl font-bold text-center text-black">
            Escolha seu kit
          </h1>
          <p className="text-center font-semibold text-black/50 mt-3 text-sm">
            Navegue pelas corridas disponíveis e selecione o kit que deseja receber.
          </p>
        </div>

        {/* Card 02 */}
        <div className="relative z-10 flex flex-col w-full max-w-sm items-center justify-center
          hover:shadow-lg transition bg-white rounded-xl px-6 py-8 border border-gray-400/30">

          <h1 className="absolute text-3xl lg:text-4xl font-black text-orange-500/20 right-6 top-4">
            02
          </h1>

          <div className="flex items-center mb-5 bg-gradient-to-r 
            from-orange-400 via-orange-500 to-orange-600 w-14 h-14 rounded-lg">
            <TbTruck size={32} className="text-white m-auto" />
          </div>

          <h1 className="text-lg lg:text-xl font-bold text-center text-black">
            Nós buscamos
          </h1>
          <p className="text-center font-semibold text-black/50 mt-3 text-sm">
            A Move+ vai até o local oficial do evento e retira seu kit.
          </p>
        </div>

        {/* Card 03 */}
        <div className="relative z-10 flex flex-col w-full max-w-sm items-center justify-center
          hover:shadow-lg transition bg-white rounded-xl px-6 py-8 border border-gray-400/30">

          <h1 className="absolute text-3xl lg:text-4xl font-black text-orange-500/20 right-6 top-4">
            03
          </h1>

          <div className="flex items-center mb-5 bg-gradient-to-r 
            from-orange-400 via-orange-500 to-orange-600 w-14 h-14 rounded-lg">
            <LuHouse size={32} className="text-white m-auto" />
          </div>

          <h1 className="text-lg lg:text-xl font-bold text-center text-black">
            Entregamos para você
          </h1>
          <p className="text-center font-semibold text-black/50 mt-3 text-sm">
            Receba seu kit no conforto da sua casa, antes do dia da prova.
          </p>
        </div>

        {/* Linha horizontal — desktop */}
        <hr className="hidden lg:block absolute w-full border-t-2 
          border-orange-500/40 top-1/2 -translate-y-1/2 z-0" />

      </div>
    </div>
  );
}
