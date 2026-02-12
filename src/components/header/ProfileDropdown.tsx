"use client";

import { useState, useEffect, useRef, ReactNode } from "react";

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
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <img
              src={user.avatarUrl}
              alt="Avatar"
              className="w-full h-full object-cover scale-130 object-[center_10%] transform-gpu"
            />
          </div>

        )}
        <p className="font-semibold text-orange-500 text-sm">Olá, {user.name.split(" ")[0]}!</p>
      </div>

      <div
        className={`absolute right-0 mt-2 w-56 rounded-xl border bg-black shadow-lg transition-all duration-200 ease-out ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
          } origin-top-right`}
      >

        <div className="px-4 py-3 border-b">
          <p className="font-semibold text-white">{user.name}</p>
          <p className="text-[11px] text-white">{user.email}</p>
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