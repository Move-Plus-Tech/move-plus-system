import { FaLongArrowAltRight } from "react-icons/fa";

export default function Cta() {
  return (
    <section className="w-full bg-white py-16 sm:py-20 px-4">
      <div
        className="mx-auto max-w-5xl flex flex-col items-center 
        rounded-2xl bg-orange-300/20 
        px-6 py-10 sm:px-10 sm:py-14 lg:px-16 lg:py-16"
      >
        <h1 className="text-2xl sm:text-3xl lg:text-5xl font-black text-center text-black">
          Pronto para sua próxima{" "}
          <span className="text-orange-500">conquista?</span>
        </h1>

        <p
          className="mt-4 text-center text-xs sm:text-sm lg:text-base 
          font-medium text-black/80 max-w-2xl"
        >
          Deixe a logística com a gente e foque no que realmente importa:{" "}
          <span className="font-bold">cruzar a linha de chegada.</span>
        </p>

        <button
          className="neon-button mt-8 sm:mt-10 flex items-center gap-2 
          rounded-lg bg-orange-500 
          px-4 py-3 sm:px-6 
          text-xs sm:text-sm lg:text-base 
          text-white transition hover:scale-[1.03] cursor-pointer"
        >
          <span>Encontrar meu kit</span>
          <FaLongArrowAltRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>
    </section>
  );
}
