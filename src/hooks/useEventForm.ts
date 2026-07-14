import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import {
  createEvent,
  deleteEvent,
  getEvents,
  updateEvent,
  getComplementaryItems,
  type ComplementaryItem,
} from "@/services/events";
import type { Event } from "@/services/events";
import toast from "react-hot-toast";

const initialState = {
  name: "",
  status: "Disponível" as Event["status"],
  price: "",
  distances: "",
  location: "",
  time: "",
  type: "corrida",
  slots: 100,
  title: "",
  imageUrl: "",
  imagekitUrl: "",
  urlLinkAbout: "",
  about: "",
  itemComplementarId: undefined as number | undefined,
};

export type EventFormState = typeof initialState & { id?: number };
type FormFieldElement =
  | HTMLInputElement
  | HTMLTextAreaElement
  | HTMLSelectElement;

function formatInputDateTime(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 8);
  if (!digits) return "";

  let result = digits.slice(0, 2);
  if (digits.length > 2) result += "/" + digits.slice(2, 4);
  if (digits.length > 4) result += "/" + digits.slice(4, 8);
  return result;
}

function toInputDateDigits(value: string) {
  if (!value) return "";

  const isoMatch = value.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (isoMatch) {
    const [, yyyy, mm, dd] = isoMatch;
    return `${dd}${mm}${yyyy}`;
  }

  const brMatch = value.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (brMatch) {
    const [, dd, mm, yyyy] = brMatch;
    return `${dd}${mm}${yyyy}`;
  }

  return value.replace(/\D/g, "").slice(0, 8);
}

function formatPriceInput(value: string) {
  return value.replace(/[^\d,\.]/g, "");
}

function toDatabasePrice(value: string | number) {
  const raw = String(value).replace(/[^\d,\.]/g, "");
  if (!raw) return 0;

  const lastComma = raw.lastIndexOf(",");
  const lastDot = raw.lastIndexOf(".");
  const separatorIndex = Math.max(lastComma, lastDot);
  if (separatorIndex === -1) {
    const intOnly = Number(raw);
    return Number.isFinite(intOnly) ? intOnly : 0;
  }

  const intPart = raw.slice(0, separatorIndex).replace(/[,.]/g, "");
  const decimalPart = raw.slice(separatorIndex + 1).replace(/[,.]/g, "");
  const normalized = `${intPart || "0"}.${decimalPart}`;
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
}

function parseDistances(value: string | string[] | undefined) {
  if (!value) return [];

  const source = Array.isArray(value) ? value.join(",") : value;
  return Array.from(
    new Set(
      source
        .split(/[\n,;]+/)
        .map((item) => item.trim())
        .filter(Boolean),
    ),
  );
}

function toISODate(dateStr: string) {
  const [dd, mm, yyyy] = dateStr.split("/");
  if (!dd || !mm || !yyyy) return "";
  return `${yyyy}-${mm}-${dd}T00:00:00.000Z`;
}

export function useEventForm() {
  const [events, setEvents] = useState<Event[]>([]);
  const [complementaryItems, setComplementaryItems] = useState<
    ComplementaryItem[]
  >([]);
  const [form, setForm] = useState<EventFormState>(initialState);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [eventPendingDelete, setEventPendingDelete] = useState<Event | null>(
    null,
  );
  const [deleting, setDeleting] = useState(false);
  const [selectedComplementaryItemValues, setSelectedComplementaryItemValues] =
    useState<Record<string, string>>({});

  const isEditing = !!form.id;
  const formattedTime = formatInputDateTime(form.time);
  const filteredEvents = events.filter(
    (event) =>
      event.name.toLowerCase().includes(search.toLowerCase()) ||
      event.location?.toLowerCase().includes(search.toLowerCase()),
  );

  const stats = {
    total: events.length,
    available: events.filter((event) => event.status === "Disponível").length,
    upcoming: events.filter((event) => event.status === "Em Breve").length,
    popular: events.filter((event) => event.status === "Popular").length,
    soldOut: events.filter((event) => event.status === "Esgotado").length,
  };

  const selectedItem = complementaryItems.find(
    (item) => item.id === form.itemComplementarId,
  );

  async function loadEvents() {
    const data = await getEvents();
    setEvents(data);
  }

  async function loadComplementaryItems() {
    try {
      const data = await getComplementaryItems();
      setComplementaryItems(data);
    } catch {
      toast.error("Erro ao buscar itens complementares");
    }
  }

  useEffect(() => {
    loadEvents();
    loadComplementaryItems();
  }, []);

  function openCreateForm() {
    setForm(initialState);
    setShowForm(true);
  }

  function handleEdit(event: Event) {
    setForm({
      ...event,
      price: event.price != null ? String(event.price) : "",
      distances: parseDistances(event.distances).join(", "),
      time: toInputDateDigits(event.time),
      itemComplementarId: event.itemComplementarId,
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleRequestDelete(event: Event) {
    setEventPendingDelete(event);
  }

  function closeDeleteModal() {
    setEventPendingDelete(null);
  }

  async function handleDeleteConfirm() {
    if (!eventPendingDelete?.id) return;

    setDeleting(true);
    try {
      await deleteEvent(String(eventPendingDelete.id));
      await loadEvents();
      toast.success("Kit removido.");
      closeDeleteModal();
    } catch {
      toast.error("Erro ao remover kit.");
    } finally {
      setDeleting(false);
    }
  }

  function handleCancel() {
    setForm(initialState);
    setShowForm(false);
  }

  function handleChange(e: ChangeEvent<FormFieldElement>) {
    const { name, value } = e.target;
    if (name === "price") {
      setForm((prev) => ({ ...prev, price: formatPriceInput(value) }));
      return;
    }

    if (name === "itemComplementarId") {
      const itemId = value ? Number(value) : undefined;
      setForm((prev) => ({ ...prev, itemComplementarId: itemId }));
      setSelectedComplementaryItemValues({});
      return;
    }

    if (name.startsWith("complementaryField_")) {
      const fieldName = name.replace("complementaryField_", "");
      setSelectedComplementaryItemValues((prev) => ({
        ...prev,
        [fieldName]: value,
      }));
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleTimeChange(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 8);
    setForm((prev) => ({ ...prev, time: digits }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...form,
      price: toDatabasePrice(form.price),
      distances: parseDistances(form.distances),
      slots: 100,
      status: form.status,
      time: toISODate(formatInputDateTime(form.time)),
      itemComplementarId: form.itemComplementarId,
    };

    try {
      if (isEditing) {
        const { id, ...data } = payload;
        await updateEvent(id!, data);
        toast.success("Kit atualizado com sucesso!");
      } else {
        const { id, ...data } = payload;
        await createEvent(data);
        toast.success("Kit criado com sucesso!");
      }

      setForm(initialState);
      setShowForm(false);
      setSelectedComplementaryItemValues({});
      await loadEvents();
    } catch {
      toast.error("Erro ao salvar kit");
    } finally {
      setLoading(false);
    }
  }

  return {
    deleting,
    eventPendingDelete,
    events,
    filteredEvents,
    form,
    formattedTime,
    handleCancel,
    handleChange,
    handleDeleteConfirm,
    handleEdit,
    handleRequestDelete,
    handleSubmit,
    handleTimeChange,
    isEditing,
    loading,
    openCreateForm,
    closeDeleteModal,
    search,
    setSearch,
    showForm,
    stats,
    complementaryItems,
    selectedItem,
    selectedComplementaryItemValues,
  };
}
