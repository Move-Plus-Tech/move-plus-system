import { useState } from "react";
import {useRegistrations} from "@/hooks/useRegistrations";
import {
  EmptyRegistrationsState,
  ExportSpreadsheetButton,
  RegistrationListItem,
  RegistrationsFiltersBar,
} from "./RegistrationSections";
import RegistrationDetailsModal from "./RegistrationDetailsModal";
import type { Registration } from "@/types/registration";

export default function Registrations() {
  const [selectedRegistration, setSelectedRegistration] = useState<Registration | null>(null);

  const {
    filteredRegistrations,
    filters,
    loading,
    exporting,
    handleFilterChange,
    handlePeriodChange,
    handleClearFilters,
    handleExport,
  } = useRegistrations();

  const hasActiveFilters = Boolean(
    filters.cpf ||
      filters.title ||
      filters.fullName ||
      filters.periodDays !== "all",
  );
  const disableExport = loading || filteredRegistrations.length === 0;

  const handleOpenDetails = (registration: Registration) => {
    setSelectedRegistration(registration);
  };

  const handleCloseDetails = () => {
    setSelectedRegistration(null);
  };

  return (
    <div className="bg-white rounded-sm border border-gray-100 shadow-sm overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 sm:px-6 py-4 border-b border-gray-100">
        <h2 className="text-sm font-semibold text-gray-900">
          Inscrições recebidas
          <span className="ml-2 text-xs font-normal text-gray-400">
            ({filteredRegistrations.length})
          </span>
        </h2>
        <ExportSpreadsheetButton
          onExport={handleExport}
          exporting={exporting}
          disabled={disableExport}
        />
      </div>

      <RegistrationsFiltersBar
        filters={filters}
        onChange={handleFilterChange}
        onPeriodChange={handlePeriodChange}
        onClear={handleClearFilters}
      />

      {loading ? (
        <div className="divide-y divide-gray-50">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={`registration-skeleton-${index}`} className="flex items-center justify-between px-4 sm:px-6 py-4">
              <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                <div className="w-9 h-9 rounded-sm bg-gray-100 animate-pulse shrink-0" />
                <div className="min-w-0 flex-1 space-y-2">
                  <div className="h-3 w-44 bg-gray-100 rounded animate-pulse" />
                  <div className="h-2.5 w-64 bg-gray-100 rounded animate-pulse" />
                </div>
              </div>
              <div className="hidden sm:block h-3 w-24 bg-gray-100 rounded animate-pulse" />
            </div>
          ))}
        </div>
      ) : filteredRegistrations.length === 0 ? (
        <EmptyRegistrationsState hasFilters={hasActiveFilters} />
      ) : (
        <div className="divide-y divide-gray-50">
          {filteredRegistrations.map((registration) => (
            <RegistrationListItem
              key={registration.id ?? `${registration.eventId}-${registration.cpf}-${registration.createdAt}`}
              registration={registration}
              onClick={() => handleOpenDetails(registration)}
            />
          ))}
        </div>
      )}

      <RegistrationDetailsModal
        isOpen={!!selectedRegistration}
        registration={selectedRegistration}
        onClose={handleCloseDetails}
      />
    </div>
  );
}
