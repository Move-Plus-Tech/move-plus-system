import type { ChangeEvent } from "react";
import {
  CreditCard,
  Download,
  FileSpreadsheet,
  FileText,
  MapPin,
  Package,
  Ruler,
  Shirt,
  UserRound,
  X,
} from "lucide-react";
import type { Registration, RegistrationFilters } from "@/types/registration";
import { formatCpf } from "@/utils/formatCpf";

const inputStyle =
  "w-full h-10 pl-9 pr-3 text-sm bg-gray-50 border border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#FF4D1C]/20 focus:border-[#FF4D1C] transition-all placeholder:text-gray-400";

export function RegistrationsPageHeader({
  title,
  description,
  count,
}: {
  title: string;
  description: string;
  count: number;
}) {
  return (
    <div className="flex items-start sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
          {title}
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
          {description} <span className="text-gray-400">({count})</span>
        </p>
      </div>
    </div>
  );
}

export function ExportSpreadsheetButton({
  onExport,
  exporting,
  disabled = false,
}: {
  onExport: () => void;
  exporting: boolean;
  disabled?: boolean;
}) {
  const isDisabled = exporting || disabled;

  return (
    <button
      type="button"
      onClick={onExport}
      disabled={isDisabled}
      className={`inline-flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 text-sm font-semibold rounded-sm transition-colors shadow-sm cursor-pointer ${
        isDisabled
          ? "bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200"
          : "bg-white border border-gray-200 hover:bg-gray-50 text-gray-700"
      }`}
    >
      {exporting ? <Download size={16} className="animate-pulse" /> : <FileSpreadsheet size={16} />}
      <span className="hidden sm:inline">{exporting ? "Exportando..." : "Exportar planilha"}</span>
      <span className="sm:hidden">{exporting ? "..." : "Exportar"}</span>
    </button>
  );
}

export function RegistrationsFiltersBar({
  filters,
  onChange,
  onPeriodChange,
  onClear,
}: {
  filters: RegistrationFilters;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onPeriodChange: (periodDays: RegistrationFilters["periodDays"]) => void;
  onClear: () => void;
}) {
  const hasActiveFilters = Boolean(
    filters.cpf ||
      filters.title ||
      filters.fullName ||
      filters.periodDays !== "all",
  );

  const periodOptions: Array<{ label: string; value: RegistrationFilters["periodDays"] }> = [
    { label: "Ultimos 90 dias", value: "90" },
    { label: "Ultimos 60 dias", value: "60" },
    { label: "Ultimos 30 dias", value: "30" },
    { label: "Todos", value: "all" },
  ];

  return (
    <div className="flex flex-col gap-3 px-4 sm:px-6 py-4 border-b border-gray-100">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <div className="relative w-full">
          <CreditCard size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            name="cpf"
            value={filters.cpf}
            onChange={onChange}
            placeholder="Filtrar por CPF"
            maxLength={14}
            className={inputStyle}
          />
        </div>

        <div className="relative w-full">
          <FileText size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            name="title"
            value={filters.title}
            onChange={onChange}
            placeholder="Filtrar por nome do evento"
            className={inputStyle}
          />
        </div>

        <div className="relative w-full">
          <UserRound size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            name="fullName"
            value={filters.fullName}
            onChange={onChange}
            placeholder="Filtrar por nome da pessoa"
            className={inputStyle}
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {periodOptions.map((option) => {
          const isActive = filters.periodDays === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onPeriodChange(option.value)}
              className={`px-3 py-2 text-xs font-semibold rounded-sm border transition cursor-pointer ${
                isActive
                  ? "bg-gray-900 border-gray-900 text-white"
                  : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              {option.label}
            </button>
          );
        })}

        {hasActiveFilters && (
          <button
            type="button"
            onClick={onClear}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-gray-600 transition cursor-pointer sm:ml-1"
          >
            <X size={13} /> Limpar filtros
          </button>
        )}
      </div>
    </div>
  );
}

export function EmptyRegistrationsState({ hasFilters }: { hasFilters: boolean }) {
  return (
    <div className="py-16 text-center">
      <Package size={32} className="mx-auto text-gray-300 mb-3" />
      <p className="text-sm text-gray-400">
        {hasFilters
          ? "Nenhuma inscrição encontrada para esse filtro."
          : "Nenhuma inscrição cadastrada ainda."}
      </p>
    </div>
  );
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("pt-BR");
}

function formatPrice(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function RegistrationListItem({
  registration,
  onClick,
}: {
  registration: Registration;
  onClick?: () => void;
}) {
  const initial = registration.fullName.trim().charAt(0).toUpperCase() || "?";

  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full text-left flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 sm:px-6 py-4 hover:bg-gray-50/60 transition-colors cursor-pointer"
    >
      <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
        <div className="w-9 h-9 bg-[#FF4D1C] rounded-sm flex items-center justify-center text-white font-semibold text-sm shrink-0">
          {initial}
        </div>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm font-semibold text-gray-900 truncate">{registration.fullName}</p>
            <span className="text-xs text-gray-400">{formatCpf(registration.cpf)}</span>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-0.5">
            <span className="text-xs text-gray-500">{registration.title}</span>
            <span className="flex items-center gap-1 text-xs text-gray-400">
              <MapPin size={11} /> {registration.location}
            </span>
            <span className="flex items-center gap-1 text-xs text-gray-400">
              <Ruler size={11} /> {registration.distance}
            </span>
            <span className="flex items-center gap-1 text-xs text-gray-400">
              <Shirt size={11} /> {registration.shirtSize}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 sm:gap-6 shrink-0 pl-12 sm:pl-0">
        <span className="text-xs text-gray-400">{formatDate(registration.createdAt)}</span>
        <span className="text-sm font-semibold text-gray-800">{formatPrice(registration.price)}</span>
      </div>
    </button>
  );
}
