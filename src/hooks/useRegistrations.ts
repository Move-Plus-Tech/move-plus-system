import { useEffect, useMemo, useRef, useState, type ChangeEvent } from "react";
import toast from "react-hot-toast";
import type { Registration, RegistrationFilters } from "@/types/registration";
import { exportRegistrations, getRegistrations } from "@/services/registrations.service";
import { formatCpf } from "@/utils/formatCpf";

const EMPTY_FILTERS: RegistrationFilters = {
  cpf: "",
  title: "",
  fullName: "",
  periodDays: "all",
};

export function useRegistrations() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<RegistrationFilters>(EMPTY_FILTERS);
  const [exporting, setExporting] = useState(false);
  const requestSequenceRef = useRef(0);

  async function loadRegistrations(nextFilters: RegistrationFilters) {
    requestSequenceRef.current += 1;
    const currentRequest = requestSequenceRef.current;

    setLoading(true);

    try {
      const data = await getRegistrations(nextFilters);
      if (currentRequest === requestSequenceRef.current) {
        setRegistrations(data);
      }
    } catch {
      if (currentRequest === requestSequenceRef.current) {
        toast.error("Erro ao buscar inscrições");
        setRegistrations([]);
      }
    } finally {
      if (currentRequest === requestSequenceRef.current) {
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    const shouldDebounceCpf = Boolean(filters.cpf);
    const timeoutId = window.setTimeout(
      () => {
        loadRegistrations(filters);
      },
      shouldDebounceCpf ? 400 : 0,
    );

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [filters.cpf]);

  const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFilters((previous) => ({
      ...previous,
      [name]: name === "cpf" ? formatCpf(value) : value,
    }));
  };

  const handlePeriodChange = (periodDays: RegistrationFilters["periodDays"]) => {
    setFilters((previous) => ({ ...previous, periodDays }));
  };

  const handleClearFilters = () => setFilters(EMPTY_FILTERS);

  const filteredRegistrations = useMemo(() => {
    return registrations.filter((registration) => {
      const normalizedFilterName = filters.fullName.trim().toLowerCase();
      const normalizedFilterTitle = filters.title.trim().toLowerCase();

      const matchesName = normalizedFilterName
        ? registration.fullName.toLowerCase().includes(normalizedFilterName)
        : true;

      const matchesTitle = normalizedFilterTitle
        ? registration.title.toLowerCase().includes(normalizedFilterTitle)
        : true;

      if (filters.periodDays === "all") {
        return matchesName && matchesTitle;
      }

      const registrationDate = new Date(registration.createdAt);
      if (Number.isNaN(registrationDate.getTime())) {
        return false;
      }

      const now = new Date();
      const minDate = new Date();
      minDate.setHours(0, 0, 0, 0);
      minDate.setDate(now.getDate() - Number(filters.periodDays));

      return matchesName && matchesTitle && registrationDate >= minDate;
    });
  }, [registrations, filters.fullName, filters.title, filters.periodDays]);

  const handleExport = async () => {
    setExporting(true);
    try {
      const { blob, filename } = await exportRegistrations(filters);
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = filename;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      URL.revokeObjectURL(url);
    } catch {
      toast.error("Erro ao exportar planilha");
    } finally {
      setExporting(false);
    }
  };

  return {
    registrations,
    filteredRegistrations,
    filters,
    loading,
    exporting,
    handleFilterChange,
    handlePeriodChange,
    handleClearFilters,
    handleExport,
  };
}
