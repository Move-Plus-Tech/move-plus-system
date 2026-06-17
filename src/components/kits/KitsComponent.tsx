"use client";

import { useState, useEffect, useMemo } from "react";
import {
    MdCalendarMonth,
    MdLocationPin,
    MdCheckCircle,
} from "react-icons/md";
import { IoShirt, IoFlame } from "react-icons/io5";
import { useAuth } from "@/context/authContext";
import { useLoginModal } from "@/context/loginModalContext";

import AboutEventsModal from "../modals/AboutEventsModal";
import EventRegisterModal from "../modals/EventRegisterModal";
import LoadingSpinner from "../ui/LoadingSpinner";

import Image from "next/image";

import {
    getEvents,
    Event,
    getMyEvents,
    EventRegistration,
    getComplementaryItems,
    ComplementaryItem,
} from "@/services/events";

import { formatDateBR } from "@/utils/formatDate";

export default function KitsComponent() {
    const { user, email } = useAuth();
    const { openModal } = useLoginModal();

    const [selectedEvent, setSelectedEvent] = useState<Event & { complementaryItem?: ComplementaryItem } | null>(null);
    const [isAboutOpen, setIsAboutOpen] = useState(false);
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);

    const [allEvents, setAllEvents] = useState<Event[]>([]);
    const [complementaryItems, setComplementaryItems] = useState<ComplementaryItem[]>([]);
    const [registrations, setRegistrations] = useState<EventRegistration[]>([]);
    const [loading, setLoading] = useState(true);

    // Ordena eventos: populares primeiro, ambos por data
    const sortedEvents = useMemo(() => {
        return allEvents.slice().sort((a, b) => {
            if (a.status === "Popular" && b.status !== "Popular") return -1;
            if (a.status !== "Popular" && b.status === "Popular") return 1;
            return new Date(a.time).getTime() - new Date(b.time).getTime();
        });
    }, [allEvents]);

    useEffect(() => {
        const loadData = async () => {
            try {
                const [eventsData, itemsData] = await Promise.all([
                    getEvents(),
                    getComplementaryItems(),
                ]);
                setAllEvents(eventsData);
                setComplementaryItems(itemsData);
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    useEffect(() => {
        if (!email) return setRegistrations([]);
        getMyEvents(email).then(setRegistrations);
    }, [email]);

    const registeredEventIds = useMemo(
        () => new Set(registrations.map((r) => r.event.id)),
        [registrations]
    );

    const parsePrice = (value: number | string | null | undefined) => {
        if (typeof value === "number") return Number.isFinite(value) ? value : 0;
        if (value == null) return 0;

        const raw = String(value).trim().replace(/[^\d,.-]/g, "");
        if (!raw) return 0;

        const lastComma = raw.lastIndexOf(",");
        const lastDot = raw.lastIndexOf(".");
        const separatorIndex = Math.max(lastComma, lastDot);

        if (separatorIndex === -1) {
            const parsedInt = Number(raw);
            return Number.isFinite(parsedInt) ? parsedInt : 0;
        }

        const intPart = raw.slice(0, separatorIndex).replace(/[,.]/g, "");
        const decimalPart = raw.slice(separatorIndex + 1).replace(/[,.]/g, "");
        const normalized = `${intPart || "0"}.${decimalPart}`;
        const parsed = Number(normalized);

        return Number.isFinite(parsed) ? parsed : 0;
    };

    const formatCurrency = (value: number) =>
        new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(value);

    const enrichEventWithComplementaryItem = (eventData: Event) => {
        const complementaryItem = complementaryItems.find(
            (item) => item.id === eventData.itemComplementarId
        );
        return {
            ...eventData,
            complementaryItem,
        };
    };

    return (
        <>
            <section id="kits" className="bg-gray-100 py-16 px-4">
                <div className="max-w-7xl mx-auto flex flex-col items-center">
                    <div className="text-center mb-12">
                        <div
                            className="inline-block border px-4 py-1 rounded-full text-xs lg:text-sm 
              text-orange-600 font-semibold mb-4"
                        >
                            Kits disponíveis
                        </div>

                        <h1 className="text-2xl sm:text-3xl lg:text-5xl font-black text-black">
                            Encontre seu próximo{" "}
                            <span className="text-orange-500">desafio</span>
                        </h1>

                        <p className="mt-3 text-xs sm:text-sm lg:text-base font-medium text-black/80 max-w-2xl mx-auto">
                            Escolha a corrida parceira e{" "}
                            <span className="font-bold">receba seu kit em casa</span>{" "}
                            com toda a comodidade.
                        </p>
                    </div>

                    {loading && <LoadingSpinner />}

                    {!loading && allEvents.length === 0 && (
                        <div className="text-center">
                            <IoShirt size={40} className="text-gray-700 mx-auto mb-4" />
                            <h2 className="text-xl font-bold mb-2">
                                Nenhum kit disponível
                            </h2>
                            <p className="text-gray-500 text-sm">
                                Não se preocupe, novos kits serão adicionados em breve.
                            </p>
                        </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                        {sortedEvents.map((event) => {
                            const isPopular = event.status === "Popular";
                            const isComingSoon = event.status === "Em Breve";
                            const eventPrice = parsePrice(event.price);

                            return (
                                <div
                                    key={event.id}
                                    className={`group bg-white rounded-md overflow-hidden flex flex-col 
                                        transition-all duration-300 relative
                                        ${isPopular
                                            ? "border-2 border-orange-500 shadow-lg shadow-orange-500/20"
                                            : "border border-gray-500/20"
                                        }`}
                                >
                                    {/* Image area */}
                                    <div className="relative">
                                        {isPopular && (
                                            <div className="absolute inset-0 z-10 bg-gradient-to-t from-orange-500/30 via-transparent to-transparent" />
                                        )}

                                        <div className="absolute top-4 right-4 z-20 flex flex-row gap-2 items-center">
                                            {isPopular ? (
                                                <span className="px-3 py-1 rounded-full text-[11px] font-bold
                                                    bg-orange-500 text-white shadow-md shadow-orange-500/40
                                                    flex items-center gap-1.5">
                                                    <IoFlame size={12} />
                                                    MAIS PROCURADO
                                                </span>
                                            ) : (
                                                <span
                                                    className={`px-3 py-1 rounded-full text-[11px] font-bold
                                                        ${event.status === "Disponível"
                                                            ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white"
                                                            : event.status === "Em Breve"
                                                                ? "bg-gray-200 text-black/70"
                                                                : event.status === "Esgotado"
                                                                    ? "bg-red-500 text-white"
                                                                    : "bg-gray-500 text-white"
                                                        }`}
                                                >
                                                    {event.status}
                                                </span>
                                            )}
                                        </div>

                                        <Image
                                            src={event.imageUrl && (event.imageUrl.startsWith("/") || event.imageUrl.startsWith("http")) ? event.imageUrl : "/fallback.jpg"}
                                            alt={event.name}
                                            width={400}
                                            height={250}
                                            className="w-full h-48 object-cover"
                                        />
                                    </div>

                                    {/* Urgency bar — only for popular */}
                                    {isPopular && (
                                        <div className="bg-orange-500 px-4 py-1.5 flex items-center gap-2">
                                            <IoFlame size={13} className="text-white" />
                                            <span className="text-white text-[11px] font-bold tracking-wide uppercase">
                                                Alta demanda — garanta o seu!
                                            </span>
                                        </div>
                                    )}

                                    <div className="flex flex-col flex-1 p-5">
                                        <h3 className="font-bold uppercase text-md mb-4 text-gray-900">
                                            {event.name}
                                        </h3>

                                        <div className="space-y-2 text-sm text-gray-600">
                                            <div className="flex items-center gap-2">
                                                <MdCalendarMonth size={20} className="text-orange-500" />
                                                {formatDateBR(event.time)}
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <MdLocationPin size={20} className="text-orange-500" />
                                                {event.location}
                                            </div>
                                        </div>

                                        {/* Price */}
                                        {eventPrice > 0 && (
                                            <div className={`mt-4 font-bold text-2xl ${isPopular ? "text-orange-500" : "text-black"}`}>
                                                {formatCurrency(eventPrice)}
                                            </div>
                                        )}

                                        {/* Buttons */}
                                        <div className="mt-auto pt-6 space-y-2">
                                            {registeredEventIds.has(event.id) ? (
                                                <button
                                                    disabled
                                                    className="w-full py-2 rounded-lg bg-gray-300 text-gray-700 
                                                        font-semibold flex items-center justify-center gap-2 cursor-not-allowed"
                                                >
                                                    <MdCheckCircle />
                                                    Já inscrito
                                                </button>
                                            ) : isComingSoon ? (
                                                <button
                                                    disabled
                                                    className="w-full text-sm py-2 rounded-sm bg-gray-100 text-black/70
                                                        font-semibold flex items-center justify-center gap-2 cursor-not-allowed"
                                                >
                                                    Em breve
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => {
                                                        if (!user) return openModal();
                                                        setSelectedEvent(enrichEventWithComplementaryItem(event));
                                                        setIsRegisterOpen(true);
                                                    }}
                                                    className={`w-full text-sm py-2 rounded-sm font-semibold transition-all duration-200
                                                        ease-[cubic-bezier(0.2,0.8,0.2,1)] cursor-pointer transform-gpu
                                                        hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]
                                                        ${isPopular
                                                            ? "bg-orange-500 text-white hover:bg-orange-600"
                                                            : "bg-black text-white hover:bg-gray-800"
                                                        }`}
                                                >
                                                    Fazer inscrição
                                                </button>
                                            )}

                                            <button
                                                disabled={isComingSoon}
                                                onClick={() => {
                                                    setSelectedEvent(enrichEventWithComplementaryItem(event));
                                                    setIsAboutOpen(true);
                                                }}
                                                className="w-full text-sm py-2 rounded-sm border border-black/20 
                                                    text-black/70 font-semibold transition cursor-pointer hover:bg-gray-100 
                                                    disabled:hover:bg-transparent disabled:cursor-not-allowed 
                                                    disabled:text-gray-400 disabled:border-gray-300"
                                            >
                                                Sobre
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {selectedEvent && (
                <>
                    <AboutEventsModal
                        open={isAboutOpen}
                        event={selectedEvent}
                        onClose={() => setIsAboutOpen(false)}
                    />
                    <EventRegisterModal
                        isOpen={isRegisterOpen}
                        event={selectedEvent}
                        onClose={() => setIsRegisterOpen(false)}
                    />
                </>
            )}
        </>
    );
}
