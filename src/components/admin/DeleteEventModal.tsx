import { Trash2 } from "lucide-react";

type DeleteEventModalProps = {
  open: boolean;
  eventName: string;
  deleting: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export default function DeleteEventModal({
  open,
  eventName,
  deleting,
  onClose,
  onConfirm,
}: DeleteEventModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-sm border border-gray-100 bg-white shadow-2xl overflow-hidden">
        <div className="flex items-start gap-3 px-6 py-5 border-b border-gray-100">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm bg-red-50 text-red-500">
            <Trash2 size={18} />
          </div>
          <div>
            <h2 className="text-base font-semibold text-gray-900">Excluir kit</h2>
            <p className="mt-1 text-sm text-gray-500">
              Tem certeza que deseja excluir <span className="font-semibold text-gray-700">{eventName}</span>? Essa ação não pode ser desfeita.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 px-6 py-4 bg-gray-50">
          <button
            type="button"
            onClick={onClose}
            disabled={deleting}
            className="px-4 py-2 rounded-sm text-sm font-semibold cursor-pointer text-gray-600 border border-gray-200 hover:bg-white transition disabled:cursor-not-allowed disabled:opacity-60"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={deleting}
            className="inline-flex items-center gap-2 px-4 py-2 cursor-pointer rounded-sm bg-red-500 text-sm font-semibold text-white hover:bg-red-600 transition disabled:cursor-not-allowed disabled:opacity-60"
          >
            {deleting ? "Excluindo..." : "Excluir kit"}
          </button>
        </div>
      </div>
    </div>
  );
}