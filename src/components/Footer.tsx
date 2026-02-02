"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
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

        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row 
        items-center lg:items-start justify-between gap-10">

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

            <a href="mailto:moveplusoficial@gmail.com" className="text-sm text-gray-400 hover:text-white transition cursor-pointer">
              moveplusoficial@gmail.com
            </a>

            <a href="https://wa.me/5531996702827" target="_blank" className="text-sm text-gray-400 hover:text-white transition cursor-pointer">
              (31) 9670-2827
            </a>
          </div>
        </div>

        <hr className="my-8 border-white/10 max-w-6xl mx-auto" />

        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row 
        items-center justify-between gap-4">

          <p className="text-[10px] text-white/80 text-center select-none">
            © 2026 Move Plus. Todos os direitos reservados.
          </p>

          <div className="flex gap-6">
            <Link href="/termos-de-uso" className="text-xs text-gray-400 hover:text-white cursor-pointer transition">
              Termos de Uso
            </Link>
            <Link href="/politica-de-privacidade" className="text-xs text-gray-400 hover:text-white cursor-pointer transition">
              Privacidade
            </Link>
          </div>
        </div>
      </footer>

      <Contact isOpen={openContact} onClose={() => setOpenContact(false)} />

    </>
  );
}
