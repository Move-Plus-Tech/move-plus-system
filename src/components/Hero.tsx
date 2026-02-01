import Image from "next/image";
import { FaLongArrowAltRight } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import AnimatedNumber from "./ui/AnimatedNumber";

export default function Hero() {
    return (
        <div className="relative">
            <div className="absolute top-1/5 left-0 right-0 px-6 lg:px-20 z-10 flex flex-col lg:gap-0 
            text-left lg:ml-20">

                <div className="flex items-center gap-2 bg-orange-500/30 rounded-full px-3.5 py-1.5 w-fit mb-4">
                    <div className="rounded-full w-2 h-2 bg-orange-500" />
                    <span className="text-orange-500 text-xs">Entrega disponível em regiões selecionadas</span>
                </div>

                <div>
                    <h1 className="text-white font-black text-3xl sm:text-4xl lg:text-6xl">
                        Seu kit.
                    </h1>

                    <h2 className="font-black text-3xl sm:text-4xl lg:text-6xl text-orange-500">
                        Do jeito mais fácil.
                    </h2>

                    <p className="text-gray-300 text-xs sm:text-lg mt-4">
                        A Move+ busca seu kit esportivo direto com o organizador e <br className="hidden sm:block" />
                        entrega no seu endereço em Belo Horizonte e regiões atendidas. <br className="hidden sm:block" /> Sem filas, sem estresse.
                    </p>
                </div>

                <div className="flex gap-1 sm:gap-4 flex sm:flex-nowrap justify-center lg:justify-start">
                    <button className="neon-button mx-auto lg:mx-0 flex w-fit cursor-pointer 
        py-3 px-3 sm:py-3 sm:px-5 mt-8 sm:mt-10 bg-orange-500 rounded-lg items-center gap-2 text-white 
        text-xs sm:text-sm lg:text-base">
                        <span>Ver Kits disponíveis</span>
                        <FaLongArrowAltRight size={14} className="sm:w-5 sm:h-5" />
                    </button>

                    <a href="#delivery-regions" className="mx-auto lg:mx-0 flex w-fit cursor-pointer 
        py-3 px-2 sm:py-3 sm:px-5 mt-8 sm:mt-10 bg-transparent border border-white/40 hover:bg-white/10 
        rounded-lg items-center gap-2 text-white text-xs sm:text-sm lg:text-base">
                        <span>Consultar região</span>
                        <TbTruckDelivery size={14} className="sm:w-5 sm:h-5" />
                    </a>
                </div>

                <hr className="border-gray-500/30 max-w-[60vh] mt-8 lg:mt-12" />

                <div className="flex gap-10 mt-6 lg:mt-8">

                    <div>
                        <h1 className="text-white text-2xl lg:text-4xl font-black">
                            <AnimatedNumber from={0} to={250} duration={1000} />+
                        </h1>
                        <p className="text-gray-400 text-xs lg:text-sm font-medium 
            flex items-center self-center">
                            Kits entregues
                        </p>
                    </div>

                    <div>
                        <h1 className="text-white text-2xl lg:text-4xl font-black">
                            <AnimatedNumber from={0} to={28} duration={1000} />+
                        </h1>
                        <p className="text-gray-400 text-xs lg:text-sm font-medium 
            flex items-center self-center">
                            Corridas parceiras
                        </p>
                    </div>

                    <div>
                        <h1 className="text-white text-2xl lg:text-4xl font-black">100%</h1>
                        <p className="text-gray-400 text-xs lg:text-sm font-medium 
            flex items-center self-center">
                            Satisfação
                        </p>
                    </div>
                </div>

            </div>

            <Image
                src="https://res.cloudinary.com/dytw21kw2/image/upload/v1769708897/background_yenhmk.png"
                alt="Move+"
                width={1920}
                height={1080}
                quality={100}
                priority
                className="w-full h-[75vh] lg:h-[850px] object-cover"
            />
        </div>
    );
}
