"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/authContext";
import { MdClose } from "react-icons/md";
import { createCheckout } from "@/services/events";
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
    };
    isOpen: boolean;
    onClose?: () => void;
    onRegistered?: () => Promise<void> | void;
}

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
    });

    useEffect(() => {
        setForm((prev) => ({ ...prev, email: email ?? "" }));
    }, [email]);

    useEffect(() => {
        if (!isOpen) return;

        const root =
            document.getElementById("__next") ||
            document.getElementById("root");

        const elements = [document.body, document.documentElement, root];

        elements.forEach((el) => {
            if (el) {
                el.style.overflow = "hidden";
            }
        });

        return () => {
            elements.forEach((el) => {
                if (el) {
                    el.style.overflow = "auto";
                }
            });
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const onlyDigits = (s: string) => s.replace(/\D/g, "");

    function formatInputDate(value: string) {
        const digits = value.replace(/\D/g, "").slice(0, 8);
        if (!digits) return "";

        let result = digits.slice(0, 2);
        if (digits.length > 2) result += "/" + digits.slice(2, 4);
        if (digits.length > 4) result += "/" + digits.slice(4, 8);
        return result;
    }

    const formatCurrency = (value: number) =>
        new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(value);

    function parsePrice(value: number | string | null | undefined) {
        if (typeof value === "number") return Number.isFinite(value) ? value : 0;
        if (value == null) return 0;

        const raw = String(value).trim().replace(/[^\d,.-]/g, "");
        if (!raw) return 0;

        const lastComma = raw.lastIndexOf(",");
        const lastDot = raw.lastIndexOf(".");
        const separatorIndex = Math.max(lastComma, lastDot);

        if (separatorIndex === -1) {
            const parsedInt = Number(raw);
            return Number.isFinite(parsedInt) ? parsedInt : 0;
        }

        const intPart = raw.slice(0, separatorIndex).replace(/[,.]/g, "");
        const decimalPart = raw.slice(separatorIndex + 1).replace(/[,.]/g, "");
        const normalized = `${intPart || "0"}.${decimalPart}`;
        const parsed = Number(normalized);

        return Number.isFinite(parsed) ? parsed : 0;
    }

    const priceWithFee = parsePrice(event?.price);
    const feePercentage = 0.1;
    const basePrice = priceWithFee / (1 + feePercentage);
    const includedFee = priceWithFee - basePrice;
    const distanceOptions = event.distances?.length
        ? event.distances
        : ["3 Km", "5 Km", "10 Km"];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const digits = onlyDigits(form.birthDate);
            const toISO = (d: string) =>
                `${d.slice(4, 8)}-${d.slice(2, 4)}-${d.slice(0, 2)}`;

            const payload = {
                ...form,
                birthDate: digits.length === 8 ? toISO(digits) : form.birthDate,
            };

            const res = await createCheckout(event.id, payload);
            onRegistered?.();
            window.location.href = res.init_point;
        } catch (error: any) {
            toast.error(error?.message || "Erro ao iniciar pagamento");
            setLoading(false);
        }
    };

    const handleClose = () => onClose?.();

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
            <div
                className="
          relative bg-white
          w-full max-w-[414px] md:max-w-[600px]
          max-h-[90dvh]
          rounded-sm shadow-xl
          px-6 py-5
          overflow-y-auto thin-grey-scrollbar
        "
            >
                <button
                    onClick={handleClose}
                    className="sticky top-0 ml-auto block text-black z-50 hover:bg-gray-100 cursor-pointer p-1 rounded-full transition"
                    aria-label="Fechar"
                >
                    <MdClose size={20} />
                </button>

                <h1 className="text-lg font-bold text-gray-900 text-center mt-2">
                    Inscrição - {event.name}
                </h1>

                <p className="text-xs text-black/60 text-center">
                    Preencha os campos obrigatórios para completar sua inscrição.
                </p>

                <div className="mx-auto flex text-sm text-black items-center justify-center text-center w-[90%] mt-3 bg-gray-100 px-4 py-2 rounded-md">
                    <span className="font-bold">Valor:</span> {formatCurrency(basePrice)} +{" "}
                    <span className="font-bold">Taxa:</span> {formatCurrency(includedFee)} —{" "}
                    <span className="font-bold text-[#db5614]">
                        Total: {formatCurrency(priceWithFee)}
                    </span>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col items-center gap-3 mt-4"
                >
                    <input
                        type="text"
                        placeholder="Nome completo *"
                        value={form.fullName}
                        onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                        className="w-[90%] text-sm text-gray-900 placeholder:text-black/40 h-10 border border-gray-200 outline-none rounded-md px-3"
                    />
                    <input
                        type="email"
                        placeholder="Email *"
                        value={form.email}
                        readOnly
                        className="w-[90%] text-sm text-gray-900 placeholder:text-black/40 h-10 border border-gray-200 outline-none rounded-md px-3 cursor-not-allowed"
                    />
                    <input
                        type="text"
                        placeholder="Telefone *"
                        value={formatPhoneBR(form.phone)}
                        onChange={(e) => {
                            const digits = onlyDigits(e.target.value).slice(0, 11);
                            setForm({ ...form, phone: digits });
                        }}
                        className="w-[90%] text-sm text-gray-900 placeholder:text-black/40 h-10 border border-gray-200 outline-none rounded-md px-3"
                    />
                    <input
                        type="text"
                        placeholder="CPF *"
                        value={formatCpf(form.cpf)}
                        onChange={(e) => {
                            const digits = onlyDigits(e.target.value).slice(0, 11);
                            setForm({ ...form, cpf: digits });
                        }}
                        className="w-[90%] text-sm text-gray-900 placeholder:text-black/40 h-10 border border-gray-200 outline-none rounded-md px-3"
                    />
                    <input
                        type="text"
                        placeholder="Data de nascimento *"
                        value={
                            /^\d{4}-\d{2}-\d{2}$/.test(form.birthDate)
                                ? formatDateBR(form.birthDate)
                                : formatInputDate(form.birthDate)
                        }
                        onChange={(e) => {
                            const digits = e.target.value.replace(/\D/g, "").slice(0, 8);
                            if (digits.length === 8) {
                                const iso = `${digits.slice(4, 8)}-${digits.slice(2, 4)}-${digits.slice(0, 2)}`;
                                setForm({ ...form, birthDate: iso });
                            } else {
                                setForm({ ...form, birthDate: digits });
                            }
                        }}
                        className="w-[90%] text-sm text-gray-900 placeholder:text-black/40 h-10 border border-gray-200 outline-none rounded-md px-3"
                    />

                    <div className="w-[90%] py-3 flex gap-2 flex-wrap">
                        <span className="w-full text-sm text-gray-700">Distância *</span>
                        {distanceOptions.map((distance) => (
                            <label key={distance} className="inline-flex cursor-pointer items-center gap-2 text-sm text-gray-800">
                                <input
                                    type="radio"
                                    name="distance"
                                    value={distance}
                                    checked={form.distance === distance}
                                    onChange={(e) => setForm({ ...form, distance: e.target.value })}
                                    style={{ accentColor: "#db5614" }}
                                    className="w-4 h-4 cursor-pointer"
                                />
                                {distance}
                            </label>
                        ))}
                    </div>

                    <Image
                        src={event.imageUrl && (event.imageUrl.startsWith("/") || event.imageUrl.startsWith("http")) ? event.imageUrl : "/fallback.jpg"} alt="Tabela de tamanhos de camisetas"
                        width={400}
                        height={150}
                        quality={100}
                        className="mb-2 w-full max-w-[90%] rounded-md object-contain"
                    />
                    <Image
                        src="https://res.cloudinary.com/dytw21kw2/image/upload/v1765646967/shirtSize_h3dwrb.jpg"
                        alt="Tabela de tamanhos de camisetas"
                        width={400}
                        height={150}
                        className="mb-2 w-full max-w-[90%] rounded-md object-contain"
                    />

                    <select
                        value={form.shirtSize}
                        onChange={(e) => setForm({ ...form, shirtSize: e.target.value })}
                        className="w-[90%] text-sm h-10 px-4 text-gray-900 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none cursor-pointer"
                    >
                        <option value="" disabled>
                            Selecione o tamanho *
                        </option>
                        {["Baby look M", "P", "M", "G", "GG", "XG"].map((size) => (
                            <option key={size} value={size}>
                                {size}
                            </option>
                        ))}
                    </select>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-[90%] text-sm h-10 font-bold rounded-sm mt-4 ${loading
                                ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                                : "bg-black text-white hover:bg-orange-600 hover:text-black transition-all duration-200 ease-[cubic-bezier(0.2,0.8,0.2,1)] transform-gpu hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] cursor-pointer"
                            }`}
                    >
                        {loading ? "Processando" : "Prosseguir para pagamento"}
                    </button>
                </form>
            </div>
        </div>
    );
}
