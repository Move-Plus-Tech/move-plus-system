"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/authContext";
import { Menu, X } from "lucide-react";
import Image from "next/image";

import { FaUser } from "react-icons/fa";
import { FaTshirt } from "react-icons/fa";
import { IoExitOutline } from "react-icons/io5";
import { FaLongArrowAltRight } from "react-icons/fa";
import { BsFileBarGraphFill } from "react-icons/bs";

import { useLoginModal } from "@/context/loginModalContext";

import ProfileDropdown from "./ProfileDropdown";
import MyEventsModal from "../modals/MyEventsModal";
import Contact from "../modals/Contact";
import UserProfileModal from "../modals/Profile";

const navLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Kits", href: "#kits" },
  { label: "Fale conosco", onClick: "contact" },
];

export default function Header() {
  const { user, logout, hydrated, role } = useAuth();
  const pathname = usePathname();
  const { openModal } = useLoginModal();
  const [openModalMyEvents, setOpenModalMyEvents] = useState(false);
  const [openModalProfile, setOpenModalProfile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openContact, setOpenContact] = useState(false);
  const isAdminRoute = pathname.startsWith("/admin");
  const visibleNavLinks = isAdminRoute ? [] : navLinks;
  const headerClassName = isAdminRoute
    ? "fixed top-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-xl border-b border-orange-500/10 shadow-[0_12px_40px_rgba(0,0,0,0.28)]"
    : "fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-white/10";
  const mobileMenuButtonClassName = isAdminRoute
    ? "lg:hidden inline-flex items-center gap-2 rounded-sm border border-white/10 bg-white/5 px-3 py-2 text-white"
    : "lg:hidden p-2 text-white";
  const adminBadgeClassName = isAdminRoute
    ? "inline-flex items-center gap-2 rounded-full border border-orange-400 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-orange-400"
    : "hidden";

  if (!hydrated) return null;

  return (
    <>
      <header className={headerClassName}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20 gap-3">

            <div className="flex items-center gap-3 flex-shrink-0">
              <a href="/" className="flex items-center gap-1">
                <Image
                  src="https://res.cloudinary.com/dytw21kw2/image/upload/v1767756141/logo_zwilna.png"
                  alt="Move +"
                  width={150}
                  height={40}
                  quality={100}
                  draggable={false}
                  className={isAdminRoute ? "w-auto ml-2 h-5 md:h-7 object-contain brightness-110" : "w-auto ml-2 h-6 md:h-8 object-contain"}
                />
              </a>

              <span className={adminBadgeClassName}>
                <BsFileBarGraphFill size={12} />
                Painel admin
              </span>
            </div>

            <nav className="hidden lg:flex items-center gap-8">
              {visibleNavLinks.map((link) => (
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
                      className={isAdminRoute
                        ? "px-5 py-2 text-sm font-semibold text-orange-200 bg-white/5 border border-orange-500/20 rounded-full hover:bg-white/10 transition-all cursor-pointer"
                        : "px-7 neon-button py-2 text-sm font-medium text-white bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 rounded-sm hover:brightness-90 transition-all cursor-pointer"
                      }
                  >
                    Entrar
                  </button>
                </>
              ) : (
                <ProfileDropdown
                  user={{
                    name: `${user.name}`,
                    email: `${user.email}`,
                    avatarUrl: user.name ? user.name.charAt(0).toUpperCase() : "?",
                  }}
                  menuItems={[
                    {
                      label: (
                        <div className="flex gap-2 text-xs text-hero-foreground">
                          <FaUser size={15} />
                          <span className="text-white">Meu Perfil</span>
                        </div>
                      ),
                      onClick: () => setOpenModalProfile(true),
                    },
                    {
                      label: (
                        <div className="flex gap-2 text-xs text-hero-foreground">
                          <FaTshirt size={17} />
                          <span className="text-white">Meus Kits</span>
                        </div>
                      ),
                      onClick: () => setOpenModalMyEvents(true),
                    },
                    ...(role === "ADMIN"
                      ? [
                        {
                          label: (
                            <div className="flex gap-2 text-xs text-hero-foreground">
                              <BsFileBarGraphFill size={15} />
                              <span className="text-white">Painel de Administrador</span>
                            </div>
                          ),
                          onClick: () => {
                            window.location.href = "/admin/kits";
                          },
                        },
                      ]
                      : []),
                    {
                      label: (
                        <div className="flex gap-2 text-xs">
                          <IoExitOutline size={16} className="text-hero-foreground" />
                          <span className="text-white">Sair</span>
                        </div>
                      ),
                      onClick: () => logout(),
                    },
                  ]}
                />
              )}
            </div>

            <button
              className={mobileMenuButtonClassName}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className={isAdminRoute ? "lg:hidden bg-slate-950 border-t border-orange-500/10 animate-fade-up" : "lg:hidden bg-hero border-t border-hero-foreground/10 animate-fade-up"}>
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col gap-2">
              {visibleNavLinks.map((link) => (
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
                  className={isAdminRoute
                    ? "py-3 px-4 text-base text-gray-200 font-medium hover:bg-white/5 rounded-lg transition-colors flex items-center justify-between cursor-pointer"
                    : "py-3 px-4 text-base text-gray-300 font-medium text-hero-foreground hover:bg-hero-foreground/5 rounded-lg transition-colors flex items-center justify-between cursor-pointer"
                  }
                >
                  <span>{link.label}</span>
                  <span><FaLongArrowAltRight size={15} className="text-orange-500" /></span>
                </a>

              ))}
              <div className={isAdminRoute ? "pt-4 mt-2 ml-2 border-t border-white/10 flex flex-col gap-2" : "pt-4 mt-2 ml-2 border-t border-hero-foreground/10 flex flex-col gap-2"}>
                {!user ? (
                  <>
                    <button
                      onClick={() => {
                        openModal();
                        setIsMenuOpen(false);
                      }}
                      className={isAdminRoute
                        ? "w-full py-2 text-md font-semibold text-orange-200 bg-white/5 border border-orange-500/20 rounded-lg hover:bg-white/10 transition-all cursor-pointer"
                        : "w-full py-2 text-md font-medium text-white bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 rounded-lg hover:brightness-90 transition-all cursor-pointer"
                      }
                    >
                      Entrar
                    </button>
                  </>
                ) : (
                  <ProfileDropdown
                    user={{
                      name: `${user.name}`,
                      email: `${user.email}`,
                      avatarUrl: user.name ? user.name.charAt(0).toUpperCase() : "?",
                    }}
                    menuItems={[
                      {
                        label: (
                          <div className="flex gap-2 text-xs text-hero-foreground">
                            <FaUser size={15} />
                            <span className="text-white">Meu Perfil</span>
                          </div>
                        ),
                        onClick: () => setOpenModalProfile(true),
                      },
                      {
                        label: (
                          <div className="flex gap-2 text-xs text-hero-foreground">
                            <FaTshirt size={17} />
                            <span className="text-white">Meus Kits</span>
                          </div>
                        ),
                        onClick: () => setOpenModalMyEvents(true),
                      },
                      ...(role === "ADMIN"
                        ? [
                          {
                            label: (
                              <div className="flex gap-2 text-xs text-hero-foreground">
                                <BsFileBarGraphFill size={15} />
                                <span className="text-white">Painel de Administrador</span>
                              </div>
                            ),
                            onClick: () => {
                              window.location.href = "/admin/kits";
                            },
                          },
                        ]
                        : []),
                      {
                        label: (
                          <div className="flex gap-2 text-xs">
                            <IoExitOutline size={16} className="text-hero-foreground" />
                            <span className="text-white">Sair</span>
                          </div>
                        ),
                        onClick: () => logout(),
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

        <UserProfileModal
          isOpen={openModalProfile}
          onClose={() => setOpenModalProfile(false)}
        />

      </header>

      <Contact isOpen={openContact} onClose={() => setOpenContact(false)} />
    </>
  );
}
