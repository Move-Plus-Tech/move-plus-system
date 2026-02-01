"use client";

import { useState, useEffect, useMemo } from "react";
import {
    MdCalendarMonth,
    MdLocationPin,
    MdPeople,
    MdCheckCircle,
} from "react-icons/md";
import { IoShirt } from "react-icons/io5";
import { useAuth } from "@/context/authContext";
import { useLoginModal } from "@/context/loginModalContext";

import AboutEventsModal from "../modals/AboutEventsModal";
import EventRegisterModal from "../modals/EventRegisterModal";
import LoadingSpinner from "../LoadingSpinner";

import Image from "next/image";

import {
    getEvents,
    Event,
    getMyEvents,
    EventRegistration,
} from "@/services/events";

import { formatDateBR } from "@/utils/formatDate";

export default function KitsComponent() {
    const { user, email } = useAuth();
    const { openModal } = useLoginModal();

    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [isAboutOpen, setIsAboutOpen] = useState(false);
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);

    const [allEvents, setAllEvents] = useState<Event[]>([]);
    const [registrations, setRegistrations] = useState<EventRegistration[]>([]);
    const [loading, setLoading] = useState(true);

    type OptionType = "Trilhas" | "Corridas" | "Beneficentes";
    const [selectedOption, setSelectedOption] =
        useState<OptionType>("Trilhas");

    useEffect(() => {
        getEvents()
            .then(setAllEvents)
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        if (!email) return setRegistrations([]);
        getMyEvents(email).then(setRegistrations);
    }, [email]);

    const filteredEvents = allEvents.filter(
        (event) => event.type === selectedOption
    );

    const registeredEventIds = useMemo(
        () => new Set(registrations.map((r) => r.event.id)),
        [registrations]
    );

    return (
        <>
            <section id="kits" className="bg-gray-100 py-16 px-4">
                <div className="max-w-7xl mx-auto flex flex-col items-center">

                    
                    <div className="text-center mb-12">
                        <div className="inline-block bg-orange-500/20 px-4 py-1 rounded-full text-xs lg:text-sm 
              text-orange-600 font-semibold mb-4">
                            Kits disponíveis
                        </div>

                        <h1 className="text-2xl sm:text-3xl lg:text-5xl font-black text-black">
                            Encontre seu próximo{" "}
                            <span className="text-orange-500">desafio</span>
                        </h1>

                        <p className="mt-3 text-xs sm:text-sm lg:text-base font-medium text-black/80 max-w-xl mx-auto">
                            Escolha a corrida parceira e{" "}
                            <span className="font-bold">receba seu kit em casa</span>
                            {" "}com toda a comodidade.
                        </p>
                    </div>
                    
                    {loading && (
                        <LoadingSpinner />
                    )}

                    {!loading && filteredEvents.length === 0 && (
                        <div className="text-center">
                            <IoShirt size={40} className="text-gray-700 mx-auto mb-4" />
                            <h2 className="text-xl font-bold mb-2">
                                Nenhum kit disponível
                            </h2>
                            <p className="text-gray-500 text-sm">
                                Novos kits serão adicionados em breve.
                            </p>
                        </div>
                    )}

                  
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                        {filteredEvents.map((event) => (
                            <div
                                key={event.id}
                                className="bg-white border border-gray-200 rounded-2xl overflow-hidden flex flex-col"
                            >
                                {/* Image */}
                                <div className="relative">
                                    <span
                                        className={`absolute top-4 right-4 px-3 py-1 rounded-lg text-xs font-semibold
                      ${event.status === "Disponível"
                                                ? "bg-green-200 text-green-900"
                                                : event.status === "Em Breve"
                                                    ? "bg-orange-200 text-orange-900"
                                                    : "bg-red-200 text-red-900"
                                            }`}
                                    >
                                        {event.status}
                                    </span>

                                    <Image
                                        src={event.imageUrl || "/fallback.jpg"}
                                        alt={event.name}
                                        width={400}
                                        height={250}
                                        className="w-full h-48 object-cover"
                                    />
                                </div>

                                {/* Content */}
                                <div className="flex flex-col flex-1 p-5">
                                    <h3 className="font-bold uppercase text-sm mb-3">
                                        {event.name}
                                    </h3>

                                    <div className="space-y-2 text-sm text-gray-500">
                                        <div className="flex items-center gap-2">
                                            <MdCalendarMonth className="text-purple-700" />
                                            {formatDateBR(event.time)}
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <MdLocationPin className="text-purple-700" />
                                            {event.location}
                                        </div>

                                        {event.slots > 0 && (
                                            <div className="flex items-center gap-2">
                                                <MdPeople className="text-purple-700" />
                                                {event.slots} vagas
                                            </div>
                                        )}
                                    </div>

                                    {/* Price */}
                                    {event.price > 0 && (
                                        <div className="mt-4 font-bold text-xl text-purple-800">
                                            R$ {event.price}
                                        </div>
                                    )}

                                    {/* Buttons */}
                                    <div className="mt-auto pt-6 space-y-2">
                                        {registeredEventIds.has(event.id) ? (
                                            <button
                                                disabled
                                                className="w-full py-2 rounded-lg bg-gray-400 text-white font-semibold flex items-center justify-center gap-2"
                                            >
                                                <MdCheckCircle />
                                                Já inscrito
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => {
                                                    if (!user) return openModal();
                                                    setSelectedEvent(event);
                                                    setIsRegisterOpen(true);
                                                }}
                                                className="w-full py-2 rounded-lg bg-purple-800 text-white font-semibold hover:brightness-90 transition"
                                            >
                                                Fazer inscrição
                                            </button>
                                        )}

                                        <button
                                            onClick={() => {
                                                setSelectedEvent(event);
                                                setIsAboutOpen(true);
                                            }}
                                            className="w-full py-2 rounded-lg border border-purple-800 text-purple-800 font-semibold hover:bg-purple-800 hover:text-white transition"
                                        >
                                            Sobre
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
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
