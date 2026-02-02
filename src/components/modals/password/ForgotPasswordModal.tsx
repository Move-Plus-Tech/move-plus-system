"use client";

import { useState } from "react";
import { useForgotPasswordModal } from "@/context/password/forgotPasswordModalContext";
import { requestPasswordReset } from "@/services/password-recovery";
import { MdClose } from "react-icons/md";
import { useResetPasswordModal } from "@/context/password/resetModalContext";

import toast from "react-hot-toast";

export default function ForgotPasswordModal() {
  const { isOpen, closeModal } = useForgotPasswordModal();
  const { openModal: openResetCodeModal } = useResetPasswordModal();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSend = async () => {
    try {
      setLoading(true);
      await requestPasswordReset(email);
      localStorage.setItem("recovery_email", email);
      setLoading(false);
      closeModal();
      openResetCodeModal();
    } catch (err: any) {
      setLoading(false);
      toast.error(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-[350px] relative">

        <button
          onClick={closeModal}
          className="absolute cursor-pointer right-4 top-4 w-6 h-6 flex items-center justify-center "
        >
          <MdClose size={20} className="text-black" />
        </button>

        <h2 className="text-lg font-bold text-black">Recuperar senha</h2>
        <p className="text-sm text-gray-600 mt-1">
          Digite seu email para enviarmos um código de recuperação.
        </p>

        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Seu email"
          className="mt-4 w-full h-12 px-3 border border-gray-200 outline-none rounded-md"
        />

        <button
          onClick={handleSend}
          disabled={!email.trim()}
          className={`w-full h-12 mt-4 rounded-md font-bold transition-colors ${!email.trim() ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600 text-white cursor-pointer'}`}
        >
          {loading ? "Enviando..." : "Enviar código"}
        </button>

      </div>
    </div>
  );
}
