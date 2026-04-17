import { useEffect, useState } from "react";
import { getEvents, createEvent, updateEvent, deleteEvent } from "@/services/events";

import type { Event } from "@/services/events";
import { Pencil, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

const initialState = {
  name: "",
  status: "Disponível",
  price: 0,
  location: "",
  time: "",
  type: "corrida",
  slots: 100,
  title: "",
  imageUrl: "",
  imagekitUrl: "",
  urlLinkAbout: "",
  about: "",
};

const Field = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div className="space-y-1">
    <label className="text-xs font-semibold text-gray-600">
      {label}
    </label>
    {children}
  </div>
);

export default function EventForm() {
  const [events, setEvents] = useState<Event[]>([]);
  const [form, setForm] = useState<typeof initialState & { id?: number }>(initialState);
  const isEditing = !!form.id;
  const [loading, setLoading] = useState(false);

  function formatInputDateTime(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 8);
    if (!digits) return "";
    let result = digits.slice(0, 2);
    if (digits.length > 2) result += "/" + digits.slice(2, 4);
    if (digits.length > 4) result += "/" + digits.slice(4, 8);
    return result;
  }

  async function loadEvents() {
    const data = await getEvents();
    setEvents(data);
  }

  useEffect(() => {
    loadEvents();
  }, []);

  function handleEdit(event: any) {
    setForm({
      ...event,
    });
  }

  async function handleDelete(id: number) {
    if (!confirm("Tem certeza que deseja deletar?")) return;

    await deleteEvent(String(id));
    loadEvents();
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    function toISODate(dateStr: string) {
      const [dd, mm, yyyy] = dateStr.split("/");
      if (!dd || !mm || !yyyy) return "";
      return `${yyyy}-${mm}-${dd}T00:00:00.000Z`;
    }

    const payload = {
      ...form,
      price: Number(form.price),
      slots: 100,
      status: form.status as "Disponível",
      time: toISODate(formatInputDateTime(form.time)),
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
      loadEvents();
    } catch (err: any) {
      console.log(form);
      toast.error("Erro ao criar kit");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle =
    "w-full h-12 px-4 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-orange-500 transition";

  return (
    <div className="max-w-7xl mx-auto mt-10 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl border border-orange-500 p-6 space-y-6"
        >

          <div className="mb-10">
            <h1 className="text-2xl font-bold text-gray-800">
              {isEditing ? "Editar Kit" : "Cadastrar Kit"}
            </h1>
            <p className="text-sm text-gray-500">
              {isEditing
                ? "Altere as informações e confirme para salvar"
                : "Preencha as informações abaixo para cadastrar um novo kit"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h2 className="text-sm font-semibold text-gray-700">
                Informações básicas
              </h2>

              <Field label="Nome do evento">
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Ex: Corrida da Serra"
                  className={inputStyle}
                  required
                />
              </Field>

              <Field label="Status">
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className={inputStyle}
                >
                  <option>Disponível</option>
                  <option>Esgotado</option>
                  <option>Em breve</option>
                  <option>Popular</option>
                </select>
              </Field>

              <Field label="Preço (R$)">
                <input
                  name="price"
                  type="number"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="Ex: 49.90"
                  className={inputStyle}
                  required
                />
              </Field>

              <Field label="Local do evento">
                <input
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="Ex: Belo Horizonte"
                  className={inputStyle}
                  required
                />
              </Field>

              <Field label="Data do evento">
                <input
                  name="time"
                  type="text"
                  placeholder="DD/MM/AAAA"
                  value={formatInputDateTime(form.time)}
                  onChange={e => {
                    const digits = e.target.value.replace(/\D/g, "").slice(0, 8);
                    setForm(prev => ({ ...prev, time: digits }));
                  }}
                  className={inputStyle}
                  required
                />
              </Field>
            </div>

            <div className="space-y-4">
              <h2 className="text-sm font-semibold text-gray-700">
                Conteúdo e mídia
              </h2>

              <Field label="Título do evento">
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Título chamativo"
                  className={inputStyle}
                  required
                />
              </Field>

              <Field label="Imagem da capa">
                <input
                  name="imageUrl"
                  value={form.imageUrl}
                  onChange={handleChange}
                  placeholder="https://..."
                  className={inputStyle}
                  required
                />
              </Field>

              <Field label="Imagem do kit">
                <input
                  name="imagekitUrl"
                  value={form.imagekitUrl}
                  onChange={handleChange}
                  placeholder="https://ik.imagekit.io/..."
                  className={inputStyle}
                  required
                />
              </Field>

              <Field label="Descrição do evento">
                <textarea
                  name="about"
                  value={form.about}
                  onChange={handleChange}
                  placeholder="Detalhes sobre o evento..."
                  className="w-full min-h-[135px] px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                  required
                />
              </Field>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full cursor-pointer h-12 rounded-xl font-semibold text-white transition ${loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-black hover:bg-gray-800"
              }`}
          >
            {loading
              ? (isEditing ? "Salvando..." : "Cadastrando kit...")
              : (isEditing ? "Salvar Alterações" : "Cadastrar Kit")}
          </button>

          {isEditing && (
            <button type="button" onClick={() => setForm(initialState)} className="w-full cursor-pointer -mt-8 h-12 rounded-xl font-semibold text-gray-700 border border-gray-300 hover:bg-gray-100 transition">
              Cancelar Edição
            </button>
          )}

        </form>

        {/* LISTA */}
        <div className="bg-white rounded-2xl border border-orange-500 p-6">
          <h2 className="text-xl font-bold mb-4">
            Kits cadastrados
          </h2>

          <div className="space-y-3 max-h-[600px] overflow-y-auto">
            {events.map((event) => (
              <div
                key={event.id}
                className="border border-gray-200 rounded-xl p-4 flex items-center justify-between hover:shadow-sm transition"
              >
                <div>
                  <p className="font-semibold">{event.name}</p>
                  <p className="text-xs text-gray-500">
                    {event.location}
                  </p>
                  <p className="text-xs text-gray-400">
                    R$ {event.price}
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleEdit(event)}
                    className="p-2 cursor-pointer hover:bg-gray-100 rounded-lg"
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    onClick={() => handleDelete(event.id)}
                    className="p-2 cursor-pointer hover:bg-red-100 text-red-600 rounded-lg"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}

            {events.length === 0 && (
              <p className="text-sm text-gray-500">
                Nenhum kit cadastrado
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}