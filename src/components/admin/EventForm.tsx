import { useEventForm } from "@/hooks/useEventForm";
import DeleteEventModal from "./DeleteEventModal";
import {
  AdminHeaderActions,
  AdminPageHeader,
  AdminStatsGrid,
  EmptyEventsState,
  EventFormPanel,
  EventListItem,
} from "./EventFormSections";

import { Search } from "lucide-react";
import Registrations from "./Registrations";

const GOOGLE_SHEETS_URL = process.env.INSCRICOES_SHEET_URL!;

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
    complementaryItems,
  } = useEventForm();

  return (
    <div className="min-h-screen bg-gray-50/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8">
        <AdminPageHeader
          title="Painel de Administrador"
          description="Cadastre, edite e monitore todos os kits de evento"
          actions={
            <AdminHeaderActions
              googleSheetsUrl={GOOGLE_SHEETS_URL}
              onCreate={openCreateForm}
              showForm={showForm}
            />
          }
        />

        <AdminStatsGrid stats={stats} />

        {showForm && (
          <EventFormPanel
            form={form}
            formattedTime={formattedTime}
            loading={loading}
            isEditing={isEditing}
            complementaryItems={complementaryItems}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            onTimeChange={handleTimeChange}
          />
        )}

        <DeleteEventModal
          open={!!eventPendingDelete}
          eventName={eventPendingDelete?.name ?? ""}
          deleting={deleting}
          onClose={closeDeleteModal}
          onConfirm={handleDeleteConfirm}
        />

        <div className="bg-white rounded-sm border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 sm:px-6 py-4 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-gray-900">
              Kits cadastrados
              <span className="ml-2 text-xs font-normal text-gray-400">({events.length})</span>
            </h2>
            <div className="relative w-full sm:w-60">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Buscar kit..."
                className="w-full h-9 pl-8 pr-3 text-sm bg-gray-50 border border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#FF4D1C]/20 focus:border-[#FF4D1C] transition"
              />
            </div>
          </div>

          {filteredEvents.length === 0 ? (
            <EmptyEventsState showForm={showForm} onCreate={openCreateForm} />
          ) : (
            <div className="divide-y divide-gray-50">
              {filteredEvents.map((event) => (
                <EventListItem
                  key={event.id}
                  event={event}
                  onEdit={handleEdit}
                  onDelete={handleRequestDelete}
                />
              ))}
            </div>
          )}
        </div>

        <Registrations />
      </div>
    </div>
  );
}
