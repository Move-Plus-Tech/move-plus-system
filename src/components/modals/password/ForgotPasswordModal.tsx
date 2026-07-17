"use client";

import { useState } from "react";
import { useForgotPasswordModal } from "@/context/password/forgotPasswordModalContext";
import { requestPasswordReset } from "@/services/password-recovery";
import { MdClose } from "react-icons/md";
import { IoLockClosedOutline, IoSendOutline } from "react-icons/io5";
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
    } catch (err: unknown) {
      setLoading(false);
      const message =
        err instanceof Error ? err.message : "Erro ao enviar código de recuperação.";
      toast.error(message);
    }
  };

  return (
    <div className="fixed z-50 inset-0 bg-black/75 flex items-center justify-center">
      <div className="bg-white rounded-2xl w-[360px] p-8 relative shadow-xl">

        <button
          onClick={closeModal}
          className="absolute right-4 top-4 w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer"
        >
          <MdClose size={16} className="text-gray-500" />
        </button>

        <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center mb-5">
          <IoLockClosedOutline size={22} className="text-[#FF4D1C]" />
        </div>

        <h2 className="text-[17px] font-semibold text-gray-900 tracking-tight">
          Recuperar senha
        </h2>
        <p className="text-[13.5px] text-gray-400 mt-1.5 mb-6 leading-relaxed">
          Digite seu email e enviaremos um código para você redefinir sua senha.
        </p>

        <label className="block text-[11px] font-medium text-gray-400 uppercase tracking-wide mb-1.5">
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="seu@email.com"
          className="w-full h-[46px] px-3.5 bg-gray-50 border border-gray-200 rounded-[10px] text-sm text-gray-900 placeholder:text-gray-300 outline-none focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-100 transition-all"
        />

        <button
          onClick={handleSend}
          disabled={!email.trim() || loading}
          className={`w-full h-[46px] mt-3.5 rounded-sm text-sm font-semibold flex items-center justify-center gap-2 transition-all
            ${!email.trim() || loading
              ? "bg-gray-100 text-gray-300 cursor-not-allowed"
              : "bg-[#FF4D1C] hover:bg-orange-600 active:scale-[0.98] text-white cursor-pointer"
            }`}
        >
          {loading ? (
            "Enviando..."
          ) : (
            <>
              <IoSendOutline size={15} />
              Enviar código
            </>
          )}
        </button>
      </div>
    </div>
  );
}