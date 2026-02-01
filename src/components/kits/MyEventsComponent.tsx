"use client";

import Image from "next/image";
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

                {/* <div className="relative w-full h-40 md:w-[100px] md:h-[100px] rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                    {event.imagekitUrl && (
                        <Image
                            src={event.imagekitUrl}
                            alt={event.name}
                            fill
                            className="object-cover"
                        />
                    )}

                </div> */}

                <div className="flex flex-col justify-between mt-2 md:mt-0 md:ml-4 ml-0 w-full md:flex-1">
                    <h1 className="font-bold text-base uppercase text-gray-800">
                        {event.name}
                    </h1>

                    <p className="text-[10px] text-black/70 select-none">Você se inscreveu em {createdAt}</p>

                    <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                        <MdCalendarMonth className="text-[#5f2daf]" size={18} />
                        <span>{displayDate}</span>
                    </div>

                    <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                        <MdLocationPin className="text-[#5f2daf]" size={18} />
                        <span>{event.location}</span>
                    </div>

                </div>

                <div className="flex flex-col justify-center text-center md:mr-4">
                    <p className="text-[10px] text-black/70 select-none hidden md:block">Precisa de ajuda?</p>
                    <a target="_blank" href="https://wa.me/5531996702827" className="md:w-[100px] mt-3 md:mt-1 text-xs w-full mt-1 py-1 rounded-md text-purple-800 border border-purple-800/20 font-semibold bg-white hover:bg-[#61ffc2] hover:text-black transition text-center cursor-pointer">
                        Atendimento
                    </a>
                </div>

            </div>
        </div>
    );
}
