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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 h-screen overflow-hidden">
            <div className="w-full h-screen lg:w-[500px] lg:h-[700px] bg-white rounded-lg shadow-xl flex flex-col items-center relative ">
                <div className="flex items-center justify-center">
                    <div className="text-center mb-2 mt-4">
                        <h1 className="mt-8 text-lg font-bold text-orange-500 uppercase">MEUS KITS</h1>
                        <h2 className="text-xs font-bold text-center px-4 text-black/70">Navegue por todos os seus kits já adquiridos!</h2>
                    </div>

                    <button onClick={handleCloseModal} className="absolute right-10 top-8 w-6 h-6 items-center text-white cursor-pointer font-semibold">
                        <MdClose size={20} className="text-orange-500" />
                    </ button>
                </div>

                <div className="flex-wrap w-full">
                    {loading ? (
                        <p className="text-sm text-center w-full mt-6">Carregando...</p>
                    ) : events && events.length > 0 ? (
                        events.map((ev) => (
                            <MyEventsComponent key={ev.registrationId} registration={ev} />
                        ))
                    ) : (
                        <div className="text-center justify-center mt-40">
                            <IoShirt size={40} className="text-gray-700 mx-auto mb-4" />
                            <h2 className="text-lg font-bold mb-2">
                                Você ainda não possui kits
                            </h2>
                            <button onClick={handleCloseModal}>
                                <a href="#kits" className="neon-button mx-auto flex w-fit cursor-pointer 
        py-3 px-3 sm:py-3 sm:px-5 mt-2 bg-orange-500 rounded-lg items-center gap-2 text-white 
        text-xs sm:text-sm lg:text-base">Veja os kits disponíveis</a>
                            </button>
                        </div>
                    )}

                </div>

            </div>
        </div>
    )
}