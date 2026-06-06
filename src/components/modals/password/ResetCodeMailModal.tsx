"use client";

import { useEffect, useState } from "react";
import { useResetPasswordModal } from "@/context/password/resetModalContext";
import { resendPasswordResetCode, validateResetCode } from "@/services/password-recovery";
import { useChangePasswordModal } from "@/context/password/changePasswordModalContext";
import { IoCheckmarkCircleOutline, IoMailOpenOutline } from "react-icons/io5";
import toast from "react-hot-toast";

export default function ResetCodeModal() {
    const { openModal: openChangePasswordModal } = useChangePasswordModal();
    const [email, setEmail] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [resendLoading, setResendLoading] = useState(false);
    const [digits, setDigits] = useState<string[]>(Array(6).fill(""));
    const { isOpen, closeModal } = useResetPasswordModal();

    useEffect(() => {
        if (!isOpen) return;
        if (typeof window !== "undefined") {
            setEmail(localStorage.getItem("recovery_email"));
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleChange = (value: string, index: number) => {
        if (!/^\d?$/.test(value)) return;
        const updated = [...digits];
        updated[index] = value;
        setDigits(updated);
        if (value && index < 5) {
            document.getElementById(`code-${index + 1}`)?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace" && !digits[index] && index > 0) {
            document.getElementById(`code-${index - 1}`)?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>, index: number) => {
        e.preventDefault();
        const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
        const updated = [...digits];
        text.split("").forEach((ch, i) => {
            if (index + i < 6) updated[index + i] = ch;
        });
        setDigits(updated);
        const nextIndex = Math.min(index + text.length, 5);
        document.getElementById(`code-${nextIndex}`)?.focus();
    };

    const handleSubmit = async () => {
        const finalCode = digits.join("");
        if (finalCode.length !== 6) return toast.error("Digite os 6 dígitos.");
        try {
            setLoading(true);
            await validateResetCode(email!, finalCode);
            setLoading(false);
            closeModal();
            openChangePasswordModal();
        } catch (err: unknown) {
            setLoading(false);
            const message = err instanceof Error ? err.message : "Erro ao validar código.";
            toast.error(message);
        }
    };

    const handleResend = async () => {
        if (!email) {
            toast.error("Email não encontrado. Refaça a recuperação de senha.");
            return;
        }

        try {
            setResendLoading(true);
            await resendPasswordResetCode(email);
            toast.success("Código reenviado com sucesso.");
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Erro ao reenviar código.";
            toast.error(message);
        } finally {
            setResendLoading(false);
        }
    };

    const isFull = digits.every((d) => d !== "");

    return (
        <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl w-[360px] p-8 relative shadow-xl">

                <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center mx-auto mb-5">
                    <IoMailOpenOutline size={22} className="text-orange-500" />
                </div>

                <h2 className="text-[17px] font-semibold text-gray-900 text-center tracking-tight">
                    Verifique seu email
                </h2>
                <p className="text-[13px] text-gray-400 text-center mt-1.5 mb-7 leading-relaxed">
                    Enviamos um código de 6 dígitos para{" "}
                    <span className="text-gray-600 font-medium">{email}</span>
                </p>

                <div className="flex justify-center gap-2.5 mb-6">
                    {digits.map((digit, i) => (
                        <input
                            key={i}
                            id={`code-${i}`}
                            maxLength={1}
                            inputMode="numeric"
                            value={digit}
                            onChange={(e) => handleChange(e.target.value, i)}
                            onKeyDown={(e) => handleKeyDown(e, i)}
                            onPaste={(e) => handlePaste(e, i)}
                            className={`w-11 h-[52px] text-center text-xl font-semibold border-[1.5px] rounded-md outline-none transition-all
                ${digit
                                    ? "border-orange-400 bg-orange-50 text-orange-500"
                                    : "border-gray-200 bg-gray-50 text-gray-900 focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-100"
                                }`}
                        />
                    ))}
                </div>

                <button
                    onClick={handleSubmit}
                    disabled={!isFull || loading}
                    className={`w-full h-[46px] rounded-sm text-sm font-semibold flex items-center justify-center gap-2 transition-all
            ${!isFull || loading
                            ? "bg-gray-100 text-gray-300 cursor-not-allowed"
                            : "bg-orange-500 hover:bg-orange-600 active:scale-[0.98] text-white cursor-pointer"
                        }`}
                >
                    <IoCheckmarkCircleOutline size={16} />
                    {loading ? "Validando..." : "Validar código"}
                </button>

                <p className="text-center text-[13px] text-gray-400 mt-4">
                    Não recebeu?{" "}
                    <button
                        onClick={handleResend}
                        disabled={resendLoading}
                        className="text-orange-500 font-medium hover:underline cursor-pointer disabled:text-gray-300 disabled:cursor-not-allowed"
                    >
                        {resendLoading ? "Reenviando..." : "Reenviar código"}
                    </button>
                </p>

            </div>
        </div>
    );
}