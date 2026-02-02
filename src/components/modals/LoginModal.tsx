"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useLoginModal } from "@/context/loginModalContext";
import { useRegisterModal } from "@/context/registerModalContext";
import { useForgotPasswordModal } from "@/context/password/forgotPasswordModalContext";
import { loginUser } from "@/services/user";
import { useAuth } from "@/context/authContext";

import { MdClose } from "react-icons/md";
import toast from "react-hot-toast";

export default function LoginModal() {
    const { isOpen, closeModal } = useLoginModal();
    const { openModal: openRegisterModal } = useRegisterModal();
    const { openModal: openForgotPasswordModal } = useForgotPasswordModal();
    const { loginUser: loginContext } = useAuth();

    const [loading, setLoading] = useState(false);
    const [mounted, setMounted] = useState(false);

    const [form, setForm] = useState({
        identifier: "",
        password: "",
    });

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = await loginUser(
                form.identifier.trim(),
                form.password
            );
            loginContext(data.user, data.token);
            closeModal();
        } catch (error: any) {
            toast.error(error?.message || error);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div
            className={`
        fixed inset-0 z-50 flex items-center justify-center px-4
        bg-black/70 backdrop-blur-sm
        transition-opacity duration-200
        ${mounted ? "opacity-100" : "opacity-0"}
      `}
        >
            <div
                className={`
          relative w-full max-w-5xl bg-white rounded-xl overflow-hidden
          flex flex-col lg:flex-row shadow-xl
          transform transition-all duration-200
          ${mounted ? "scale-100 opacity-100" : "scale-95 opacity-0"}
        `}
            >
    
                <button
                    onClick={closeModal}
                    className="absolute top-4 right-4 z-20"
                >
                    <MdClose
                        size={22}
                        className="text-gray-600 hover:text-black cursor-pointer"
                    />
                </button>


                <div className="relative w-full lg:w-1/2 h-56 sm:h-64 lg:h-[600px] bg-neutral-900">
                    <Image
                        src="https://res.cloudinary.com/dytw21kw2/image/upload/v1769992443/backgroundLogin_ikjs9a.jpg"
                        alt="Login background"
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

                    <h2 className="text-lg font-bold text-gray-700 mb-6">
                        Seja bem-vindo 🟠
                    </h2>

                    <form
                        onSubmit={handleSubmit}
                        className="w-full max-w-sm space-y-3"
                    >
                        <input
                            type="text"
                            placeholder="Email"
                            onChange={(e) =>
                                setForm({ ...form, identifier: e.target.value })
                            }
                            className="w-full h-12 border border-gray-200 rounded-md px-3 text-orange-700 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-orange-500"
                        />

                        <input
                            type="password"
                            placeholder="Senha"
                            onChange={(e) =>
                                setForm({ ...form, password: e.target.value })
                            }
                            className="w-full h-12 border border-gray-200 rounded-md px-3 text-orange-700 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-orange-500"
                        />

                        <button
                            type="button"
                            onClick={() => {
                                closeModal();
                                openForgotPasswordModal();
                            }}
                            className="text-sm text-orange-600 font-semibold cursor-pointer hover:underline text-right w-full"
                        >
                            Esqueceu a senha?
                        </button>

                        <button
                            type="submit"
                            className="w-full h-12 bg-black cursor-pointer text-white font-bold rounded-md transition hover:bg-gray-800"
                        >
                            {loading ? "Entrando..." : "Entrar"}
                        </button>

                        <button
                            type="button"
                            onClick={() => {
                                closeModal();
                                openRegisterModal();
                            }}
                            className="text-sm text-gray-500 text-center w-full"
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
