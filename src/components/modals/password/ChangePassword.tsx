"use client";

import { useState, useEffect } from "react";
import { useChangePasswordModal } from "@/context/password/changePasswordModalContext";
import { resetPassword } from "@/services/password-recovery";
import { MdClose } from "react-icons/md";

import toast from "react-hot-toast";

export default function ChangePasswordModal() {
  const { isOpen, closeModal } = useChangePasswordModal();

  const [email, setEmail] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setEmail(localStorage.getItem("recovery_email"));
    }
  }, []);

  if (!isOpen) return null;

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      toast.error("As senhas não coincidem");
      return;
    }

    if (!email) {
      toast.error("Email não encontrado. Refaça a recuperação de senha.");
      return;
    }

    try {
      setLoading(true);

      await resetPassword(email, "", newPassword);

      toast.success("Senha alterada com sucesso!");
      closeModal();
      localStorage.removeItem("recovery_email");

    } catch (err: any) {
      toast.error(err.message || "Erro ao trocar senha");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-[350px] relative">

        <button
          onClick={closeModal}
          className="absolute right-4 top-4 w-6 h-6 flex items-center justify-center cursor-pointer"
        >
          <MdClose size={20} className="text-black" />
        </button>

        <h2 className="text-lg font-bold text-black">Trocar senha</h2>
        <p className="text-sm text-gray-600 mt-1">
          Digite sua nova senha.
        </p>

        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Nova senha"
          className="mt-4 w-full h-12 px-3 border border-gray-200 outline-none rounded-md"
        />

        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirme a nova senha"
          className="mt-4 w-full h-12 px-3 border border-gray-200 outline-none rounded-md"
        />

        <button
          onClick={handleChangePassword}
          disabled={!newPassword.trim() || !confirmPassword.trim() || loading}
          className={`w-full h-12 mt-4 rounded-md font-bold transition-colors ${!newPassword.trim() || !confirmPassword.trim() || loading
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-black hover:bg-gray-800 text-white cursor-pointer"
            }`}
        >
          {loading ? "Alterando..." : "Trocar senha"}
        </button>

      </div>
    </div>
  );
}
