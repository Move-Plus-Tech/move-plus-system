import Image from "next/image";
import { FaLongArrowAltRight } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { FaTruck } from "react-icons/fa";
import AnimatedNumber from "./ui/AnimatedNumber";

export default function Hero() {
    return (
        <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-black/40 z-[5]"></div>

            <div className="absolute top-[16%] sm:top-[18%] lg:top-[20%] left-0 right-0 px-5 sm:px-6 lg:px-20 z-10 flex flex-col text-left lg:ml-20">

                <div className="relative flex items-center gap-2 border border-dashed border-orange-400
                px-3.5 py-1.5 w-fit mb-6 -rotate-1 bg-transparent backdrop-blur-sm">
                    <FaTruck size={14} className="text-orange-400" />
                    <span className="text-orange-400 text-[11px] font-bold tracking-wide uppercase">
                        Entrega disponível em regiões selecionadas
                    </span>
                </div>

                <div>
                    <h1 className="text-white uppercase font-black text-3xl sm:text-5xl lg:text-7xl leading-[0.92] tracking-tight">
                        Seu kit.
                    </h1>

                    <h2 className="uppercase font-extrabold text-3xl sm:text-5xl lg:text-7xl text-[#FF4D1C] inline-block leading-[0.92] mt-1 tracking-tight">
                        Do jeito mais fácil.
                    </h2>

                    <p className="text-white text-sm sm:text-base leading-relaxed mt-6 max-w-xl">
                        A Move+ busca seu kit esportivo direto com o organizador e <br className="hidden sm:block" />
                        entrega no seu endereço em Belo Horizonte e regiões atendidas. <br className="hidden sm:block" /> Sem filas, sem estresse. Deixa com a gente.
                    </p>
                </div>

                <div className="mt-8 sm:mt-10 flex gap-3 sm:gap-4 flex-wrap sm:flex-nowrap justify-start">
                    <a href="#kits" className="mx-auto lg:mx-0 flex w-fit cursor-pointer
        py-3 px-4 sm:px-6 bg-[#FF4D1C] rounded-sm items-center gap-2 text-white
        text-sm lg:text-base hover:bg-[#ff6a3f] transition-colors">
                        <span>Ver Kits disponíveis</span>
                        <FaLongArrowAltRight size={14} className="sm:w-5 sm:h-5" />
                    </a>

                    <a href="#delivery-regions" className="mx-auto lg:mx-0 flex w-fit cursor-pointer
        py-3 px-4 sm:px-6 bg-transparent border border-white/40 hover:bg-white/10
        rounded-sm items-center gap-2 text-white text-sm lg:text-base">
                        <span>Consultar região</span>
                        <TbTruckDelivery size={14} className="sm:w-5 sm:h-5" />
                    </a>
                </div>

                <div className="flex gap-0 gap-y-4 mt-8 lg:mt-10 w-fit flex-wrap">
                    {[
                        { to: 262, label: "Kits entregues" },
                        { to: 35, label: "Corridas parceiras" },
                    ].map((stat, i) => (
                        <div key={i} className="min-w-[150px] border-l-2 border-orange-400 pl-4 pr-8 first:border-l-0 first:pl-0">
                            <h1 className="text-white text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight tabular-nums">
                                <AnimatedNumber from={0} to={stat.to} duration={1000} /><span className="text-[#FF4D1C]">+</span>
                            </h1>
                            <p className="text-white text-[11px] sm:text-xs font-medium uppercase tracking-wide mt-1">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                    <div className="min-w-[130px] border-l-2 border-orange-400 pl-4">
                        <h1 className="text-white text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight tabular-nums">100%</h1>
                        <p className="text-white text-[11px] sm:text-xs font-medium uppercase tracking-wide mt-1">
                            Satisfação
                        </p>
                    </div>
                </div>

            </div>

            <Image
                src="https://res.cloudinary.com/dytw21kw2/image/upload/v1784314198/person-jogging-park_hnruu9.jpg"
                alt="Move+"
                width={1920}
                height={1080}
                quality={100}
                priority
                className="w-full opacity-50 h-[75vh] lg:h-[900px] object-cover"
            />
        </div>
    );
}
