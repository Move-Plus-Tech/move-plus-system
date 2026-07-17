"use client";

import { MdOutlineSupportAgent } from "react-icons/md";
import { MdCalendarMonth, MdLocationPin } from "react-icons/md";
import { EventRegistration } from "@/services/events";
import { formatDateBR } from "@/utils/formatDate";

interface MyEventsComponentProps {
    registration: EventRegistration;
}

export default function MyEventsComponent({ registration }: MyEventsComponentProps) {
    const { event } = registration;
    const displayDate = formatDateBR(event.time);
    const createdAt = formatDateBR(new Date(registration.createdAt));

    return (
        <div className="flex flex-col gap-4 mt-5 px-3 w-full max-w-3xl mx-auto">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between relative border border-gray-700/15 rounded-2xl p-3">

                <div className="flex flex-col justify-between mt-2 md:mt-0 md:ml-4 ml-0 w-full md:flex-1">
                    <h1 className="font-bold text-base uppercase text-gray-800">
                        {event.name}
                    </h1>

                    <p className="text-[10px] text-black/70 select-none">Você se inscreveu em {createdAt}</p>

                    <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                        <MdCalendarMonth className="text-[#FF4D1C]" size={18} />
                        <span>{displayDate}</span>
                    </div>

                    <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                        <MdLocationPin className="text-[#FF4D1C]" size={18} />
                        <span>{event.location}</span>
                    </div>

                </div>

                <div className="flex flex-col justify-center text-center md:mr-4">
                    <p className="text-[10px] text-black/70 select-none hidden md:block">Precisa de ajuda?</p>
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://wa.me/5531996702827"
                        className="md:w-[132px] mt-2 text-xs w-full py-2 rounded-md border border-emerald-700/30 font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-center cursor-pointer transition-all duration-200 ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:from-emerald-700 hover:to-teal-700 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] flex items-center justify-center gap-1.5 shadow-sm shadow-emerald-900/20"
                    >
                        <MdOutlineSupportAgent className="text-emerald-100" size={18} />
                        Atendimento
                    </a>
                </div>

            </div>
        </div>
    );
}
