import Image from "next/image";

export default function Footer() {
  const navLinks = [
    { label: "Início", href: "#inicio" },
    { label: "Kits", href: "#kits" },
    { label: "Contato", href: "#contato" },
  ];

  return (
    <footer className="w-full bg-[#0f0f0f] text-white py-10 px-4">
      {/* Conteúdo principal */}
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row 
        items-center lg:items-start justify-between gap-10">

        {/* Logo */}
        <Image
          src="https://res.cloudinary.com/dytw21kw2/image/upload/v1767756141/logo_zwilna.png"
          alt="Logo"
          width={600}
          height={400}
          className="w-[140px] sm:w-[160px] lg:w-[200px] object-contain"
        />

        {/* Links rápidos */}
        <div className="text-center lg:text-left">
          <h1 className="text-sm mb-3 uppercase font-bold select-none">
            Links Rápidos
          </h1>

          <div className="flex flex-col lg:flex-row gap-2 lg:gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-gray-400 hover:text-white transition"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Contato */}
        <div className="text-center lg:text-left">
          <h1 className="text-sm mb-3 uppercase font-bold select-none">
            Contato
          </h1>

          <p className="text-sm text-gray-400 hover:text-white transition cursor-pointer">
            moveplusoficial@gmail.com
          </p>

          <p className="text-sm text-gray-400 hover:text-white transition cursor-pointer">
            (11) 99999-9999
          </p>
        </div>
      </div>

      {/* Divider */}
      <hr className="my-8 border-white/10 max-w-6xl mx-auto" />

      {/* Rodapé final */}
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row 
        items-center justify-between gap-4">

        <p className="text-[10px] text-white/80 text-center select-none">
          © 2026 Move Plus. Todos os direitos reservados.
        </p>

        <div className="flex gap-6">
          <span className="text-xs text-gray-400 hover:text-white cursor-pointer transition">
            Termos de Uso
          </span>
          <span className="text-xs text-gray-400 hover:text-white cursor-pointer transition">
            Privacidade
          </span>
        </div>
      </div>
    </footer>
  );
}
