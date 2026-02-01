import { useEffect } from "react";
import { MdClose } from "react-icons/md";

interface AboutEventsModalProps {
    open: boolean;
    onClose?: () => void;
    event?: {
        name: string;
        about: string;
        title: string;
        type: string;
        urlLinkAbout: string;
    };
}

export default function AboutEventsModal({
    open,
    onClose,
    event,
}: AboutEventsModalProps) {
    useEffect(() => {
        const root =
            document.getElementById("__next") ||
            document.getElementById("root");

        if (open) {
            document.body.style.overflow = "hidden";
            document.documentElement.style.overflow = "hidden";
            if (root) root.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
            document.documentElement.style.overflow = "auto";
            if (root) root.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
            document.documentElement.style.overflow = "auto";
            if (root) root.style.overflow = "auto";
        };
    }, [open]);

    if (!open) return null;

    const handleClose = () => {
        if (onClose) onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
            <div
                className="
          relative bg-white
          w-full max-w-[414px] md:max-w-[600px]
          max-h-[90dvh]
          rounded-xl shadow-xl
          px-7 py-6
          overflow-y-auto thin-grey-scrollbar select-none
        "
            >

                <button
                    onClick={handleClose}
                    className="sticky top-0 ml-auto block text-black z-50 bg-gray-100 cursor-pointer p-1 rounded-full hover:bg-gray-200 transition"
                    aria-label="Fechar"
                >
                    <MdClose size={18} />
                </button>

                <h1 className="text-2xl text-center font-semibold text-orange-500 mt-2">
                    {event?.name}
                </h1>

                <h2 className="text-lg font-semibold text-center text-black mb-6">
                    {event?.title}
                </h2>

                <div className="text-gray-700 whitespace-pre-line text-start px-2">
                    {event?.about}
                </div>

            </div>
        </div>
    );
}
