import { getToken } from "@/services/auth";
import type { RegistrationFilters, RegistrationResponseItem } from "@/types/registration";

const API_BASE_URL = "/api";

function buildQueryParams(filters: RegistrationFilters) {
  const params = new URLSearchParams();
  const normalizedCpf = filters.cpf.replace(/\D/g, "");

  if (normalizedCpf) {
    params.set("cpf", normalizedCpf);
  }

  return params;
}

function buildHeaders() {
  const token = getToken();

  return {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export async function getRegistrations(
  filters: RegistrationFilters,
): Promise<RegistrationResponseItem[]> {
  const params = buildQueryParams(filters);
  const query = params.toString();
  const url = `${API_BASE_URL}/registrations${query ? `?${query}` : ""}`;

  const response = await fetch(url, {
    method: "GET",
    headers: buildHeaders(),
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar inscrições");
  }

  return response.json();
}

export async function exportRegistrations(filters: RegistrationFilters) {
  const params = buildQueryParams(filters);
  const query = params.toString();
  const url = `${API_BASE_URL}/registrations/export${query ? `?${query}` : ""}`;

  const response = await fetch(url, {
    method: "GET",
    headers: buildHeaders(),
  });

  if (!response.ok) {
    throw new Error("Erro ao exportar inscrições");
  }

  const blob = await response.blob();
  const contentDisposition = response.headers.get("content-disposition") || "";
  const filenameMatch = contentDisposition.match(/filename\*=UTF-8''([^;]+)|filename=\"?([^\";]+)\"?/i);
  const rawFilename = filenameMatch?.[1] || filenameMatch?.[2] || "inscricoes.xlsx";
  const filename = decodeURIComponent(rawFilename);

  return { blob, filename };
}