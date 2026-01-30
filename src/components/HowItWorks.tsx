import { FiBox } from "react-icons/fi";
import { TbTruck } from "react-icons/tb";
import { LuHouse } from "react-icons/lu";

export default function HowItWorks() {
    return (
        <div className="bg-white w-full py-10 items-center justify-center flex flex-col px-6 lg:px-0">

            <div className="bg-orange-500/20 px-4 py-1 rounded-full text-xs lg:text-base text-orange-600 font-semibold mb-4 w-max mx-auto">
                Como funciona
            </div>

            <h1 className="text-5xl font-black text-center text-black">Simples como <span className="text-orange-500">1, 2, 3</span></h1>

            <p className="w-full text-center text-xs max-w-[90%] lg:text-base font-medium mt-3 text-black/80">Em poucos passos você resolve a logística do seu kit e foca no que importa: <span className="font-bold">sua performance.</span></p>

            <div className="flex relative gap-6 mt-6 mb-6">

                <div className="relative z-2 flex flex-col max-w-[350px] h-full items-center justify-center         hover:shadow-lg transition bg-white rounded-xl px-8 py-9 mt-10 border border-gray-400/30">

                    <h1 className="absolute text-4xl font-black text-orange-500/20 right-8 top-6">01</h1>

                    <div className="flex items-center mb-6 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 w-16 h-16 rounded-lg">
                        <FiBox size={40} className="text-white m-3" />
                    </div>

                    <h1 className="text-xl font-bold text-center text-black">Escolha seu kit</h1>
                    <p className="text-center font-semibold text-black/50 mt-4">Navegue pelas corridas disponíveis e selecione o kit que deseja receber.</p>
                </div>

                <div className="relative z-2 flex flex-col max-w-[350px] h-full items-center justify-center         hover:shadow-lg transition bg-white rounded-xl px-8 py-9 mt-10 border border-gray-400/30">

                    <h1 className="absolute text-4xl font-black text-orange-500/20 right-8 top-6">02</h1>

                    <div className="flex items-center mb-6 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 w-16 h-16 rounded-lg">
                        <TbTruck size={40} className="text-white m-3" />
                    </div>

                    <h1 className="text-xl font-bold text-center text-black">Nós buscamos</h1>
                    <p className="text-center font-semibold text-black/50 mt-4">A Move+ vai até o local oficial do evento e retira seu kit.</p>
                </div>

                <div className="relative z-2 flex flex-col max-w-[350px] h-full items-center justify-center         hover:shadow-lg transition bg-white rounded-xl px-8 py-9 mt-10 border border-gray-400/30">

                    <h1 className="absolute text-4xl font-black text-orange-500/20 right-8 top-6">03</h1>

                    <div className="flex items-center mb-6 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 w-16 h-16 rounded-lg">
                        <LuHouse size={40} className="text-white m-3" />
                    </div>

                    <h1 className="text-xl font-bold text-center text-black">Entregamos para você</h1>
                    <p className="text-center font-semibold text-black/50 mt-4">Receba seu kit no conforto da sua casa, antes do dia da prova.</p>
                </div>

                <hr className="absolute w-full border-t-2 border-orange-500/40 my-22 z-1" />

            </div>

        </div>
    )
}