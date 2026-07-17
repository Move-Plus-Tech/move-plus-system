"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLoginModal } from "@/context/loginModalContext";
import { useRegisterModal } from "@/context/registerModalContext";
import { useForgotPasswordModal } from "@/context/password/forgotPasswordModalContext";
import { loginUser } from "@/services/user";
import { useAuth } from "@/context/authContext";

import { MdClose } from "react-icons/md";
import { FiEye, FiEyeOff } from "react-icons/fi";
import toast from "react-hot-toast";

export default function LoginModal() {
    const { isOpen, closeModal } = useLoginModal();
    const { openModal: openRegisterModal } = useRegisterModal();
    const { openModal: openForgotPasswordModal } = useForgotPasswordModal();
    const { loginUser: loginContext } = useAuth();

    const [loading, setLoading] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [form, setForm] = useState({
        identifier: "",
        password: "",
    });

    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) {
            setMounted(true);
            document.documentElement.classList.add("overflow-hidden");
        } else {
            document.documentElement.classList.remove("overflow-hidden");
        }

        return () =>
            document.documentElement.classList.remove("overflow-hidden");
    }, [isOpen]);

    // Fecha com ESC
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") closeModal();
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, closeModal]);

    const handleBackdropClick = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            if (e.target === e.currentTarget) closeModal();
        },
        [closeModal]
    );

    const resetForm = () => {
        setForm({ identifier: "", password: "" });
        setShowPassword(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (loading) return;

        setLoading(true);
        try {
            const data = await loginUser(
                form.identifier.trim(),
                form.password
            );
            loginContext(data.user, data.token);
            resetForm();
            closeModal();
        } catch (error: unknown) {
            const message =
                error instanceof Error ? error.message : "Erro ao fazer login.";
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="login-modal-title"
            onClick={handleBackdropClick}
            className={`
        fixed inset-0 z-50 flex items-center justify-center px-4
        bg-black/70 backdrop-blur-sm
        transition-opacity duration-200
        ${mounted ? "opacity-100" : "opacity-0"}
      `}
        >
            <div
                ref={modalRef}
                className={`
          relative w-full max-w-5xl bg-white rounded-lg overflow-hidden
          flex flex-col lg:flex-row shadow-xl
          transform transition-all duration-200
          ${mounted ? "scale-100 opacity-100" : "scale-95 opacity-0"}
        `}
            >
                <button
                    type="button"
                    onClick={() => {
                        resetForm();
                        closeModal();
                    }}
                    aria-label="Fechar"
                    className="absolute top-4 right-4 z-20"
                >
                    <MdClose
                        size={22}
                        className="text-gray-600 hover:text-black cursor-pointer"
                    />
                </button>

                <div className="relative w-full lg:w-1/2 h-56 sm:h-64 lg:h-[600px] bg-neutral-900">
                    <Image
                        src="https://res.cloudinary.com/dytw21kw2/image/upload/v1784326714/close-up-women-running-outdoors_m2xknv.jpg"
                        alt=""
                        fill
                        className="object-cover"
                        draggable={false}
                        priority
                    />
                </div>

                <div className="flex w-full lg:w-1/2 flex-col items-center justify-center px-6 sm:px-10 py-8 lg:py-0">
                    <Image
                        src="https://res.cloudinary.com/dytw21kw2/image/upload/v1769992768/mainLogo_xn7vua.png"
                        alt="Move+ Logo"
                        width={200}
                        height={80}
                        draggable={false}
                        className="mb-2"
                    />

                    <h2
                        id="login-modal-title"
                        className="text-md font-bold text-gray-700 mb-6"
                    >
                        Seja bem-vindo(a)!
                    </h2>

                    <form
                        onSubmit={handleSubmit}
                        className="w-full max-w-sm space-y-3"
                    >
                        <div>
                            <label htmlFor="login-identifier" className="sr-only">
                                Email
                            </label>
                            <input
                                id="login-identifier"
                                type="email"
                                placeholder="Email"
                                required
                                autoComplete="email"
                                value={form.identifier}
                                onChange={(e) =>
                                    setForm({ ...form, identifier: e.target.value })
                                }
                                className="w-full h-12 border border-gray-200 rounded-md px-3 text-orange-700 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#FF4D1C]"
                            />
                        </div>

                        <div className="relative">
                            <label htmlFor="login-password" className="sr-only">
                                Senha
                            </label>
                            <input
                                id="login-password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Senha"
                                required
                                autoComplete="current-password"
                                value={form.password}
                                onChange={(e) =>
                                    setForm({ ...form, password: e.target.value })
                                }
                                className="w-full h-12 border border-gray-200 rounded-md px-3 pr-10 text-orange-700 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#FF4D1C]"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((v) => !v)}
                                aria-label={
                                    showPassword ? "Ocultar senha" : "Mostrar senha"
                                }
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                            >
                                {showPassword ? (
                                    <FiEyeOff size={18} />
                                ) : (
                                    <FiEye size={18} />
                                )}
                            </button>
                        </div>

                        <button
                            type="button"
                            onClick={() => {
                                resetForm();
                                closeModal();
                                openForgotPasswordModal();
                            }}
                            className="text-xs text-orange-600 font-semibold cursor-pointer hover:underline text-right w-full"
                        >
                            Esqueceu a senha?
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full h-10 text-sm bg-black text-white font-bold rounded-sm transition hover:bg-gray-800 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                        >
                            {loading ? "Entrando..." : "Entrar"}
                        </button>

                        <button
                            type="button"
                            onClick={() => {
                                resetForm();
                                closeModal();
                                openRegisterModal();
                            }}
                            className="text-xs text-gray-500 text-center w-full"
                        >
                            Não tem uma conta?
                            <span className="text-orange-600 font-semibold cursor-pointer">
                                {" "}Cadastre-se
                            </span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
