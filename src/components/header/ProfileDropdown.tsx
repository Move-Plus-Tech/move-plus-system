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
}

export default function ProfileDropdown({ user, menuItems }: ProfileDropdownProps) {
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
          <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-medium text-sm">
            {user.avatarUrl}
          </div>
        )}

        <div className="flex flex-col items-start gap-0.5 pl-0">
          <p className="font-semibold text-white text-xs leading-tight">{user.name}</p>
          <span className="text-[9px] text-gray-400 leading-tight">Ver perfil</span>
        </div>

        {role === "ADMIN" && (
          <span className="px-2 py-0.5 text-[10px] font-bold bg-green-700 text-white rounded-sm ml-1">
            ADMIN
          </span>
        )}
      </div>

      <div
        className={`absolute right-0 mt-2 w-56 rounded-xl border bg-black shadow-lg transition-all duration-200 ease-out ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
          } origin-top-right`}
      >

        <div className="px-4 py-3 border-b">
          <p className="font-semibold text-white">Olá, {user.name.split(" ")[0]}!</p>
          <p className="text-[11px] text-orange-500">{user.email}</p>
        </div>


        <div className="py-1">
          {menuItems.map((item, idx) => (
            <button
              key={idx}
              onClick={() => {
                item.onClick();
                setIsOpen(false);
              }}
              className="w-full text-left font-medium px-4 py-2 text-sm text-orange-500 hover:bg-white/10 transition-colors cursor-pointer"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}