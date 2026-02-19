"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/authContext";
import { updateUser } from "@/services/user";

import { MdClose, MdEdit, MdSave, MdVerified } from "react-icons/md";
import { FiUser, FiMail, FiPhone, FiCalendar } from "react-icons/fi";
import { BsCardText } from "react-icons/bs";

import toast from "react-hot-toast";
import { formatDateBR } from "@/utils/formatDate";

import { formatPhoneBR } from "@/utils/formatPhone";
import { formatCpf } from "@/utils/formatCpf";


export default function UserProfileModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { user, token, loginUser } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(user);

  useEffect(() => {
    if (isOpen && user) {
      setData(user);
    }
  }, [isOpen, user]);

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      document.documentElement.classList.add("overflow-hidden");
    } else {
      document.documentElement.classList.remove("overflow-hidden");
    }
    return () => document.documentElement.classList.remove("overflow-hidden");
  }, [isOpen]);

  const onlyDigits = (s: string) => s.replace(/\D/g, "");

  async function handleUpdate(event: React.FormEvent) {
    event.preventDefault();
    if (!data || !data.id) {
      toast.error("Erro ao atualizar perfil: ID do usuário não disponível.");
      return;
    }

    setLoading(true);
    try {
      const updated = await updateUser(data.id, data);
      toast.success("Perfil atualizado com sucesso!");
      loginUser(updated, token || "");
    } catch (error) {
      toast.error("Erro ao atualizar perfil.");
    } finally {
      setLoading(false);
      setIsEditing(false);
    }
  }
  
  if (!isOpen) return null;
  if (!data) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 h-screen overflow-hidden">

      <div
        className={`relative w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-200 ${mounted ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
      >

        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 hover:bg-gray-100 rounded-full transition cursor-pointer"
        >
          <MdClose size={22} className="text-gray-500 hover:text-black" />
        </button>

        <div className="flex flex-col lg:flex-row">

          {/* COLUNA ESQUERDA: PERFIL & STATUS */}
          <div className="lg:w-1/3 flex flex-col justify-center items-center px-6 py-10 bg-gray-50 border-b lg:border-b-0 lg:border-r border-gray-100">
            <div className="relative mb-4 group">
              <div className="w-28 h-28 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-4xl shadow-lg ring-2 ring-white">
                {data?.name ? data.name.charAt(0) : "?"}
              </div>
              <div className="absolute bottom-1 right-1 bg-green-500 w-6 h-6 rounded-full flex items-center justify-center" title="Conta Verificada">
                <MdVerified size={16} className="text-white" />
              </div>
            </div>

            <h2 className="text-xl font-bold text-gray-800 text-center leading-tight">
              {data?.name || ""}
            </h2>

            <div className="flex items-center gap-1 mt-2 text-gray-500">
              <FiCalendar size={14} />
              <span className="text-[10px] uppercase font-bold tracking-widest">Desde {formatDateBR(data?.createdAt || "")}</span>
            </div>

            <button
              onClick={() => setIsEditing(!isEditing)}
              className="mt-8 flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-full text-xs font-semibold text-gray-700 hover:bg-white hover:shadow-sm transition cursor-pointer"
            >
              <MdEdit size={16} className="text-orange-500" />
              {isEditing ? "Cancelar Edição" : "Editar Perfil"}
            </button>
          </div>

          {/* COLUNA DIREITA: FORMULÁRIO */}
          <div className="lg:w-2/3 px-8 py-10">
            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-800">Meus Dados</h3>
              <p className="text-sm text-gray-500">Gerencie suas informações de contato e segurança.</p>
            </div>

            <form onSubmit={handleUpdate} className="space-y-4">

              {/* Nome */}
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Nome Completo</label>
                <div className="relative mt-1">
                  <FiUser className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${isEditing ? "text-orange-500" : "text-gray-400"}`} />
                  <input
                    disabled={!isEditing}
                    type="text"
                    value={data?.name || ""}
                    onChange={(e) => setData({ ...data, name: e.target.value })}
                    className="w-full h-12 pl-10 pr-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 disabled:bg-gray-50 disabled:text-gray-500 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* CPF */}
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">CPF</label>
                  <div className="relative mt-1">
                    <BsCardText className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      disabled
                      type="text"
                      value={data?.cpf ? formatCpf(data.cpf) : ""}
                      className="w-full h-12 pl-10 pr-3 text-sm border border-gray-200 rounded-lg bg-gray-100 text-gray-400 cursor-not-allowed"
                    />
                  </div>
                </div>

                {/* Telefone */}
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">WhatsApp / Celular</label>
                  <div className="relative mt-1">
                    <FiPhone className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${isEditing ? "text-orange-500" : "text-gray-400"}`} />
                    <input
                      disabled={!isEditing}
                      type="text"
                      value={data?.phone ? formatPhoneBR(data.phone) : ""}
                      onChange={(e) => setData({ ...data, phone: onlyDigits(e.target.value).slice(0, 11) })}
                      className="w-full h-12 pl-10 pr-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 disabled:bg-gray-50 disabled:text-gray-500 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">E-mail</label>
                <div className="relative mt-1">
                  <FiMail className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${isEditing ? "text-orange-500" : "text-gray-400"}`} />
                  <input
                    disabled={!isEditing}
                    type="email"
                    value={data?.email || ""}
                    onChange={(e) => setData({ ...data, email: e.target.value })}
                    className="w-full h-12 pl-10 pr-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 disabled:bg-gray-50 disabled:text-gray-500 transition-all"
                  />
                </div>
              </div>

              {/* BOTÕES DE AÇÃO */}
              {isEditing && (
                <div className="pt-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 h-8 bg-black hover:bg-gray-800 text-white text-xs font-bold rounded-md transition-all shadow-md active:scale-[0.98] disabled:opacity-70 cursor-pointer"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <MdSave size={18} />
                        Salvar Alterações
                      </>
                    )}
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}