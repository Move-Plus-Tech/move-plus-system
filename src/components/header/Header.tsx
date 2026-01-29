"use client";

import { useState } from "react";
import { useAuth } from "@/context/authContext";
import { Menu, X } from "lucide-react";
import Image from "next/image";

import { HiOutlineTicket } from "react-icons/hi2";
import { CiLogout } from "react-icons/ci";
import { FaLongArrowAltRight } from "react-icons/fa";

import { useLoginModal } from "@/context/loginModalContext";
import ProfileDropdown from "./ProfileDropdown";
import MyEventsModal from "../modals/MyEventsModal";

const navLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Kits", href: "#kits" },
  { label: "Contato", href: "#contato" },
];

export default function Header() {
  const { user, logout, hydrated } = useAuth();
  const { openModal } = useLoginModal();
  const [openModalMyEvents, setOpenModalMyEvents] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (!hydrated) return null;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#inicio" className="flex items-center gap-1 flex-shrink-0">
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

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Auth Section */}
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
                  avatarUrl: "https://res.cloudinary.com/dytw21kw2/image/upload/v1765647074/userIcon_oy1erm.png",
                }}
                menuItems={[
                  {
                    label: (
                      <div className="flex gap-2 text-hero-foreground">
                        <HiOutlineTicket size={18} />
                        Meus eventos
                      </div>
                    ),
                    onClick: () => setOpenModalMyEvents(true),
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

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-hero border-t border-hero-foreground/10 animate-fade-up">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="py-3 px-4 text-base text-gray-300 font-medium text-hero-foreground hover:bg-hero-foreground/5 rounded-lg transition-colors flex items-center justify-between"
                onClick={() => setIsMenuOpen(false)}
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
                    avatarUrl: "https://res.cloudinary.com/dytw21kw2/image/upload/v1765647074/userIcon_oy1erm.png",
                  }}
                  menuItems={[
                    {
                      label: (
                        <div className="flex gap-2 text-hero-foreground">
                          <HiOutlineTicket size={18} />
                          Meus eventos
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
  );
}
