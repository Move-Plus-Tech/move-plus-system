import Image from "next/image";

export default function MainContent() {
    return (
        <>
            <div id="inicio" className="relative w-[54vh] h-[54vh] overflow-hidden rounded-lg">
                <Image
                    src="https://res.cloudinary.com/dytw21kw2/image/upload/v1769720572/entregador_kmanhe.jpg"
                    alt="Entregador Move+"
                    fill
                    quality={100}
                    className="object-cover object-center"
                />
            </div>


            {/* Texto */}
            <div className="text-center lg:text-left max-w-xl">

                <div className="bg-orange-500/20 max-w-32 px-4 py-1 rounded-full text-xs lg:text-sm 
        text-orange-600 font-semibold mb-4">
                    Nossa missão
                </div>

                <h1 className="font-black text-2xl sm:text-3xl lg:text-5xl text-black leading-tight">
                    Nós cuidamos da <br className="hidden sm:block" />
                    logística do seu kit para <br className="hidden sm:block" />
                    você <span className="text-orange-500">focar na prova.</span>
                </h1>

                <p className="mt-3 text-sm sm:text-base lg:text-lg font-semibold opacity-70">
                    Sabemos que retirar o kit pode ser um desafio: filas enormes,
                    horários incompatíveis, deslocamento até o local da prova.
                    A Move+ resolve isso para você.
                </p>

                {/* Lista */}
                <div className="mt-8 lg:mt-10 space-y-3">
                    <div className="flex items-start gap-3 justify-center lg:justify-start">
                        <div className="bg-orange-500/40 rounded-full w-5 h-5 flex items-center justify-center mt-1">
                            <div className="bg-orange-500 rounded-full w-2 h-2 animate-pulse" />
                        </div>
                        <span className="font-semibold text-sm sm:text-base">
                            Buscamos seu kit no local oficial do evento
                        </span>
                    </div>

                    <div className="flex items-start gap-3 justify-center lg:justify-start">
                        <div className="bg-orange-500/40 rounded-full w-5 h-5 flex items-center justify-center mt-1">
                            <div className="bg-orange-500 rounded-full w-2 h-2 animate-pulse" />
                        </div>
                        <span className="font-semibold text-sm sm:text-base">
                            Embalagem segura e cuidadosa
                        </span>
                    </div>

                    <div className="flex items-start gap-3 justify-center lg:justify-start">
                        <div className="bg-orange-500/40 rounded-full w-5 h-5 flex items-center justify-center mt-1">
                            <div className="bg-orange-500 rounded-full w-2 h-2 animate-pulse" />
                        </div>
                        <span className="font-semibold text-sm sm:text-base">
                            Entrega antes da prova garantida
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
};
