"use client";

import { useEffect, useState } from "react";
import { useResetPasswordModal } from "@/context/password/resetModalContext";
import { validateResetCode } from "@/services/password-recovery";
import { useChangePasswordModal } from "@/context/password/changePasswordModalContext";

import toast from "react-hot-toast";

export default function ResetCodeModal() {

    const { openModal: openChangePasswordModal } = useChangePasswordModal();
    const [email, setEmail] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [digits, setDigits] = useState<string[]>(Array(6).fill(""));
    const { isOpen, closeModal } = useResetPasswordModal();
    if (!isOpen) return null;

    useEffect(() => {
        if (typeof window !== "undefined") {
            setEmail(localStorage.getItem("recovery_email"));
        }
    }, []);

    const handleChange = (value: string, index: number) => {
        if (!/^\d?$/.test(value)) return;

        const updated = [...digits];
        updated[index] = value;
        setDigits(updated);

        if (value && index < 5) {
            const next = document.getElementById(`code-${index + 1}`);
            next?.focus();
        }
    };

    const handleSubmit = async () => {
        const finalCode = digits.join("");

        if (finalCode.length !== 6) {
            return toast.error("Digite os 6 dígitos.");
        }

        try {
            setLoading(true);
            await validateResetCode(email!, finalCode);
            setLoading(false);
            closeModal();
            openChangePasswordModal();
        } catch (err: any) {
            setLoading(false);
            toast.error(err);
        }

    };

    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>,
        index: number
    ) => {
        if (e.key === "Backspace" && !digits[index] && index > 0) {
            const prev = document.getElementById(`code-${index - 1}`);
            prev?.focus();
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-[90%] max-w-sm shadow-lg animate-fadeIn">
                <h2 className="text-xl font-semibold text-center mb-4">
                    Digite o código recebido
                </h2>

                <div className="flex justify-center gap-2 mb-6">
                    {digits.map((digit, i) => (
                        <input
                            key={i}
                            id={`code-${i}`}
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleChange(e.target.value, i)}
                            onKeyDown={(e) => handleKeyDown(e, i)}
                            className="w-10 h-12 text-center text-xl font-semibold border
                         rounded-md focus:outline-orange-600 focus:ring-2 
                         focus:ring-orange-400"
                        />
                    ))}
                </div>

                <button
                    onClick={handleSubmit}
                    className="w-full hover:bg-orange-600 bg-orange-500 hover:text-black text-white py-2 rounded-md 
                    transition cursor-pointer"
                >
                    {loading ? "Validando..." : "Validar código"}
                </button>
            </div>
        </div>
    );
}
