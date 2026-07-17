"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Lock, ShieldCheck, BadgeCheck } from "lucide-react";
import Contact from "./modals/Contact";

export default function Footer() {
  const navLinks = [
    { label: "Início", href: "#inicio" },
    { label: "Kits", href: "#kits" },
    { label: "Fale conosco", onClick: "contact" },
  ];

  const [openContact, setOpenContact] = useState(false);

  return (
    <>
      <footer className="w-full bg-[#0f0f0f] text-white py-10 px-4">
        <div
          className="max-w-6xl mx-auto flex flex-col lg:flex-row
          items-center lg:items-start justify-between gap-10"
        >
          <Image
            src="https://res.cloudinary.com/dytw21kw2/image/upload/v1767756141/logo_zwilna.png"
            alt="Logo"
            width={600}
            height={400}
            draggable={false}
            className="w-[140px] sm:w-[160px] lg:w-[200px] object-contain"
          />

          <div className="text-center">
            <h1 className="text-sm mb-3 uppercase font-bold select-none">
              Links Rápidos
            </h1>

            <div className="flex flex-col lg:flex-row gap-2 lg:gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    if (link.onClick === "contact") {
                      e.preventDefault();
                      setOpenContact(true);
                    }
                  }}
                  className="text-sm text-gray-400 hover:text-white transition cursor-pointer"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-1 text-center lg:text-left">
            <h1 className="text-sm mb-3 uppercase font-bold select-none">
              Contato
            </h1>

            <a
              href="mailto:moveplusoficial@gmail.com"
              className="text-sm text-gray-400 hover:text-white transition"
            >
              moveplusoficial@gmail.com
            </a>

            <a
              href="https://wa.me/5531996702827"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-400 hover:text-white transition"
            >
              (31) 99670-2827
            </a>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-14">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-8 flex flex-col items-center gap-6">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <h2 className="text-sm sm:text-base uppercase font-bold tracking-wider text-white">
                Compra 100% Segura
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-gray-400 text-center max-w-xl leading-relaxed">
              Todo o pagamento é processado{" "}
              <span className="text-white font-semibold">
                exclusivamente pelo Mercado Pago
              </span>
              , com criptografia de ponta a ponta e proteção antifraude. A
              Move+ não tem acesso e não armazena os dados do seu cartão.
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-4 py-3">
                <Lock className="w-4 h-4 text-emerald-400" />
                <span className="text-sm text-white">Pagamento Seguro</span>
              </div>

              <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-4 py-3">
                <BadgeCheck className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-white">
                  Dados Criptografados SSL
                </span>
              </div>

              <div className="flex items-center bg-white rounded-lg px-5 py-3">
                <Image
                  src="https://res.cloudinary.com/dytw21kw2/image/upload/v1784324969/mercado-pago-logo-png_seeklogo-653482_c%C3%B3pia_taents.png"
                  alt="Mercado Pago"
                  width={140}
                  height={40}
                  className="h-8 w-auto"
                />
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-2 text-xs text-gray-400">
              <span className="bg-white/5 px-3 py-1 rounded-full">PIX</span>
              <span className="bg-white/5 px-3 py-1 rounded-full">Visa</span>
              <span className="bg-white/5 px-3 py-1 rounded-full">
                Mastercard
              </span>
              <span className="bg-white/5 px-3 py-1 rounded-full">Elo</span>
              <span className="bg-white/5 px-3 py-1 rounded-full">
                Boleto
              </span>
            </div>
          </div>
        </div>

        <hr className="my-8 border-white/10 max-w-6xl mx-auto" />

        <div
          className="max-w-6xl mx-auto flex flex-col sm:flex-row
          items-center justify-between gap-4"
        >
          <p className="text-[10px] text-white/80 text-center select-none">
            © 2026 Move Plus. Todos os direitos reservados.
          </p>

          <div className="flex gap-6">
            <Link
              href="/termos-de-uso"
              className="text-xs text-gray-400 hover:text-white transition"
            >
              Termos de Uso
            </Link>

            <Link
              href="/politica-de-privacidade"
              className="text-xs text-gray-400 hover:text-white transition"
            >
              Privacidade
            </Link>
          </div>
        </div>
      </footer>

      <Contact isOpen={openContact} onClose={() => setOpenContact(false)} />
    </>
  );
}