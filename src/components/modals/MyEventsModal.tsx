"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/authContext";

import { MdClose } from "react-icons/md";
import MyEventsComponent from "../kits/MyEventsComponent";
import { getMyEvents, EventRegistration } from "@/services/events";
import { IoShirt } from "react-icons/io5";


type MyEventsProps = {
    openModalEvents: boolean;
    setOpenModalEvents?: (open: boolean) => void;
}

export default function MyEventsModal({ openModalEvents, setOpenModalEvents }: MyEventsProps) {
    const { email } = useAuth();
    const [events, setEvents] = useState<EventRegistration[] | null>(null);
    const [loading, setLoading] = useState(false);

    const fetchMyEvents = async () => {
        if (!email) return;
        setLoading(true);
        try {
            const data = await getMyEvents(email);
            setEvents(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const root = document.getElementById("__next") || document.getElementById("root");

        if (openModalEvents) {
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
    }, [openModalEvents]);

    useEffect(() => {
        fetchMyEvents();
        const handler = () => fetchMyEvents();
        window.addEventListener('registration:created', handler);
        return () => window.removeEventListener('registration:created', handler);
    }, [email]);

    useEffect(() => {
        if (openModalEvents) fetchMyEvents();
    }, [openModalEvents]);

    useEffect(() => {
        const element = document.documentElement;

        if (openModalEvents) {
            element.classList.add("overflow-hidden");
        } else {
            element.classList.remove("overflow-hidden");
        }

        return () => element.classList.remove("overflow-hidden");
    }, [openModalEvents]);


    const handleCloseModal = () => {
        if (setOpenModalEvents) {
            setOpenModalEvents(false);
        }
    }

    if (!openModalEvents) return null;

    return (
        <div className="fixed inset-0 z-50 flex min-h-dvh items-center justify-center bg-black/70 backdrop-blur-sm p-4">
            <div className="relative my-auto w-full max-w-[560px] max-h-[90dvh] bg-white rounded-sm shadow-2xl border border-black/5 overflow-hidden">
                <div className="px-6 pt-6 pb-4 bg-gradient-to-b from-orange-50 to-white border-b border-gray-200">
                    <div className="text-center">
                        <h1 className="text-lg font-black tracking-wide text-orange-500 uppercase">Histórico de Compras</h1>
                        <h2 className="text-xs font-semibold mt-1 text-black/70">Navegue por todos os seus kits já adquiridos</h2>
                    </div>

                    <button
                        onClick={handleCloseModal}
                        className="absolute rounded-full hover:bg-gray-100 right-5 top-5 w-8 h-8 flex items-center justify-center cursor-pointer font-semibold transition-colors"
                        aria-label="Fechar modal"
                    >
                        <MdClose size={18} className="text-black" />
                    </button>
                </div>

                <div className="w-full overflow-y-auto max-h-[calc(90dvh-96px)] px-4 pb-5 thin-grey-scrollbar">
                    {loading ? (
                        <div className="space-y-3 animate-pulse">
                            <div className="h-20 rounded-sm bg-gray-100" />
                            <div className="h-20 rounded-sm bg-gray-100" />
                            <div className="h-20 rounded-sm bg-gray-100" />
                        </div>
                    ) : events && events.length > 0 ? (
                        <div className="space-y-3">
                            {events.map((ev) => (
                                <MyEventsComponent key={ev.registrationId} registration={ev} />
                            ))}
                        </div>
                    ) : (
                        <div className="min-h-[360px] flex flex-col items-center justify-center text-center px-4">
                            <div className="w-14 h-14 rounded-sm bg-orange-100 text-orange-500 flex items-center justify-center mb-4">
                                <IoShirt size={30} />
                            </div>
                            <h2 className="text-lg font-bold text-black mb-1">Você ainda não possui kits</h2>
                            <p className="text-sm text-black/60 mb-5 max-w-[280px]">Participe dos próximos eventos para garantir seu kit com entrega em casa.</p>
                            <a
                                href="#kits"
                                onClick={handleCloseModal}
                                className="mx-auto flex w-fit cursor-pointer py-3 px-5 bg-orange-500 rounded-sm items-center gap-2 text-white text-sm font-semibold transition-all duration-200 ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:bg-orange-600 active:scale-[0.98]"
                            >
                                Veja os kits disponíveis
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}