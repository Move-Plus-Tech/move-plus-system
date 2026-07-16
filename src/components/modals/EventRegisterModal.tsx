"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/authContext";
import { X, CreditCard } from "lucide-react";
import { createCheckout } from "@/services/events";
import type { ComplementaryItem } from "@/services/events";
import { formatPhoneBR } from "@/utils/formatPhone";
import { formatDateBR } from "@/utils/formatDate";
import { formatCpf } from "@/utils/formatCpf";
import Image from "next/image";
import toast from "react-hot-toast";

interface EventRegisterModalProps {
    event: {
        id: number;
        name: string;
        price: number | string;
        distances?: string[];
        imagekitUrl: string;
        imageUrl: string;
        itemComplementarId?: number;
        complementaryItem?: ComplementaryItem;
    };
    isOpen: boolean;
    onClose?: () => void;
    onRegistered?: () => Promise<void> | void;
}

const inputStyle =
    "w-full h-11 px-3.5 text-sm bg-gray-50 border border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all placeholder:text-gray-400 text-gray-900";

const selectStyle =
    "w-full h-11 px-3.5 text-sm bg-gray-50 border border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-gray-700 cursor-pointer appearance-none";

const Field = ({
    label,
    children,
}: {
    label: string;
    children: React.ReactNode;
}) => (
    <div className="space-y-1.5">
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            {label}
        </label>
        {children}
    </div>
);

export default function EventRegisterModal({
    event,
    isOpen,
    onClose,
    onRegistered,
}: EventRegisterModalProps) {
    const { email } = useAuth();
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        email: email ?? "",
        fullName: "",
        phone: "",
        cpf: "",
        birthDate: "",
        distance: "",
        shirtSize: "",
        itemComplementarData: { tipo: "", valor: "" },
    });

    useEffect(() => {
        setForm((prev) => ({ ...prev, email: email ?? "" }));
    }, [email]);

    useEffect(() => {
        if (!isOpen) return;
        const elements = [document.body, document.documentElement];
        elements.forEach((el) => (el.style.overflow = "hidden"));
        return () => elements.forEach((el) => (el.style.overflow = "auto"));
    }, [isOpen]);

    if (!isOpen) return null;

    const onlyDigits = (s: string) => s.replace(/\D/g, "");

    const normalizeBirthDateToISO = (value: string) => {
        const digits = onlyDigits(value);
        if (digits.length !== 8) return "";
        return `${digits.slice(4, 8)}-${digits.slice(2, 4)}-${digits.slice(0, 2)}`;
    };

    function formatInputDate(value: string) {
        const digits = value.replace(/\D/g, "").slice(0, 8);
        if (!digits) return "";
        let result = digits.slice(0, 2);
        if (digits.length > 2) result += "/" + digits.slice(2, 4);
        if (digits.length > 4) result += "/" + digits.slice(4, 8);
        return result;
    }

    function parsePrice(value: number | string | null | undefined) {
        if (typeof value === "number") return Number.isFinite(value) ? value : 0;
        if (value == null) return 0;
        const raw = String(value).trim().replace(/[^\d,.-]/g, "");
        if (!raw) return 0;
        const lastComma = raw.lastIndexOf(",");
        const lastDot = raw.lastIndexOf(".");
        const sep = Math.max(lastComma, lastDot);
        if (sep === -1) { const n = Number(raw); return Number.isFinite(n) ? n : 0; }
        const intPart = raw.slice(0, sep).replace(/[,.]/g, "");
        const decPart = raw.slice(sep + 1).replace(/[,.]/g, "");
        const parsed = Number(`${intPart || "0"}.${decPart}`);
        return Number.isFinite(parsed) ? parsed : 0;
    }

    const formatCurrency = (value: number) =>
        new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

    const priceWithFee = parsePrice(event?.price);
    const basePrice = priceWithFee / 1.1;
    const includedFee = priceWithFee - basePrice;
    const distanceOptions = event.distances?.length
        ? event.distances
        : ["3 Km", "5 Km", "10 Km"];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const birthDateIso = /^\d{4}-\d{2}-\d{2}$/.test(form.birthDate)
                ? form.birthDate
                : normalizeBirthDateToISO(form.birthDate);
            const payload = {
                email: form.email,
                fullName: form.fullName,
                phone: form.phone,
                cpf: form.cpf,
                birthDate: birthDateIso || null,
                distance: form.distance,
                shirtSize: form.shirtSize,
                ...(form.itemComplementarData.tipo && form.itemComplementarData.valor && {
                    itemComplementarData: form.itemComplementarData,
                }),
            };
            const res = await createCheckout(event.id, payload);
            onRegistered?.();
            window.location.href = res.init_point;
        } catch (error: any) {
            toast.error(error?.message || "Erro ao iniciar pagamento");
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
            <div className="relative bg-white w-full max-w-[480px] max-h-[90dvh] rounded-sm shadow-xl overflow-y-auto thin-grey-scrollbar">

                <div className="sticky top-0 bg-white z-10 flex items-center justify-between px-5 py-4 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-orange-50 rounded-sm flex items-center justify-center shrink-0">
                            <CreditCard size={15} className="text-orange-500" />
                        </div>
                        <div>
                            <h2 className="text-sm font-semibold text-gray-900">Inscrição</h2>
                            <p className="text-xs text-gray-400 truncate max-w-[220px]">{event.name}</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center rounded-sm hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition cursor-pointer"
                        aria-label="Fechar"
                    >
                        <X size={16} />
                    </button>
                </div>

                <div className="mx-5 mt-4 bg-gray-50 border border-gray-100 rounded-sm px-4 py-3 flex items-center justify-between">
                    <div className="space-y-0.5">
                        <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold">Valor base</p>
                        <p className="text-sm font-semibold text-gray-700">{formatCurrency(basePrice)}</p>
                    </div>
                    <div className="w-px h-8 bg-gray-200" />
                    <div className="space-y-0.5">
                        <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold">Taxa</p>
                        <p className="text-sm font-semibold text-gray-700">{formatCurrency(includedFee)}</p>
                    </div>
                    <div className="w-px h-8 bg-gray-200" />
                    <div className="space-y-0.5 text-right">
                        <p className="text-xs text-orange-500 uppercase tracking-wide font-semibold">Total</p>
                        <p className="text-sm font-bold text-orange-500">{formatCurrency(priceWithFee)}</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="p-5 space-y-4">

                    <div className="space-y-1">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                            Dados pessoais
                        </p>
                    </div>

                    <Field label="Nome completo *">
                        <input
                            type="text"
                            placeholder="Ex: João da Silva"
                            value={form.fullName}
                            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                            className={inputStyle}
                            required
                        />
                    </Field>

                    <Field label="E-mail *">
                        <input
                            type="email"
                            value={form.email}
                            readOnly
                            className={`${inputStyle} cursor-not-allowed opacity-60`}
                        />
                    </Field>

                    <div className="grid grid-cols-2 gap-3">
                        <Field label="Telefone *">
                            <input
                                type="text"
                                placeholder="(11) 99999-9999"
                                value={formatPhoneBR(form.phone)}
                                onChange={(e) => {
                                    const digits = onlyDigits(e.target.value).slice(0, 11);
                                    setForm({ ...form, phone: digits });
                                }}
                                className={inputStyle}
                                required
                            />
                        </Field>
                        <Field label="CPF *">
                            <input
                                type="text"
                                placeholder="000.000.000-00"
                                value={formatCpf(form.cpf)}
                                onChange={(e) => {
                                    const digits = onlyDigits(e.target.value).slice(0, 11);
                                    setForm({ ...form, cpf: digits });
                                }}
                                className={inputStyle}
                                required
                            />
                        </Field>
                    </div>

                    <Field label="Data de nascimento *">
                        <input
                            type="text"
                            placeholder="DD/MM/AAAA"
                            value={
                                /^\d{4}-\d{2}-\d{2}$/.test(form.birthDate)
                                    ? formatDateBR(form.birthDate)
                                    : formatInputDate(form.birthDate)
                            }
                            onChange={(e) => {
                                const digits = e.target.value.replace(/\D/g, "").slice(0, 8);
                                setForm({
                                    ...form,
                                    birthDate: digits.length === 8 ? normalizeBirthDateToISO(digits) : digits,
                                });
                            }}
                            className={inputStyle}
                            required
                        />
                    </Field>

                    <div className="pt-1">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                            Opções do kit
                        </p>
                    </div>

                    <Field label="Distância *">
                        <div className="flex flex-wrap gap-2 pt-0.5">
                            {distanceOptions.map((distance) => (
                                <label
                                    key={distance}
                                    className={`inline-flex items-center gap-2 px-3 py-2 rounded-sm border text-xs font-semibold cursor-pointer transition-all ${form.distance === distance
                                        ? "border-orange-500 bg-orange-50 text-orange-600"
                                        : "border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300"
                                        }`}
                                >
                                    <input
                                        type="radio"
                                        name="distance"
                                        value={distance}
                                        checked={form.distance === distance}
                                        onChange={(e) => setForm({ ...form, distance: e.target.value })}
                                        className="sr-only"
                                    />
                                    {distance}
                                </label>
                            ))}
                        </div>
                    </Field>

                    <div className="space-y-2">
                        <Image
                            src={
                                event.imageUrl &&
                                    (event.imageUrl.startsWith("/") || event.imageUrl.startsWith("http"))
                                    ? event.imageUrl
                                    : "/fallback.jpg"
                            }
                            alt="Tabela de tamanhos"
                            width={400}
                            height={150}
                            quality={100}
                            className="w-full rounded-sm object-contain border border-gray-100"
                        />
                        <Image
                            src="https://res.cloudinary.com/dytw21kw2/image/upload/v1765646967/shirtSize_h3dwrb.jpg"
                            alt="Tabela de tamanhos de camiseta"
                            width={400}
                            height={150}
                            className="w-full rounded-sm object-contain border border-gray-100"
                        />
                    </div>

                    <Field label="Tamanho da camiseta *">
                        <select
                            value={form.shirtSize}
                            onChange={(e) => setForm({ ...form, shirtSize: e.target.value })}
                            className={selectStyle}
                            required
                        >
                            <option value="" disabled>Selecione o tamanho</option>
                            {["Baby look M", "P", "M", "G", "GG", "XG"].map((size) => (
                                <option key={size} value={size}>{size}</option>
                            ))}
                        </select>
                    </Field>

                    {event.complementaryItem && (
                        <Field label={`${event.complementaryItem.label} *`}>
                            <select
                                value={form.itemComplementarData.valor}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        itemComplementarData: {
                                            tipo: event.complementaryItem!.tipo,
                                            valor: e.target.value,
                                        },
                                    })
                                }
                                className={selectStyle}
                            >
                                <option value="">Selecione uma opção</option>
                                {event.complementaryItem.opções.map((opcao) => (
                                    <option key={opcao} value={opcao}>{opcao}</option>
                                ))}
                            </select>
                        </Field>
                    )}

                    <div className="pt-2 border-t border-gray-100">
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full h-11 rounded-sm text-sm font-semibold transition-all cursor-pointer ${loading
                                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                : "bg-gray-900 text-white hover:bg-gray-700"
                                }`}
                        >
                            {loading ? "Processando..." : "Prosseguir para pagamento"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}