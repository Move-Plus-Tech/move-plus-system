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
  const useAdminTheme = isAdminRoute;
  const visibleNavLinks = isAdminRoute ? [] : navLinks;
  const headerClassName = useAdminTheme
    ? "fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-300"
    : "fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-white/10";
  const mobileMenuButtonClassName = useAdminTheme
    ? "lg:hidden inline-flex items-center gap-2 rounded-sm border border-black/20 bg-black/5 px-3 py-2 text-black"
    : "lg:hidden p-2 text-white";
  const adminBadgeClassName = isAdminRoute
    ? "px-2 py-0.5 text-[10px] font-bold bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-center transition-all select-none duration-200 ease-[cubic-bezier(0.2,0.8,0.2,1)] rounded-sm ml-1"
    : "hidden";

  if (!hydrated) return null;

  return (
    <>
      <header className={headerClassName}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20 gap-3">

            <div className="flex items-center gap-3 flex-shrink-0">
              <a href="/" className="flex items-center gap-1">
                {useAdminTheme ? (
                  <Image
                    src="https://res.cloudinary.com/dytw21kw2/image/upload/v1780709786/logo2_yhcieu.png"
                    alt="Move +"
                    width={150}
                    height={40}
                    quality={100}
                    draggable={false}
                    className="w-auto ml-2 h-6 md:h-8 object-contain"
                  />
                ) : (
                  <Image
                    src="https://res.cloudinary.com/dytw21kw2/image/upload/v1767756141/logo_zwilna.png"
                    alt="Move +"
                    width={150}
                    height={40}
                    quality={100}
                    draggable={false}
                    className="w-auto ml-2 h-6 md:h-8 object-contain"
                  />
                )}
              </a>

              <span className={adminBadgeClassName}>
                PAINEL ADMIN
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
                  className={useAdminTheme
                    ? "text-sm font-medium text-gray-700 hover:text-black transition-colors cursor-pointer"
                    : "text-sm font-medium text-gray-300 hover:text-white transition-colors cursor-pointer"
                  }
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
                    className={useAdminTheme
                      ? "px-5 py-2 text-sm font-semibold text-black bg-white border border-black/30 rounded-full hover:bg-black/5 transition-all cursor-pointer"
                      : "px-7 neon-button py-2 text-sm font-medium text-white bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 rounded-sm hover:brightness-90 transition-all cursor-pointer"
                    }
                  >
                    Entrar
                  </button>
                </>
              ) : (
                <ProfileDropdown
                  isAdminTheme={useAdminTheme}
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
                          <span className={useAdminTheme ? "text-black" : "text-white"}>Meu Perfil</span>
                        </div>
                      ),
                      onClick: () => setOpenModalProfile(true),
                    },
                    {
                      label: (
                        <div className="flex gap-2 text-xs text-hero-foreground">
                          <FaTshirt size={17} />
                          <span className={useAdminTheme ? "text-black" : "text-white"}>Meus Kits</span>
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
                              <span className={useAdminTheme ? "text-black" : "text-white"}>Painel de Administrador</span>
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
                          <IoExitOutline size={16} className={useAdminTheme ? "text-black" : "text-hero-foreground"} />
                          <span className={useAdminTheme ? "text-black" : "text-white"}>Sair</span>
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
          <div className={useAdminTheme ? "lg:hidden bg-white border-t border-black/10 animate-fade-up" : "lg:hidden bg-hero border-t border-hero-foreground/10 animate-fade-up"}>
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
                  className={useAdminTheme
                    ? "py-3 px-4 text-base text-black font-medium hover:bg-black/5 rounded-lg transition-colors flex items-center justify-between cursor-pointer"
                    : "py-3 px-4 text-base text-gray-300 font-medium text-hero-foreground hover:bg-hero-foreground/5 rounded-lg transition-colors flex items-center justify-between cursor-pointer"
                  }
                >
                  <span>{link.label}</span>
                  <span><FaLongArrowAltRight size={15} className={useAdminTheme ? "text-black" : "text-orange-500"} /></span>
                </a>

              ))}
              <div className={useAdminTheme ? "pt-4 mt-2 ml-2 border-t border-black/10 flex flex-col gap-2" : "pt-4 mt-2 ml-2 border-t border-hero-foreground/10 flex flex-col gap-2"}>
                {!user ? (
                  <>
                    <button
                      onClick={() => {
                        openModal();
                        setIsMenuOpen(false);
                      }}
                      className={useAdminTheme
                        ? "w-full py-2 text-md font-semibold text-black bg-white border border-black/30 rounded-lg hover:bg-black/5 transition-all cursor-pointer"
                        : "w-full py-2 text-md font-medium text-white bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 rounded-lg hover:brightness-90 transition-all cursor-pointer"
                      }
                    >
                      Entrar
                    </button>
                  </>
                ) : (
                  <ProfileDropdown
                    isAdminTheme={useAdminTheme}
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
                            <span className={useAdminTheme ? "text-black" : "text-white"}>Meu Perfil</span>
                          </div>
                        ),
                        onClick: () => setOpenModalProfile(true),
                      },
                      {
                        label: (
                          <div className="flex gap-2 text-xs text-hero-foreground">
                            <FaTshirt size={17} />
                            <span className={useAdminTheme ? "text-black" : "text-white"}>Meus Kits</span>
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
                                <span className={useAdminTheme ? "text-black" : "text-white"}>Painel de Administrador</span>
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
                            <IoExitOutline size={16} className={useAdminTheme ? "text-black" : "text-hero-foreground"} />
                            <span className={useAdminTheme ? "text-black" : "text-white"}>Sair</span>
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
