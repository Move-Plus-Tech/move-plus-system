import Image from "next/image"

export default function Footer() {

    const navLinks = [
        { label: "Inicio", href: "#inicio" },
        { label: "Kits", href: "#kits" },
        { label: "Contato", href: "#contato" },
    ]

    return (
        <div className="flex flex-col text-white items-center justify-center w-full h-auto py-10 bg-[#0f0f0f]">
            <div className="flex flex-col lg:flex-row justify-between items-center w-full max-w-[80%] px-4 gap-8">

                <Image src="https://res.cloudinary.com/dytw21kw2/image/upload/v1767756141/logo_zwilna.png" alt="Logo" width={600} height={400} className="object-contain w-[150px] lg:w-[200px]" />

                <div>
                    <h1 className="text-md mb-2 uppercase font-bold select-none">Links Rápidos</h1>
                    {navLinks.map((link) => (
                        <a key={link.href} href={link.href} className="text-sm mr-3 text-gray-400 hover:text-white cursor-pointer">
                            {link.label}
                        </a>
                    ))}
                </div>

                <div>
                    <h1 className="text-md mb-2 uppercase font-bold select-none">Contato</h1>
                    <p className="text-sm mb-2 text-gray-400 hover:text-white cursor-pointer">moveplusoficial@gmail.com</p>
                    <p className="text-sm text-gray-400 hover:text-white cursor-pointer">(11) 99999-9999</p>
                </div>

            </div>

            <hr className="w-full max-w-[80%] my-8 border-white/10" />

            <div className="flex w-full justify-between max-w-[80%]">
                <p className="text-[10px] text-white text-center mt-4 select-none">© 2026 Move Plus. Todos os direitos reservados.</p>

                <div className="flex gap-4">
                    <h1 className="text-xs text-gray-400 hover:text-white text-center mt-4 cursor-pointer">Termos de Uso</h1>
                    <h1 className="text-xs text-gray-400 hover:text-white text-center mt-4 cursor-pointer">Privacidade</h1>
                </div>

            </div>

        </div>
    )
}