import { CreditCard, X } from "lucide-react";
import { useEffect } from "react";
import type { Registration } from "@/types/registration";
import { formatCpf } from "@/utils/formatCpf";
import { formatDateBR } from "@/utils/formatDate";

type RegistrationDetailsModalProps = {
  isOpen: boolean;
  registration: Registration | null;
  onClose: () => void;
};

const inputStyle =
  "w-full h-11 px-3.5 text-sm bg-gray-50 border border-gray-200 rounded-sm focus:outline-none text-gray-900";

const textareaStyle =
  "w-full min-h-[90px] px-3.5 py-3 text-sm bg-gray-50 border border-gray-200 rounded-sm focus:outline-none text-gray-900 resize-none";

function formatDateTime(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
        {label}
      </label>
      {children}
    </div>
  );
}

export default function RegistrationDetailsModal({
  isOpen,
  registration,
  onClose,
}: RegistrationDetailsModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const elements = [document.body, document.documentElement];
    elements.forEach((el) => {
      el.style.overflow = "hidden";
    });

    return () => {
      elements.forEach((el) => {
        el.style.overflow = "auto";
      });
    };
  }, [isOpen]);

  if (!isOpen || !registration) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="relative bg-white w-full max-w-[560px] max-h-[90dvh] rounded-sm shadow-xl overflow-y-auto thin-grey-scrollbar">
        <div className="sticky top-0 bg-white z-10 flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-orange-50 rounded-sm flex items-center justify-center shrink-0">
              <CreditCard size={15} className="text-[#FF4D1C]" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-gray-900">Detalhes da inscrição</h2>
              <p className="text-xs text-gray-400 truncate max-w-[260px]">{registration.title}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-sm hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition cursor-pointer"
            aria-label="Fechar"
          >
            <X size={16} />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
            Dados da API
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Evento">
              <input value={registration.title} readOnly className={inputStyle} />
            </Field>

            <Field label="Event ID">
              <input value={registration.eventId} readOnly className={inputStyle} />
            </Field>

            <Field label="Nome completo">
              <input value={registration.fullName} readOnly className={inputStyle} />
            </Field>

            <Field label="CPF">
              <input value={formatCpf(registration.cpf)} readOnly className={inputStyle} />
            </Field>

            <Field label="Data de nascimento">
              <input
                value={registration.birthDate ? formatDateBR(registration.birthDate) : "-"}
                readOnly
                className={inputStyle}
              />
            </Field>

            <Field label="Distância">
              <input value={registration.distance} readOnly className={inputStyle} />
            </Field>

            <Field label="Tamanho da camiseta">
              <input value={registration.shirtSize} readOnly className={inputStyle} />
            </Field>

            <Field label="Preço">
              <input value={formatCurrency(Number(registration.price) || 0)} readOnly className={inputStyle} />
            </Field>

            <Field label="Local">
              <input value={registration.location} readOnly className={inputStyle} />
            </Field>

            <Field label="Criado em">
              <input value={formatDateTime(registration.createdAt)} readOnly className={inputStyle} />
            </Field>
          </div>

          <Field label="Item complementar">
            <textarea
              value={registration.itemComplementarData || "-"}
              readOnly
              className={textareaStyle}
            />
          </Field>
        </div>
      </div>
    </div>
  );
}
