import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

export default function Cta() {
  const trustItems = [
    "Entrega antes da prova garantida",
    "BH e região atendidas",
    "100% de satisfação",
  ];

  return (
    <section className="relative w-full overflow-hidden bg-[#0a0a0a] py-20 px-4">
      {/* Linhas diagonais de fundo */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "repeating-linear-gradient(-60deg, transparent, transparent 28px, rgba(249,115,22,0.06) 28px, rgba(249,115,22,0.06) 30px)",
        }}
      />

      <div className="relative mx-auto flex max-w-3xl flex-col items-center">
        {/* Headline */}
        <h2
          className="text-center font-black uppercase leading-none tracking-wide text-white"
          style={{
            fontSize: "clamp(3rem, 8vw, 4rem)",
            lineHeight: 0.95,
          }}
        >
          Sem fila.{" "}
          <span className="block text-orange-500">Sem estresse.</span>
          Na sua porta.
        </h2>

        {/* Subtítulo */}
        <p className="mt-5 max-w-md text-center text-sm leading-relaxed text-white/50 sm:text-base">
          Você foca no treino. A gente cuida do kit.{" "} 
          <strong className="text-white/80"> <br /> Retire zero, corra 100%.</strong>
        </p>

        {/* CTA */}
        <Link
          href="#kits"
          className="neon-button mx-auto lg:mx-0 flex w-fit cursor-pointer 
        py-3 px-3 sm:py-3 sm:px-5 mt-5 mb-2 bg-orange-500 rounded-sm items-center gap-2 text-white 
        text-xs sm:text-sm lg:text-base"
        >
          Encontrar meu kit
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          {trustItems.map((item) => (
            <div key={item} className="flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-orange-500" />
              <span className="text-xs font-medium text-white/35">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}