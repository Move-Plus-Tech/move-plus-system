"use client";

import { useState, useEffect, useRef, ReactNode } from "react";
import { useAuth } from "@/context/authContext";

interface ProfileDropdownProps {
  user: {
    name: string;
    email: string;
    avatarUrl?: string;
  };
  menuItems: { label: ReactNode; onClick: () => void }[];
  isAdminTheme?: boolean;
}

export default function ProfileDropdown({ user, menuItems, isAdminTheme = false }: ProfileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { role } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left z-50" ref={dropdownRef}>

      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 cursor-pointer select-none"
      >
        {user.avatarUrl && (
          <div className="w-8 h-8 bg-[#FF4D1C] rounded-full flex items-center justify-center text-white font-medium text-sm">
            {user.avatarUrl}
          </div>
        )}

        <div className="flex flex-col items-start gap-0.5 pl-0">
          <p className={isAdminTheme ? "font-semibold text-black text-xs leading-tight" : "font-semibold text-white text-xs leading-tight"}>{user.name}</p>
          <span className={isAdminTheme ? "text-[9px] text-gray-600 leading-tight" : "text-[9px] text-gray-400 leading-tight"}>Ver perfil</span>
        </div>

        {role === "ADMIN" && (
          <span className="px-2 py-0.5 text-[10px] font-bold bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-center cursor-pointer transition-all duration-200 ease-[cubic-bezier(0.2,0.8,0.2,1)] rounded-sm ml-1">
            ADMIN
          </span>
        )}
      </div>

      <div
        className={`absolute right-0 mt-2 w-56 rounded-xl border shadow-lg transition-all duration-200 ease-out ${isAdminTheme ? "bg-white border-black/20" : "bg-black border-white/10"} ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
          } origin-top-right`}
      >

        <div className={isAdminTheme ? "px-4 py-3 border-b border-black/10" : "px-4 py-3 border-b border-white/10"}>
          <p className={isAdminTheme ? "font-semibold text-black" : "font-semibold text-white"}>Olá, {user.name.split(" ")[0]}!</p>
          <p className={isAdminTheme ? "text-[11px] text-gray-600" : "text-[11px] text-[#FF4D1C]"}>{user.email}</p>
        </div>


        <div className="py-1">
          {menuItems.map((item, idx) => (
            <button
              key={idx}
              onClick={() => {
                item.onClick();
                setIsOpen(false);
              }}
              className={isAdminTheme
                ? "w-full text-left font-medium px-4 py-2 text-sm text-black hover:bg-black/5 transition-colors cursor-pointer"
                : "w-full text-left font-medium px-4 py-2 text-sm text-[#FF4D1C] hover:bg-white/10 transition-colors cursor-pointer"
              }
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}