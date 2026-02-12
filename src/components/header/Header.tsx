"use client";

import { useState } from "react";
import { useAuth } from "@/context/authContext";
import { Menu, X } from "lucide-react";
import Image from "next/image";

import { FaTshirt } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { FaLongArrowAltRight } from "react-icons/fa";
import { BsFileBarGraphFill } from "react-icons/bs";

import { useLoginModal } from "@/context/loginModalContext";

import ProfileDropdown from "./ProfileDropdown";
import MyEventsModal from "../modals/MyEventsModal";
import Contact from "../modals/Contact";

const navLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Kits", href: "#kits" },
  { label: "Fale conosco", onClick: "contact" },
];

export default function Header() {
  const { user, logout, hydrated } = useAuth();
  const { openModal } = useLoginModal();
  const [openModalMyEvents, setOpenModalMyEvents] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openContact, setOpenContact] = useState(false);

  if (!hydrated) return null;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">

            <a href="/" className="flex items-center gap-1 flex-shrink-0">
              <Image
                src="https://res.cloudinary.com/dytw21kw2/image/upload/v1767756141/logo_zwilna.png"
                alt="Move +"
                width={150}
                height={40}
                quality={100}
                draggable={false}
                className="w-auto ml-2 h-6 md:h-8 object-contain"
              />
            </a>

            <nav className="hidden lg:flex items-center gap-8">
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
                  className="text-sm font-medium text-gray-300 hover:text-white transition-colors cursor-pointer"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="hidden lg:flex items-center gap-4">
              {!user ? (
                <>
                  <button
                    onClick={() => openModal()}
                    className="px-7 neon-button py-2 text-sm font-medium text-white bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 rounded-lg hover:brightness-90 transition-all cursor-pointer"
                  >
                    Entrar
                  </button>
                </>
              ) : (
                <ProfileDropdown
                  user={{
                    name: `${user.name}`,
                    email: `${user.email}`,
                    avatarUrl: "https://res.cloudinary.com/dytw21kw2/image/upload/v1770907227/ChatGPT_Image_Feb_12_2026_11_34_22_AM_eci0pt.png",
                  }}
                  menuItems={[
                    {
                      label: (
                        <div className="flex gap-2 text-hero-foreground">
                          <FaTshirt size={17} />
                          Meus kits
                        </div>
                      ),
                      onClick: () => setOpenModalMyEvents(true),
                    },
                    {
                      label: (
                        <div className="flex gap-2 text-hero-foreground">
                          <BsFileBarGraphFill size={17} />
                          Gerenciamento de kits
                        </div>
                      ),
                      onClick: () => {
                        window.location.href = "/admin/kits";
                      },
                    },
                    {
                      label: (
                        <div className="flex gap-2 text-hero-foreground">
                          <CiLogout size={17} />
                          Sair
                        </div>
                      ),
                      onClick: () => logout(),
                    },
                  ]}
                />
              )}
            </div>

            <button
              className="lg:hidden p-2 text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden bg-hero border-t border-hero-foreground/10 animate-fade-up">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    if (link.onClick === "contact") {
                      e.preventDefault();
                      setOpenContact(true);
                    }
                    setIsMenuOpen(false);
                  }}
                  className="py-3 px-4 text-base text-gray-300 font-medium text-hero-foreground hover:bg-hero-foreground/5 rounded-lg transition-colors flex items-center justify-between cursor-pointer"
                >
                  <span>{link.label}</span>
                  <span><FaLongArrowAltRight size={15} className="text-orange-500" /></span>
                </a>

              ))}
              <div className="pt-2 mt-2 border-t border-hero-foreground/10 flex flex-col gap-2">
                {!user ? (
                  <>
                    <button
                      onClick={() => {
                        openModal();
                        setIsMenuOpen(false);
                      }}
                      className="w-full py-2 text-md font-medium text-white bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 rounded-lg hover:brightness-90 transition-all cursor-pointer"
                    >
                      Entrar
                    </button>
                  </>
                ) : (
                  <ProfileDropdown
                    user={{
                      name: `${user.name}`,
                      email: `${user.email}`,
                      avatarUrl: "https://res.cloudinary.com/dytw21kw2/image/upload/v1770907174/307ce493-b254-4b2d-8ba4-d12c080d6651_m2d2ns.png",
                    }}
                    menuItems={[
                      {
                        label: (
                          <div className="flex gap-2 text-hero-foreground">
                            <FaTshirt size={17} />
                            Meus kits
                          </div>
                        ),
                        onClick: () => {
                          setOpenModalMyEvents(true);
                          setIsMenuOpen(false);
                        },
                      },
                      {
                        label: (
                          <div className="flex gap-2 text-hero-foreground">
                            <CiLogout size={17} />
                            Sair
                          </div>
                        ),
                        onClick: () => {
                          logout();
                          setIsMenuOpen(false);
                        },
                      },
                    ]}
                  />
                )}
              </div>
            </nav>
          </div>
        )}

        <MyEventsModal
          openModalEvents={openModalMyEvents}
          setOpenModalEvents={setOpenModalMyEvents}
        />

      </header>

      <Contact isOpen={openContact} onClose={() => setOpenContact(false)} />
    </>
  );
}
