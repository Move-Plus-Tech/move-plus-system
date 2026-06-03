import { useEventForm } from "@/hooks/useEventForm";
import DeleteEventModal from "./DeleteEventModal";
import {
  Pencil,
  Trash2,
  Plus,
  X,
  MapPin,
  CalendarDays,
  DollarSign,
  Layers,
  Search,
  Tag,
  Image,
  FileText,
  Link,
  ChevronRight,
  Package,
  TrendingUp,
  CheckCircle2,
  Clock,
} from "lucide-react";

const STATUS_CONFIG: Record<string, { label: string; color: string; dot: string }> = {
  "Disponível": {
    label: "Disponível",
    color: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    dot: "bg-emerald-500",
  },
  "Esgotado": {
    label: "Esgotado",
    color: "bg-red-50 text-red-700 border border-red-200",
    dot: "bg-red-500",
  },
  "Em Breve": {
    label: "Em Breve",
    color: "bg-amber-50 text-amber-700 border border-amber-200",
    dot: "bg-amber-500",
  },
  "Popular": {
    label: "Popular",
    color: "bg-blue-50 text-blue-700 border border-blue-200",
    dot: "bg-blue-500",
  },
};

function StatusBadge({ status }: { status: string }) {
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG["Disponível"];
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${cfg.color}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}

const Field = ({
  label,
  icon,
  children,
}: {
  label: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) => (
  <div className="space-y-1.5">
    <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">
      {icon && <span className="text-gray-400">{icon}</span>}
      {label}
    </label>
    {children}
  </div>
);

const inputStyle =
  "w-full h-11 px-3.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all placeholder:text-gray-400";

const textareaStyle =
  "w-full px-3.5 py-3 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all placeholder:text-gray-400 resize-none";

export default function EventForm() {
  const {
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
  } = useEventForm();

  return (
    <div className="min-h-screen bg-gray-50/60">
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              Painel de Administrador
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Cadastre, edite e monitore todos os kits de evento
            </p>
          </div>
          {!showForm && (
            <button
              onClick={openCreateForm}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-sm transition-colors shadow-sm cursor-pointer"
            >
              <Plus size={16} />
              Novo Kit
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total de kits", value: stats.total, icon: <Package size={18} />, color: "text-gray-600 bg-gray-100" },
            { label: "Disponíveis", value: stats.available, icon: <CheckCircle2 size={18} />, color: "text-emerald-600 bg-emerald-50" },
            { label: "Populares", value: stats.popular, icon: <TrendingUp size={18} />, color: "text-blue-600 bg-blue-50" },
            { label: "Esgotados", value: stats.soldOut, icon: <Clock size={18} />, color: "text-red-600 bg-red-50" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-sm border border-gray-100 p-5 flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {showForm && (
          <div className="bg-white rounded-sm border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-orange-50 rounded-sm flex items-center justify-center">
                  {isEditing ? <Pencil size={15} className="text-orange-500" /> : <Plus size={15} className="text-orange-500" />}
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-gray-900">
                    {isEditing ? "Editar Kit" : "Novo Kit"}
                  </h2>
                  <p className="text-xs text-gray-400">
                    {isEditing ? "Altere as informações e salve" : "Preencha os campos abaixo"}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleCancel}
                className="w-8 h-8 flex items-center justify-center rounded-sm hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                <div className="space-y-4">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                    Informações básicas
                  </p>

                  <Field label="Nome do evento" icon={<Tag size={12} />}>
                    <input name="name" value={form.name} onChange={handleChange}
                      placeholder="Ex: Corrida da Serra" className={inputStyle} required />
                  </Field>

                  <Field label="Título do evento" icon={<FileText size={12} />}>
                    <input name="title" value={form.title} onChange={handleChange}
                      placeholder="Título chamativo" className={inputStyle} required />
                  </Field>

                  <Field label="Local" icon={<MapPin size={12} />}>
                    <input name="location" value={form.location} onChange={handleChange}
                      placeholder="Ex: Belo Horizonte" className={inputStyle} required />
                  </Field>

                  <Field label="Data" icon={<CalendarDays size={12} />}>
                    <input
                      name="time"
                      type="text"
                      placeholder="DD/MM/AAAA"
                      value={formattedTime}
                      onChange={(e) => handleTimeChange(e.target.value)}
                      className={inputStyle}
                      required
                    />
                  </Field>
                </div>

                <div className="space-y-4">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                    Detalhes do Kit
                  </p>

                  <Field label="Status">
                    <select name="status" value={form.status} onChange={handleChange}
                      className={inputStyle}>
                      <option>Disponível</option>
                      <option>Esgotado</option>
                      <option>Em Breve</option>
                      <option>Popular</option>
                    </select>
                  </Field>

                  <Field label="Preço (R$)" icon={<DollarSign size={12} />}>
                    <input name="price" type="text" inputMode="decimal"
                      value={form.price} onChange={handleChange}
                      placeholder="Ex: 49.90" className={inputStyle} required />
                  </Field>

                  <Field label="Distâncias" icon={<Layers size={12} />}>
                    <input name="distances" type="text"
                      value={form.distances} onChange={handleChange}
                      placeholder="Ex: 3 Km, 5 Km, 10 Km" className={inputStyle} required />
                  </Field>

                  <Field label="Descrição">
                    <textarea name="about" value={form.about} onChange={handleChange}
                      placeholder="Detalhes sobre o evento..."
                      className={`${textareaStyle} h-[107px]`} required />
                  </Field>
                </div>

                {/* Col 3 — Mídia */}
                <div className="space-y-4">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                    Mídia
                  </p>

                  <Field label="Imagem da capa" icon={<Image size={12} />}>
                    <input name="imageUrl" value={form.imageUrl} onChange={handleChange}
                      placeholder="https://..." className={inputStyle} required />
                  </Field>

                  <Field label="Imagem do kit" icon={<Image size={12} />}>
                    <input name="imagekitUrl" value={form.imagekitUrl} onChange={handleChange}
                      placeholder="https://ik.imagekit.io/..." className={inputStyle} required />
                  </Field>

                  <Field label="Link sobre o evento" icon={<Link size={12} />}>
                    <input name="urlLinkAbout" value={form.urlLinkAbout} onChange={handleChange}
                      placeholder="https://..." className={inputStyle} />
                  </Field>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 mt-8 pt-6 border-t border-gray-100">
                <button
                  type="submit"
                  disabled={loading}
                  className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-sm text-sm font-semibold text-white transition cursor-pointer ${loading ? "bg-gray-300 cursor-not-allowed" : "bg-gray-900 hover:bg-gray-700"
                    }`}
                >
                  {loading
                    ? (isEditing ? "Salvando..." : "Cadastrando...")
                    : (isEditing ? "Salvar alterações" : "Cadastrar kit")}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-2.5 rounded-sm text-sm font-semibold text-gray-600 border border-gray-200 hover:bg-gray-50 transition cursor-pointer"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        <DeleteEventModal
          open={!!eventPendingDelete}
          eventName={eventPendingDelete?.name ?? ""}
          deleting={deleting}
          onClose={closeDeleteModal}
          onConfirm={handleDeleteConfirm}
        />

        {/* Table */}
        <div className="bg-white rounded-sm border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-gray-900">
              Kits cadastrados
              <span className="ml-2 text-xs font-normal text-gray-400">({events.length})</span>
            </h2>
            <div className="relative w-60">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Buscar kit..."
                className="w-full h-9 pl-8 pr-3 text-sm bg-gray-50 border border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition"
              />
            </div>
          </div>

          {filteredEvents.length === 0 ? (
            <div className="py-16 text-center">
              <Package size={32} className="mx-auto text-gray-300 mb-3" />
              <p className="text-sm text-gray-400">
                {search ? "Nenhum kit encontrado para essa busca." : "Nenhum kit cadastrado ainda."}
              </p>
              {!showForm && (
                <button
                  onClick={openCreateForm}
                  className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-orange-500 hover:text-orange-600 transition cursor-pointer"
                >
                  <Plus size={14} /> Cadastrar primeiro kit
                </button>
              )}
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {filteredEvents.map((event) => {
                const distances = Array.isArray(event.distances)
                  ? event.distances
                  : String(event.distances || "").split(",").map(d => d.trim()).filter(Boolean);

                return (
                  <div
                    key={event.id}
                    className="flex items-center justify-between px-6 py-4 hover:bg-gray-50/60 transition-colors group"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="w-9 h-9 rounded-sm bg-orange-50 flex items-center justify-center shrink-0">
                        <Package size={16} className="text-orange-400" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold text-gray-900 truncate">{event.name}</p>
                          <StatusBadge status={event.status} />
                        </div>
                        <div className="flex items-center gap-3 mt-0.5">
                          {event.location && (
                            <span className="flex items-center gap-1 text-xs text-gray-400">
                              <MapPin size={11} /> {event.location}
                            </span>
                          )}
                          {distances.length > 0 && (
                            <span className="flex items-center gap-1 text-xs text-gray-400">
                              <Layers size={11} />
                              {distances.slice(0, 3).join(" · ")}
                              {distances.length > 3 && ` +${distances.length - 3}`}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 shrink-0 ml-4">
                      <span className="text-sm font-semibold text-gray-800">
                        R${event.price}
                      </span>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleEdit(event)}
                          className="w-8 h-8 flex items-center justify-center rounded-sm hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition cursor-pointer"
                          title="Editar"
                        >
                          <Pencil size={15} />
                        </button>
                        <button
                          onClick={() => handleRequestDelete(event)}
                          className="w-8 h-8 flex items-center justify-center rounded-sm hover:bg-red-50 text-gray-400 hover:text-red-500 transition cursor-pointer"
                          title="Excluir"
                        >
                          <Trash2 size={15} />
                        </button>
                        <ChevronRight size={14} className="text-gray-300 ml-1" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
