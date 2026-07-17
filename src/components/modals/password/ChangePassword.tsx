"use client";

import { useState, useEffect } from "react";
import { useChangePasswordModal } from "@/context/password/changePasswordModalContext";
import { resetPassword } from "@/services/password-recovery";
import { MdClose } from "react-icons/md";
import { IoShieldCheckmarkOutline, IoLockClosedOutline, IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import toast from "react-hot-toast";

function getStrength(p: string): number {
  let score = 0;
  if (p.length >= 8) score++;
  if (/[A-Z]/.test(p)) score++;
  if (/[0-9]/.test(p)) score++;
  if (/[^A-Za-z0-9]/.test(p)) score++;
  return score;
}

const strengthColors = ["#ef4444", "#f97316", "#eab308", "#22c55e"];
const strengthLabels = ["Fraca", "Razoável", "Boa", "Forte"];

export default function ChangePasswordModal() {
  const { isOpen, closeModal } = useChangePasswordModal();
  const [email, setEmail] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") setEmail(localStorage.getItem("recovery_email"));
  }, []);

  if (!isOpen) return null;

  const strength = newPassword ? getStrength(newPassword) : 0;
  const passwordsMatch = confirmPassword && newPassword === confirmPassword;
  const passwordsMismatch = confirmPassword && newPassword !== confirmPassword;
  const canSubmit = newPassword.trim() && confirmPassword.trim() && newPassword === confirmPassword && !loading && (strengthLabels[strength - 1] === "Boa" || strengthLabels[strength - 1] === "Forte");

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) return toast.error("As senhas não coincidem");
    if (!email) return toast.error("Email não encontrado. Refaça a recuperação de senha.");
    try {
      setLoading(true);
      await resetPassword(email, "", newPassword);
      toast.success("Senha alterada com sucesso!");
      closeModal();
      localStorage.removeItem("recovery_email");
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Erro ao trocar senha");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed z-50 inset-0 bg-black/75 flex items-center justify-center">
      <div className="bg-white rounded-2xl w-[360px] p-8 relative shadow-xl">

        <button onClick={closeModal} className="absolute right-4 top-4 w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer">
          <MdClose size={16} className="text-gray-500" />
        </button>

        <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center mb-5">
          <IoShieldCheckmarkOutline size={22} className="text-[#FF4D1C]" />
        </div>

        <h2 className="text-[17px] font-semibold text-gray-900 tracking-tight">Nova senha</h2>
        <p className="text-[13.5px] text-gray-400 mt-1.5 mb-6 leading-relaxed">
          Escolha uma senha forte para proteger sua conta.
        </p>

        <div className="mb-3">
          <label className="block text-[11px] font-medium text-gray-400 uppercase tracking-wide mb-1.5">
            Nova senha
          </label>
          <div className="relative">
            <input
              type={showNew ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Mínimo 8 caracteres"
              className="w-full h-[46px] px-3.5 pr-11 bg-gray-50 border-[1.5px] border-gray-200 rounded-sm text-sm text-gray-900 placeholder:text-gray-300 outline-none focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-100 transition-all"
            />
            <button type="button" onClick={() => setShowNew((p) => !p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors">
              {showNew ? <IoEyeOffOutline size={18} /> : <IoEyeOutline size={18} />}
            </button>
          </div>

          {newPassword && (
            <div className="mt-2">
              <div className="flex gap-1">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="flex-1 h-[3px] rounded-full transition-all duration-200"
                    style={{ background: i < strength ? strengthColors[strength - 1] : "#f0f0f0" }}
                  />
                ))}
              </div>
              <p className="text-[11px] mt-1 font-medium transition-colors"
                style={{ color: strengthColors[strength - 1] }}>
                {strengthLabels[strength - 1]}
              </p>
            </div>
          )}
        </div>

        <div className="mb-1">
          <label className="block text-[11px] font-medium text-gray-400 uppercase tracking-wide mb-1.5">
            Confirme a senha
          </label>
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Repita a nova senha"
              className={`w-full h-[46px] px-3.5 pr-11 bg-gray-50 border-[1.5px] rounded-sm text-sm text-gray-900 placeholder:text-gray-300 outline-none transition-all
                ${passwordsMatch ? "border-green-400 focus:ring-green-100 bg-green-50/30" : ""}
                ${passwordsMismatch ? "border-red-400 focus:ring-red-100" : ""}
                ${!confirmPassword ? "border-gray-200 focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-100" : ""}
              `}
            />
            <button type="button" onClick={() => setShowConfirm((p) => !p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors">
              {showConfirm ? <IoEyeOffOutline size={18} /> : <IoEyeOutline size={18} />}
            </button>
          </div>

          {confirmPassword && (
            <p className={`text-[12px] mt-1.5 flex items-center gap-1 font-medium ${passwordsMatch ? "text-green-500" : "text-red-500"}`}>
              {passwordsMatch ? "✓ Senhas coincidem" : "✗ Senhas não coincidem"}
            </p>
          )}
        </div>

        <button
          onClick={handleChangePassword}
          disabled={!canSubmit}
          className={`w-full h-[46px] mt-5 rounded-sm text-sm font-semibold flex items-center justify-center gap-2 transition-all
            ${canSubmit
              ? "bg-[#FF4D1C] hover:bg-orange-600 active:scale-[0.98] text-white cursor-pointer"
              : "bg-gray-100 text-gray-300 cursor-not-allowed"
            }`}
        >
          <IoLockClosedOutline size={15} />
          {loading ? "Salvando..." : "Salvar nova senha"}
        </button>

      </div>
    </div>
  );
}