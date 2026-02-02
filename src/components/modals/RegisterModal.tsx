"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { FiUser, FiMail, FiLock, FiPhone } from "react-icons/fi";
import { BsCardText } from "react-icons/bs";

import { useAuth } from "@/context/authContext";
import { useRegisterModal } from "@/context/registerModalContext";
import { registerUser, loginUser } from "@/services/user";

import toast from "react-hot-toast";

import { formatPhoneBR } from "@/utils/formatPhone";
import { formatCpf } from "@/utils/formatCpf";

export default function RegisterModal() {
  const { isOpen, closeModal } = useRegisterModal();
  const { loginUser: loginContext } = useAuth();

  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  const [form, setForm] = useState({
    name: "",
    cpf: "",
    email: "",
    phone: "",
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

  const onlyDigits = (s: string) => s.replace(/\D/g, "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.cpf || !form.email || !form.phone || !form.password) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    if (form.password.length < 6) {
      toast.error("A senha deve ter pelo menos 6 caracteres");
      return;
    }

    setLoading(true);

    try {
      await registerUser(form);
      toast.success("Conta criada com sucesso! 🎉");

      const loginData = await loginUser(form.email, form.password);
      loginContext(loginData.user, loginData.token);

      closeModal();
    } catch (error: any) {
      toast.error(error?.message || "Erro ao criar conta");
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
          relative w-full max-w-4xl bg-white rounded-2xl shadow-xl
          transform transition-all duration-200
          ${mounted ? "scale-100 opacity-100" : "scale-95 opacity-0"}
        `}
      >

        <button
          onClick={closeModal}
          className="absolute top-4 right-4 z-10"
        >
          <MdClose
            size={22}
            className="text-gray-500 hover:text-black cursor-pointer"
          />
        </button>


        <div className="flex flex-col lg:flex-row">

          <div className="lg:w-1/2 flex flex-col justify-center items-center px-6 py-10 bg-gray-50 rounded-t-2xl lg:rounded-l-2xl lg:rounded-tr-none">
            <Image
              src="https://res.cloudinary.com/dytw21kw2/image/upload/v1769992768/mainLogo_xn7vua.png"
              alt="Move Plus Logo"
              width={180}
              height={80}
              draggable={false}
              className="mb-4"
            />

            <h2 className="text-2xl font-bold text-gray-800 text-center">
              Crie sua conta
            </h2>

            <p className="text-sm text-gray-500 text-center mt-2 max-w-xs">
              Receba seu kit esportivo sem filas, sem estresse e direto na sua casa.
            </p>
          </div>

          <div className="lg:w-1/2 px-6 py-10">
            <form onSubmit={handleSubmit} className="w-full space-y-4">

              <div>
                <label className="text-xs font-semibold text-gray-600">
                  Nome completo
                </label>
                <div className="relative mt-1">
                  <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Seu nome"
                    onChange={(e) =>
                      setForm({ ...form, name: e.target.value })
                    }
                    className="w-full h-12 pl-10 pr-3 text-sm border border-gray-200 rounded-md
                    focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-600">
                  CPF
                </label>
                <div className="relative mt-1">
                  <BsCardText className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="000.000.000-00"
                    value={formatCpf(form.cpf)}
                    onChange={(e) => {
                      const digits = onlyDigits(e.target.value).slice(0, 11);
                      setForm({ ...form, cpf: digits });
                    }}
                    className="w-full h-12 pl-10 pr-3 text-sm border border-gray-200 rounded-md
                    focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-600">
                  Email
                </label>
                <div className="relative mt-1">
                  <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    placeholder="seu@email.com"
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    className="w-full h-12 pl-10 pr-3 text-sm border border-gray-200 rounded-md
                    focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-600">
                  Telefone
                </label>
                <div className="relative mt-1">
                  <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="(31) 99999-9999"
                    value={formatPhoneBR(form.phone)}
                    onChange={(e) => {
                      const digits = onlyDigits(e.target.value).slice(0, 11);
                      setForm({ ...form, phone: digits });
                    }}
                    className="w-full h-12 pl-10 pr-3 text-sm border border-gray-200 rounded-md
                    focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-600">
                  Senha
                </label>
                <div className="relative mt-1">
                  <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    placeholder="Mínimo 6 caracteres"
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                    className="w-full h-12 pl-10 pr-3 text-sm border border-gray-200 rounded-md
                    focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`
                  w-full cursor-pointer h-12 rounded-md font-bold text-white transition
                  ${loading
                    ? "bg-black cursor-not-allowed"
                    : "bg-black hover:bg-gray-800"}
                `}
              >
                {loading ? "Criando conta..." : "Concluir Cadastro"}
              </button>
            </form>

            <p className="text-xs text-gray-500 text-center mt-4">
              Ao se cadastrar, você concorda com nossos{" "}
              <span className="text-orange-600 font-semibold cursor-pointer">
                Termos
              </span>{" "}
              e{" "}
              <span className="text-orange-600 font-semibold cursor-pointer">
                Política de Privacidade
              </span>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
